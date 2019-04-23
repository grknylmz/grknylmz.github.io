// declare the module (also ensures existance of foo.bar)
jQuery.sap.declare("foo.bar.MyClass");

// declare and document the constructor function
sap.ui.base.Object.extend("foo.bar.MyClass", /** @lends foo.bar.MyClass */ {

  constructor: function(sId, mProperties) {

    // init and document members here
    /**
     * The ID of a MyClass.
     *
     * @private
     */
    this.mId = sId || Utils.createGUID();
  },

  // now add further methods to that prototype
  /**
   * Again a summary in one sentence.
   *
   * More details can be documented, when the method is more complex.
   * @param {string} sMethod The same mechanism as above can be used to
   *                         document the parameters.
   * @param {object} [oListener] An optional parameter. If empty, the
   *                             <code>window</code> is used instead.
   * @experimental Since 1.24 Behavior might change.
   * @public
   */
  ownMethod: function(sMethod, oListener) {

    // ... impl
  },

  /**
   * A private method.
   *
   * Every member with a doc comment is included in the public JSDOC.
   * So we explicitly declare this as a private member:
   * 
   * Additionally, using an underscore prefix prevents this method
   * from beeing added to the public facade.
   *
   * @private
   */
  _myVeryPrivateMethod: function() {
  }

});
