sap.ui.define([
	"ems/UI5Showcase/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"ems/UI5Showcase/bloc/ProductBloc"
], function (BaseController, JSONModel, Filter, FilterOperator, Sorter, ProductBloc) {
	"use strict";

	return BaseController.extend("ems.UI5Showcase.controller.vendors.Vendors", {

		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}
			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);
			oBinding.sort(oSorter);
		},
		onSelection: function (oEvent) {
			var productId = oEvent.getSource().getBindingContext("products").getPath(), //Get the ID
				product = productId.split("/").slice(-1).pop();
			console.log(product);
		}
	});
});