sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',

  ],
  function (jQuery, MessageToast, Fragment, Controller) {
    "use strict";

    return Controller.extend("Ems.UI5Showcase.controller.customers.Customer", {

      onAfterRendering: function () {
        this.oView = this.getView();
        this._bDescendingSort = false;
        this.oDocsTable = this.oView.byId("customerList");
      },
      onPressResize: function () {
        if (this.byId("btnResize").getTooltip() == "Minimize") {
          if (sap.ui.Device.system.phone) {
            this.byId("vbi").minimize(132, 56, 1320, 560); // Height: 3,5 rem; Width: 8,25 rem
          } else {
            this.byId("vbi").minimize(168, 72, 1680, 720); // Height: 4,5 rem; Width: 10,5 rem
          }
          this.byId("btnResize").setTooltip("Maximize");
        } else {
          this.byId("vbi").maximize();
          this.byId("btnResize").setTooltip("Minimize");
        }
      },

      onRegionClick: function (e) {
        sap.m.MessageToast.show("onRegionClick " + e.getParameter("code"));
      },

      onRegionContextMenu: function (e) {
        sap.m.MessageToast.show("onRegionContextMenu " + e.getParameter("code"));
      },
      onClickItem: function (evt) {
        alert("onClick");
      },

      onContextMenuItem: function (evt) {
        alert("onContextMenu");
      },

      onClickSpot: function (evt) {
        alert("onClickSpot " + evt.getSource().getBindingContext().getProperty("tooltip"));
      },

      onContextMenuSpot: function (evt) {
        alert("onContextMenuSpot " + evt.getSource().getBindingContext().getProperty("tooltip"));
      }

    });

  });