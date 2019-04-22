sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function (Controller, JSONModel) {
        "use strict";
        return Controller.extend("ems.UI5Showcase.controller.billing.DetailBillingDocs", {

            onEditToggleButtonPress: function () {
                var oObjectPage = this.getView().byId("ObjectPageLayout"),
                    bCurrentShowFooterState = oObjectPage.getShowFooter();
                oObjectPage.setShowFooter(!bCurrentShowFooterState);
            }
        });
    }, true);