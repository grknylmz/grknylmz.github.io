sap.ui.define([
    "ems/UI5Showcase/controller/BaseController"
  ],
  function (BaseController) {
    "use strict";
    var canvas, signaturePad;
    return BaseController.extend("ems.UI5Showcase.controller.signature.SignaturePad", {
      onInit: function () {
        this.getView().byId("html").setContent("<canvas id='signature-pad' width='400' height='200' class='signature-pad'></canvas>");
      },

      onSign: function (oEvent) {
        canvas = document.getElementById("signature-pad");
        signaturePad = new SignaturePad(canvas, {
          backgroundColor: 'rgb(255, 255, 255)'
        });
      },

      saveButton: function (oEvent) {
        canvas = document.getElementById("signature-pad");
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'sign.jpeg';
        link.click();
        signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
          backgroundColor: '#ffffff',
          penColor: 'rgb(0, 0, 0)'
        });
      },

      clearButton: function (oEvent) {
        canvas = document.getElementById("signature-pad");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
          backgroundColor: '#ffffff',
          penColor: 'rgb(0, 0, 0)',
          penWidth: '1'
        });
      }
    });
  });