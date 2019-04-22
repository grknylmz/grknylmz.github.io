sap.ui.define(
  [
    "ems/UI5Showcase/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "ems/UI5Showcase/formatter/formatter",
    "sap/ui/model/Filter"
  ],
  function (BaseController, JSONModel, formatter, Filter) {
    "use strict";
    var lastOperation;
    var _oViewModel;
    var _oTable;
    var statusList = ["lowBalance", "highBalance", "criticalBalance", "all"];
    //url for the repo
    return BaseController.extend(
      "ems.UI5Showcase.controller.glAccount.GLAccount", {
        formatter: formatter,
        getText: function (text) {
          return this.getResourceBundle().getText(text);
        },
        onInit: function () {
          this.oView = this.getView();
          this._bDescendingSort = false;
          this.oDocsTable = this.oView.byId("tableGLAccount");
          var oViewModel, oTable;
          oTable = this.byId("tableGLAccount");
          _oTable = oTable;
          // Model used to manipulate control states
          oViewModel = new JSONModel({
            worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
            shareOnJamTitle: this.getResourceBundle().getText("GLAccountTitle"),
            shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
            shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
            tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
            tableBusyDelay: 0,
            highBalance: 0,
            criticalBalance: 0,
            lowBalance: 0,
            countAll: 0
          });
          this.setModel(oViewModel, "worklistView");
          _oViewModel = oViewModel;
          // Create an object of filters
          this._mFilters = {
            highBalance: [new Filter("balance", "GT", -50)],
            lowBalance: [new Filter("balance", "LE", -100)],
            criticalBalance: [new Filter("balance", "BT", -100, -50)],
            all: []
          };
          // Make sure, busy indication is showing immediately so there is no
          // break after the busy indication for loading the view's meta data is
          // ended (see promise 'oWhenMetadataIsLoaded' in AppController)
          oTable.attachEventOnce("updateFinished", function () {});
        },
        /**
         * Event handler when a filter tab gets pressed
         * @param {sap.ui.base.Event} oEvent the filter tab event
         * @public
         */
        onQuickFilter: function (oEvent) {
          var oBinding = _oTable.getBinding("items");
          var sKey = oEvent.getParameter("selectedKey");
          oBinding.filter(this._mFilters[sKey]);
          lastOperation = sKey;
        },
        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */
        onUpdateFinished: function (oEvent) {
          // update the worklist's object counter after the table update
          var sTitle;
          var oTable = oEvent.getSource();
          var oViewModel = this.getModel("worklistView");
          var iTotalItems = oEvent.getParameter("total");

          // only update the counter if the length is final and
          // if the table is not empty
          if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
            sTitle = this.getResourceBundle().getText(
              "worklistTableTitleCount",
              [iTotalItems]
            );

            switch (lastOperation) {
              case "highBalance":
                oViewModel.setProperty("/highBalance", iTotalItems);
                break;
              case "lowBalance":
                oViewModel.setProperty("/lowBalance", iTotalItems);
                break;
              case "criticalBalance":
                oViewModel.setProperty("/criticalBalance", iTotalItems);
                break;
              default:
                oViewModel.setProperty("/countAll", iTotalItems);
            }
          } else {
            sTitle = this.getResourceBundle().getText("worklistTableTitle");
          }
          this.getModel("worklistView").setProperty(
            "/worklistTableTitle",
            sTitle
          );
        },
        onAfterRendering: function () {
          this._filterBalance();
        },
        _filterBalance: function () {
          var oBinding = _oTable.getBinding("items");
          var oList = oBinding.oList;
          var highBalance = 0;
          var lowBalance = 0;
          var criticalBalance = 0;

          oList.forEach(function (element) {
            if (element.balance > -50) {
              ++highBalance;
            } else if (element.balance <= -100) {
              ++lowBalance;
            } else if (element.balance >= -100 && element.balance <= -50) {
              ++criticalBalance;
            }
          });
          // Loop at status to set balance count
          statusList.forEach(function (element) {
            switch (element) {
              case "highBalance":
                _oViewModel.setProperty("/highBalance", highBalance);
                break;
              case "lowBalance":
                _oViewModel.setProperty("/lowBalance", lowBalance);
                break;
              case "criticalBalance":
                _oViewModel.setProperty("/criticalBalance", criticalBalance);
                break;
              case "all":
                _oViewModel.setProperty("/countAll", oList.length);
                break;
            }
          });
        }
      }
    );
  }
);