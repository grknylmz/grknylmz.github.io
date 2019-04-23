sap.ui.define(["sap/ui/base/Object"], function(UI5Object) {
  "use strict";

  return UI5Object.extend("gqsystema.zmaterial_manager.util.BusyIndicator", {
    constructor: function() {},

    hideBusyIndicator: function() {
      sap.ui.core.BusyIndicator.hide();
    },

    showBusyIndicator: function(iDuration, iDelay) {
      sap.ui.core.BusyIndicator.show(iDelay);

      if (iDuration && iDuration > 0) {
        if (this._sTimeoutId) {
          jQuery.sap.clearDelayedCall(this._sTimeoutId);
          this._sTimeoutId = null;
        }

        this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
          this.hideBusyIndicator();
        });
      }
    },

    show: function() {
      this.showBusyIndicator(2000, 0);
    }
  });
});
