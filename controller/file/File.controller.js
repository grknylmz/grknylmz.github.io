sap.ui.define(
  ["ems/UI5Showcase/controller/BaseController", "sap/m/MessageToast"],
  function(BaseController, MessageToast) {
    "use strict";
    return BaseController.extend("ems.UI5Showcase.controller.file.File", {
      onInit: function() {
        this.getView()
          .byId("html")
          .setContent("<div id='textGrid' width='400' height='200' ></div>");
      },
      onAfterRendering: function() {},
      processFiles: function(data) {
        return new Promise(function(res, rej) {});
      },
      handleUploadPress: function() {
        var fileUpload = this.getView().byId("fileUploader");
        var domRef = fileUpload.getFocusDomRef();
        var file = domRef.files[0];
        if (file === undefined) {
          var ss = 0;
        } else {
          this.importExcelFile(file);
        }
      },
      importExcelFile: function(file) {
        var that = this;
        if (file && window.FileReader) {
          //Initialize Reader
          var reader = new FileReader();
          var result = {};
          var data;
          reader.onload = function(e) {
            data = e.target.result;
            //get workbook data as binary
            var wb = XLSX.read(data, {
              type: "binary"
            });
            wb.SheetNames.forEach(function(sheetName) {
              var roa = XLSX.utils.sheet_to_row_object_array(
                wb.Sheets[sheetName]
              );
              if (roa.length > 0) {
                result[sheetName] = roa;
              }
              var parentNode = document.getElementById("textGrid");
              var grid = canvasDatagrid({
                parentNode: parentNode,
                data: roa
              });
            });
          };
          reader.readAsBinaryString(file);
        }
      }
    });
  }
);
