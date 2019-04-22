sap.ui.define([

], function () {
  "use strict";
  var _ProductSubject;
  return {
    initialize: function () {
      //Create the Rx instance
      _ProductSubject = new Rx.BehaviorSubject();
    },

    getSubject: function () {
      return _ProductSubject;
    },

    inProduct: function (oProductsModel) {
      _ProductSubject.next(oProductsModel);
    }
  };
});