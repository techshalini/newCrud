sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("project1.controller.View2", {
            onInit: function () {
            },
            onPress: function(oEvent) {
                var oFirstNameInput = this.getView().byId("input-a").getValue();
                var oLastNameInput = this.getView().byId("input-b").getValue();
                var fax = this.getView().byId("input-c").getValue();
                var phone = this.getView().byId("input-d").getValue();
                var email = this.getView().byId("input-g").getValue();
                var Company_Name = this.getView().byId("input-u").getValue();
                                
                // console.log("First Name: " + oFirstNameInput);
                // console.log("Last Name: " + oLastNameInput);
                // console.log("Fax: " + fax);
                // console.log("Phone: " + phone);
                // console.log("Email: " + email);
         
 var shalu = {
    "Node_Key":oFirstNameInput,
    "BP_Role":oLastNameInput,
    "Fax_Number":fax,
    "Phone_Number":phone,
    "Email_Address":email,
    "Company_Name":Company_Name
 }
      var mohin  = JSON.stringify(shalu);
    //   console.log(mohin)
    var EndPoint= "/odata/v4/myservice/businesspartner";
    fetch(EndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: mohin
    }).then(function (res) {
        if (res) {
            console.log("Entity created successfully"); 
        }
        else {
            console.log("Failed");
        }
    })
    .catch(function (err) {
        console.log("error", err);
    })
            }
        });
    });