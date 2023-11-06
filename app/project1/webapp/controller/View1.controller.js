sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast,ColumnListItem,Input) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                this._oTable = this.byId("table0");
                this._createReadOnlyTemplates();
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                this.oEditableTemplate = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{mainModel>Node_Key}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>BP_ID}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>BP_Role}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>Email_Address}",
                            change: [this.onInputChange, this]
                        }),  new Input({
                            value: "{mainModel>Phone_Number}",
                            change: [this.onInputChange, this]
                        }),
                        ,  new Input({
                            value: "{mainModel>Fax_Number}",
                            change: [this.onInputChange, this]
                        }),
                        ,  new Input({
                            value: "{mainModel>Company_Name}",
                            change: [this.onInputChange, this]
                        })
                    ]
                });
            },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
             },
             onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
             },
             onCreate0: function () {
                var oSo = this.getView().byId("idSo").getValue();
                if (oSo !== "") {
                    const oList = this._oTable;
                        const oBinding = oList.getBinding("items");
                        const oContext = oBinding.create({
                            "Node_Key": this.byId("idSo").getValue(),
                            "BP_Role": this.byId("idCustName").getValue(),
                            "BP_ID": this.byId("idCustomer").getValue(),
                            "Email_Address": this.byId("idPo").getValue(),
                            "Phone_Number": this.byId("idInqNumber").getValue(),
                            "Fax_Number": this.byId("idfaxNumber").getValue(),     
                            "Company_Name": this.byId("idcompanyname").getValue()      

                        });
                        oContext.created()
                        .then(()=>{
                                // that._focusItem(oList, oContext);
                                this.getView().byId("OpenDialog").close();
                        });
  
                }else {
                    MessageToast.show("field cannot be blank");
                }
    
            },
            onEditMode: function(){
                this.byId("editModeButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("deleteButton").setVisible(true);
                this.rebindTable(this.oEditableTemplate, "Edit");
           },
           onDelete: function(){

            var oSelected = this.byId("table0").getSelectedItem();
            if(oSelected){
                var oSalesOrder = oSelected.getBindingContext("mainModel").getObject().Node_Key;
            
                oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                    MessageToast.show(oSalesOrder + " SuccessFully Deleted");
                }.bind(this), function (oError) {
                    MessageToast.show("Deletion Error: ",oError);
                });
            } else {
                MessageToast.show("Please Select a Row to Delete");
            }
            
        },
        rebindTable: function(oTemplate, sKeyboardMode) {
            this._oTable.bindItems({
                path: "mainModel>/businesspartner",
                template: oTemplate,
                templateShareable: true
            }).setKeyboardMode(sKeyboardMode);
        },
        onInputChange: function(){
            this.refreshModel("mainModel");

        },
        
refreshModel: function (sModelName, sGroup){
            return new Promise((resolve,reject)=>{
                this.makeChangesAndSubmit.call(this,resolve,reject,
                sModelName,sGroup);
            });
            
        },
        makeChangesAndSubmit: function (resolve, reject, sModelName,sGroup){
            const that = this;
            sModelName = "mainModel";
            sGroup = "$auto";
            if (that.getView().getModel(sModelName).hasPendingChanges(sGroup)) {
                that.getView().getModel(sModelName).submitBatch(sGroup).then(oSuccess =>{
                    that.makeChangesAndSubmit(resolve,reject, sModelName,sGroup);
                    MessageToast.show("Record updated Successfully");
                },reject)
                .catch(function errorHandler(err) {
                    MessageToast.show("Something Went Wrong ",err.message); // 'Oops!'
                  });
            } else {
                that.getView().getModel(sModelName).refresh(sGroup);
                resolve();
            }
        },
        onSave: function(){
            this.getView().byId("editModeButton").setVisible(true);
            this.getView().byId("saveButton").setVisible(false);
            this._oTable.setMode(sap.m.ListMode.None);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
            
        },
        _createReadOnlyTemplates: function () {
            this.oReadOnlyTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({
                    text: "{mainModel>Node_Key}"
                }),
                new sap.m.Text({
                    text: "{mainModel>BP_ID}"
                }),
                new sap.m.Text({
                    text: "{mainModel>BP_Role}"
                }),
                new sap.m.Text({
                    text: "{mainModel>Email_Address}"
                }),
                new sap.m.Text({
                    text: "{mainModel>Phone_Number}"
                }),
                new sap.m.Text({
                    text: "{mainModel>Fax_Number}"
                }),
                new sap.m.Text({
                    text: "{mainModel>Company_Name}"
                })
            ]
        });
    },
    onCreate:function(){
        const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteView2");
        },

        });
    });
