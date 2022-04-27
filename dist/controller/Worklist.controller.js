sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,r,s){"use strict";return e.extend("opensap.manageproducts.manageproducts.controller.Worklist",{formatter:i,_mFilters:{cheap:[new sap.ui.model.Filter("Price","LT",100)],moderate:[new sap.ui.model.Filter("Price","BT",100,1e3)],expensive:[new sap.ui.model.Filter("Price","GT",1e3)]},onInit:function(){var e;this._aTableSearchState=[];e=new t({worklistTableTitle:this.getResourceBundle().getText("worklistTableTitle"),shareSendEmailSubject:this.getResourceBundle().getText("shareSendEmailWorklistSubject"),shareSendEmailMessage:this.getResourceBundle().getText("shareSendEmailWorklistMessage",[location.href]),tableNoDataText:this.getResourceBundle().getText("tableNoDataText"),tableBusyDelay:0,cheap:0,moderate:0,expensive:0});this.setModel(e,"worklistView")},onQuickFilter:function(e){var t=e.getParameter("key"),i=this._mFilters[t],r=this.byId("table"),s=r.getBinding("items");if(i){s.filter(i)}else{s.filter([])}},onUpdateFinished:function(e){var t,i=e.getSource(),r=this.getModel(),s=this.getModel("worklistView"),o=e.getParameter("total");if(o&&i.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("worklistTableTitleCount",[o]);jQuery.each(this._mFilters,function(e,t){r.read("/ProductSet/$count",{filters:t,success:function(t){var i="/"+e;s.setProperty(i,t)}})})}else{t=this.getResourceBundle().getText("worklistTableTitle")}this.getModel("worklistView").setProperty("/worklistTableTitle",t)},onPress:function(e){this._showObject(e.getSource())},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var i=e.getParameter("query");if(i&&i.length>0){t=[new r("ProductID",s.Contains,i)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getPath().substring("/ProductSet".length)})},_applySearch:function(e){var t=this.byId("table"),i=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){i.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}}})});