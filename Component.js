sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"ems/UI5Showcase/model/models",
		"sap/ui/model/json/JSONModel",
		"ems/UI5Showcase/bloc/ProductBloc",
		'sap/f/FlexibleColumnLayoutSemanticHelper',
		'sap/f/library'
	],
	function (UIComponent, Device, models, JSONModel, ProductBloc, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
		"use strict";

		return UIComponent.extend("ems.UI5Showcase.Component", {

			metadata: {
				manifest: "json"
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function () {

				// call the init function of the parent
				UIComponent.prototype.init.apply(this, arguments);

				// set products demo model on this sample
				var oProductsModel = new sap.ui.model.json.JSONModel('/model/products.json');
				oProductsModel.setSizeLimit(30);
				this.setModel(oProductsModel, 'products');


				// set products demo model on this sample
				var oBillDocsModel = new JSONModel('/model/billingdocs.json');
				oBillDocsModel.setSizeLimit(30);
				this.setModel(oBillDocsModel, 'billing');

				// set products demo model on this sample
				var oGLAccountModel = new JSONModel('/model/product.json');
				oGLAccountModel.setSizeLimit(30);
				this.setModel(oGLAccountModel, 'glaccount');

				// set products demo model on this sample
				var oCustomersModel = new JSONModel('/model/customers.json');
				oCustomersModel.setSizeLimit(30);
				this.setModel(oCustomersModel, 'customer');

				// set products demo model on this sample
				var oCustomerSectorModel = new JSONModel('/model/customerSectorCategory.json');
				oCustomerSectorModel.setSizeLimit(30);
				this.setModel(oCustomerSectorModel, 'sectorCategory');

				// set products demo model on this sample
				var odataMapModel = new JSONModel('/model/data.json');
				odataMapModel.setSizeLimit(30);
				this.setModel(odataMapModel, 'map');

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");
			},

			getContentDensityClass: function () {
				if (this._contentDensityClass === undefined) {
					// check whether FLP has already set the content density class; do nothing in this case
					if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
						this._contentDensityClass = "";
					} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
						this._contentDensityClass = "sapUiSizeCompact";
					} else {
						// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
						this._contentDensityClass = "sapUiSizeCozy";
					}
				}
				return this._contentDensityClass;
			},
			createDeviceModel: function () {
				var oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");

				// Disable the scan barcode button by default
				oModel.setProperty("/barcodeScanEnabled", false);
				if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
					navigator.mediaDevices.getUserMedia({
						video: true
					}).then(function (stream) {
						// device supports video, which means will enable the scan button
						oModel.setProperty("/barcodeScanEnabled", true);
					}).catch(function (err) {
						// not supported, barcodeScanEnabled already default to false
					});
				}

				return oModel;



			},

		});
	});