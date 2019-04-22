sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  'sap/ui/model/Sorter',
  'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
  "use strict";
  return Controller.extend("ems.UI5Showcase.controller.customers.MasterCustomer", {
    onInit: function () {
      this.oView = this.getView();
      this._bDescendingSort = false;
      this.oCustomerTable = this.oView.byId("customerList");
      this.oRouter = this.getOwnerComponent().getRouter();
    },
    onSearch: function (oEvent) {
      var oTableSearchState = [],
        sQuery = oEvent.getParameter("query");

      if (sQuery && sQuery.length > 0) {
        oTableSearchState = [new Filter("company", FilterOperator.Contains, sQuery)];
      }
      this.oCustomerTable.getBinding("items").filter(oTableSearchState, "Application");
    },
    onAdd: function () {
      MessageBox.information("This functionality is not ready yet.", {
        title: "Aw, Snap!"
      });
    },
    onSort: function () {
      this._bDescendingSort = !this._bDescendingSort;
      var oBinding = this.oProductsTable.getBinding("items"),
        oSorter = new Sorter("company", this._bDescendingSort);

      oBinding.sort(oSorter);
    },
    onListItemPress: function (oEvent) {
      debugger;
      var productPath = oEvent.getSource().getBindingContext("customer").getPath();
      var product = productPath.split("/").slice(-1).pop();

    }
  });
}, true);