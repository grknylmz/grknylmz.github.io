sap.ui.define([
  "sap/ui/core/library"
], function (coreLibrary) {
  "use strict";

  // shortcut for sap.ui.core.ValueState
  var ValueState = coreLibrary.ValueState;

  return {

    /**
     * Rounds the number unit value to 2 digits
     * @public
     * @param {string} sValue the number string to be rounded
     * @returns {string} sValue with 2 digits rounded
     */
    numberUnit: function (sValue) {
      if (!sValue) {
        return "";
      }
      return parseFloat(sValue).toFixed(2);
    },
    /**
     * Defines a value state based on the stock level
     *
     * @public
     * @param {number} iValue the stock level of a product
     * @returns {string} sValue the state for the stock level
     */
    quantityState: function (iValue) {
      if (iValue === 0) {
        return ValueState.Error;
      } else if (iValue <= 10) {
        return ValueState.Warning;
      } else {
        return ValueState.Success;
      }
    },
    /**
     * Returns the relative URL to a product picture
     * @param {string} sUrl image URL
     * @return {string} relative image URL
     */
    pictureUrl: function (sUrl) {
      if (sUrl) {
        return sap.ui.require.toUrl(sUrl);
      } else {
        return undefined;
      }
    },
    /**
     * Returns the status text based on the product status
     * @param {string} sStatus product status
     * @return {string} the corresponding text if found or the original value
     */
    statusText: function (sStatus) {
      var oBundle = this.getResourceBundle();

      var mStatusText = {
        "A": oBundle.getText("statusA"),
        "O": oBundle.getText("statusO"),
        "D": oBundle.getText("statusD")
      };

      return mStatusText[sStatus] || sStatus;
    },
    statusState: function (oOpen) {
      if (oOpen === null) {
        return "None";
      }
      if (oOpen === true) {
        return "Open";
      } else {
        return "Closed";
      }
    },
    colorState: function (oOpen) {

      if (oOpen === true) {
        return "Success";
      } else { // delivery is in time
        return "Error";
      }
    }




  };

});