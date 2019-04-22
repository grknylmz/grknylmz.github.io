sap.ui.define([
		"ems/UI5Showcase/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"ems/UI5Showcase/util/FirebaseCred",
		"ems/UI5Showcase/util/Message",
		'sap/m/MessageToast'
	],
	function (BaseController, JSONModel, FirebaseCred, Message, MessageToast) {
		"use strict";
		var _query, _messageList = [],
			_oModel, _collInstance, _sUsername, _firebaseConnector;


		return BaseController.extend("ems.UI5Showcase.controller.messenger.Messenger", {
			onInit: function () {
				var oData = {
					MessageCollection: _messageList,
				};
				_oModel = new JSONModel(oData);
				this.setModel(_oModel);
				this._initializeFirebase();
			},
			_initializeFirebase: function () {
				_firebaseConnector = new FirebaseCred();
				_query = _firebaseConnector.getQuery();
				_collInstance = _firebaseConnector.getCollectionInstance();
				_query.onSnapshot(function (snapshot) {
					snapshot.docChanges().forEach(function (change) {
						if (change.type === 'added') {
							var data = change.doc.data();
							var values = {
								author: data.author,
								timestamp: data.timestamp,
								text: data.text
							};
							_messageList.push(values);
						}
					});
					_oModel.setProperty("/MessageCollection", _messageList);
				});
			},
			onInputChange: function (oEvent) {
				_sUsername = oEvent.getParameter("value");
			},
			onPost: function (oEvent) {
				if (_sUsername != null) {
					var sValue = oEvent.getParameter("value");
					this.sendMessage(sValue);
				} else {
					var msg = "Please enter a username first.";
					MessageToast.show(msg);
				}
			},
			sendMessage: function (messageText) {
				_collInstance = _firebaseConnector.getCollectionInstance();
				var ts = firebase.firestore.Timestamp.now();
				return _collInstance.add({
					author: _sUsername,
					text: messageText,
					timestamp: ts.seconds
				}).catch(function (error) {
					console.error('Error writing new message to Firebase Database', error);
				});
			}
		});
	});