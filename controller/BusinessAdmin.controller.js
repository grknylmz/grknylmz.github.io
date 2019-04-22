sap.ui.define([
    "ems/UI5Showcase/controller/BaseController",
    'sap/m/MessagePopover',
    'sap/m/library',
    'sap/ui/core/syncStyleClass',
    'sap/m/Link',
    'sap/m/MessagePopoverItem',
    'sap/m/Button',
    'sap/m/ResponsivePopover',
    'sap/m/NotificationListItem',
    'sap/ui/core/CustomData',
    'sap/m/ActionSheet'
  ],
  function (
    BaseController,
    MessagePopover,
    mobileLibrary,
    syncStyleClass,
    Link,
    MessagePopoverItem,
    Button,
    ResponsivePopover,
    NotificationListItem,
    CustomData,
    ActionSheet
  ) {
    "use strict";

    var oRouter;
    var modelSubject;

    // shortcut for sap.m.VerticalPlacementType
    var VerticalPlacementType = mobileLibrary.VerticalPlacementType;

    // shortcut for sap.m.PlacementType
    var PlacementType = mobileLibrary.PlacementType;

    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;


    return BaseController.extend("ems.UI5Showcase.controller.BusinessAdmin", {
      onInit: function () {

      },
      onUserNamePress: function (oEvent) {
        var oBundle = this.getModel("i18n").getResourceBundle();
        // close message popover
        var oMessagePopover = this.byId("errorMessagePopover");
        if (oMessagePopover && oMessagePopover.isOpen()) {
          oMessagePopover.destroy();
        }
        var fnHandleUserMenuItemPress = function (oEvent) {
          MessageToast.show(oEvent.getSource().getText() + " was pressed");
        };
        var oActionSheet = new ActionSheet(this.getView().createId("userMessageActionSheet"), {
          title: oBundle.getText("userHeaderTitle"),
          showCancelButton: false,
          buttons: [
            new Button({
              text: 'User Settings',
              type: ButtonType.Transparent,
              press: fnHandleUserMenuItemPress
            }),
            new Button({
              text: "Online Guide",
              type: ButtonType.Transparent,
              press: fnHandleUserMenuItemPress
            }),
            new Button({
              text: 'Help',
              type: ButtonType.Transparent,
              press: fnHandleUserMenuItemPress
            }),
            new Button({
              text: 'Logout',
              type: ButtonType.Transparent,
              press: fnHandleUserMenuItemPress
            })
          ],
          afterClose: function () {
            oActionSheet.destroy();
          }
        });
        // forward compact/cozy style into dialog
        syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oActionSheet);
        oActionSheet.openBy(oEvent.getSource());
      },
      /**
       * Factory function for the notification items
       * @param {string} sId The id for the item
       * @param {sap.ui.model.Context} oBindingContext The binding context for the item
       * @returns {sap.m.NotificationListItem} The new notification list item
       * @private
       */
      _createNotification: function (sId, oBindingContext) {
        var oBindingObject = oBindingContext.getObject();
        var oNotificationItem = new NotificationListItem({
          title: oBindingObject.title,
          description: oBindingObject.description,
          priority: oBindingObject.priority,
          close: function (oEvent) {
            var sBindingPath = oEvent.getSource().getCustomData()[0].getValue();
            var sIndex = sBindingPath.split("/").pop();
            var aItems = oEvent.getSource().getModel("alerts").getProperty("/alerts/notifications");
            aItems.splice(sIndex, 1);
            oEvent.getSource().getModel("alerts").setProperty("/alerts/notifications", aItems);
            oEvent.getSource().getModel("alerts").updateBindings("/alerts/notifications");
            MessageToast.show("Notification has been deleted.");
          },
          datetime: oBindingObject.date,
          authorPicture: oBindingObject.icon,
          press: function () {
            var oBundle = this.getModel("i18n").getResourceBundle();
            MessageToast.show(oBundle.getText("notificationItemClickedMessage", oBindingObject.title));
          },
          customData: [
            new CustomData({
              key: "path",
              value: oBindingContext.getPath()
            })
          ]
        });
        return oNotificationItem;
      },
      /**
       * Event handler for the notification button
       * @param {sap.ui.base.Event} oEvent the button press event
       * @public
       */
      onNotificationPress: function (oEvent) {
        var oBundle = this.getModel("i18n").getResourceBundle();
        // close message popover
        var oMessagePopover = this.byId("errorMessagePopover");
        if (oMessagePopover && oMessagePopover.isOpen()) {
          oMessagePopover.destroy();
        }
        var oButton = new Button({
          text: oBundle.getText("notificationButtonText"),
          press: function () {
            MessageToast.show("Show all Notifications was pressed");
          }
        });
        var oNotificationPopover = new ResponsivePopover(this.getView().createId("notificationMessagePopover"), {
          title: oBundle.getText("notificationTitle"),
          contentWidth: "300px",
          endButton: oButton,
          placement: PlacementType.Bottom,
          content: {
            path: 'alerts>/alerts/notifications',
            factory: this._createNotification
          },
          afterClose: function () {
            oNotificationPopover.destroy();
          }
        });
        this.byId("businessAdminToolPage").addDependent(oNotificationPopover);
        // forward compact/cozy style into dialog
        syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oNotificationPopover);
        oNotificationPopover.openBy(oEvent.getSource());
      },
      createError: function (sId, oBindingContext) {
        var oBindingObject = oBindingContext.getObject();
        var oLink = new Link("moreDetailsLink", {
          text: "More Details",
          press: function () {
            MessageToast.show("More Details was pressed");
          }
        });
        var oMessageItem = new MessagePopoverItem({
          title: oBindingObject.title,
          subtitle: oBindingObject.subTitle,
          description: oBindingObject.description,
          counter: oBindingObject.counter,
          link: oLink
        });
        return oMessageItem;
      },
      // Errors Pressed
      onMessagePopoverPress: function (oEvent) {
        if (!this.byId("errorMessagePopover")) {
          var oMessagePopover = new MessagePopover(this.getView().createId("errorMessagePopover"), {
            placement: VerticalPlacementType.Bottom,
            items: {
              path: 'alerts>/alerts/errors',
              factory: this.createError
            },
            afterClose: function () {
              oMessagePopover.destroy();
            }
          });
          this.byId("businessAdminToolPage").addDependent(oMessagePopover);
          // forward compact/cozy style into dialog
          syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oMessagePopover);
          oMessagePopover.openBy(oEvent.getSource());
        }
      },
      _setToggleButtonTooltip: function (bSideExpanded) {
        var oToggleButton = this.byId('sideNavigationToggleButton');
        if (bSideExpanded) {
          oToggleButton.setTooltip('Large Size Navigation');
        } else {
          oToggleButton.setTooltip('Small Size Navigation');
        }
      },
      onSideNavButtonPress: function () {
        var oToolPage = this.byId("businessAdminToolPage");
        var bSideExpanded = oToolPage.getSideExpanded();
        this._setToggleButtonTooltip(bSideExpanded);
        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      }




    });

  });