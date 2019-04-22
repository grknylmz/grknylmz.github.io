sap.ui.define(["ems/UI5Showcase/controller/BaseController"], function(
  BaseController
) {
  "use strict";
  var oRouter;
  return BaseController.extend("ems.UI5Showcase.controller.IndexTiles", {
    onInit: function() {
      oRouter = this.getRouter();
    },
    onVendorTilePress: function(oEvent) {
      oRouter.navTo("vendors");
    },
    onBillingDocsPress: function(oEvent) {
      oRouter.navTo("billingDocs");
    },
    onExit: function() {},
    onPressbusinessAdministration: function() {
      oRouter.navTo("businessAdmin");
    },
    toPressGeneralLedgerAccounts: function() {
      oRouter.navTo("glAccount");
    },
    toPressCustomers: function() {
      oRouter.navTo("customer");
    },
    onNavBarcodeScanner: function() {
      oRouter.navTo("barcodeScanner");
    },
    onNavSignaturePad: function() {
      oRouter.navTo("signaturePad");
    },
    onNavMessenger: function() {
      oRouter.navTo("messenger");
    },
    onNavFile: function() {
      oRouter.navTo("file");
    },
    handlePopoverPress: function(oEvent) {
      if (!this._oPopover) {
        this._oPopover = sap.ui.xmlfragment(
          "ems.UI5Showcase.fragments.Calendar",
          this
        );
        this.getView().addDependent(this._oPopover);
      }
      this._oPopover.openBy(oEvent.getSource());
    },
    onDevResume: function() {
      window.open(
        "https://drive.google.com/file/d/1o8yJa7XWsqlPl4Vb7-45g09nvy0PxcMI/view?usp=sharing"
      );
    },
    onWebComponents: function() {
      window.open("https://ui5-web-components.netlify.com");
    }
  });
});
