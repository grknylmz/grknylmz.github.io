sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
    "use strict";
    return Controller.extend("ems.UI5Showcase.controller.billing.MasterBillingDocs", {
        onInit: function () {
            this.oView = this.getView();
            this._bDescendingSort = false;
            this.oDocsTable = this.oView.byId("list");
        },
        onSearch: function (oEvent) {
            var oTableSearchState = [],
                sQuery = oEvent.getParameter("query");
            if (sQuery && sQuery.length > 0) {
                oTableSearchState = [new Filter("BillDoc", FilterOperator.Contains, sQuery)];
            }
            this.oDocsTable.getBinding("items").filter(oTableSearchState, "Application");
        },
        onListItemPress: function () {
            var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
        },
        onCreateDocument: function (event) {
            if (!this._createDocumentDialog) {
                this._createDocumentDialog = sap.ui.xmlfragment(this.getView().getId(),
                    "ems.UI5Showcase.fragments.CreateDocument",
                    this
                );
                this._createDocumentDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
                this.getView().addDependent(this._createDocumentDialog);

            }
            this._createDocumentDialog.open();
        },
        onAddCancelDocDialog: function () {
            this._createDocumentDialog.close();
        }
    });
}, true);