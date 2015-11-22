/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: '_App',
    
    requires: [
        'Ext.MessageBox',
        'Ext.field.Checkbox',
        'Ext.dataview.List',
        'Ext.field.Password',
        'Ext.Menu',
        'Ext.XTemplate',
        'Ext.field.Radio',
        'Ext.field.Number'
    ],

    views: [
        'Main',
        'login.Main',
        'mainpage.Main',
        'mainpage.Menu',
        'patient.ViewPatient',
        'patient.AddPatient',
        'patient.DeletePatient',
        'patient.UpdatePatient',
        'patient.UpdatePatientForm',
        'employee.ViewEmployee',
        'employee.AddEmployee',
        'employee.DeleteEmployee',
        'employee.UpdateEmployee',
        'employee.UpdateEmployeeForm',
        'medicine.ViewMedicine',
        'medicine.AddMedicine',
        'medicine.DeleteMedicine',
        'medicine.UpdateMedicine',
        'medicine.UpdateMedicineForm',
        'treatment.ViewTreatment',
        'treatment.AddTreatment',
        'treatment.DeleteTreatment',
        'treatment.UpdateTreatment',
        'treatment.UpdateTreatmentForm',
        'user.ViewUser',
        'user.DeleteUser',
        'user.AddUser',
        'user.UpdateUser',
        'user.UpdateUserForm',
        'category.AddCategory',
        'category.ViewCategory',
        'category.DeleteCategory',
        'category.UpdateCategory',
        'category.UpdateCategoryForm',
        'product.AddProduct',
        'product.ViewProduct',
        'product.DeleteProduct',
        'product.UpdateProduct',
        'product.UpdateProductForm',
        'orderline.AddOrderline'



    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
		   if (Ext.os.is.Android)
        {
            //maybe target more specific android versions.
            Ext.Viewport.on('painted', function ()
            {
                Ext.Viewport.setHeight(window.innerHeight);
            });
        }

        Ext.override(Ext.util.SizeMonitor, {
            constructor: function (config)
            {
                var namespace = Ext.util.sizemonitor;

                if (Ext.browser.is.Firefox)
                {
                    return new namespace.OverflowChange(config);
                } else if (Ext.browser.is.WebKit)
                {
                    if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36'))
                    {
                        return new namespace.OverflowChange(config);
                    } else
                    {
                        return new namespace.Scroll(config);
                    }
                } else if (Ext.browser.is.IE11)
                {
                    return new namespace.Scroll(config);
                } else
                {
                    return new namespace.Scroll(config);
                }
            }
        });

        Ext.override(Ext.util.PaintMonitor, {
            constructor: function (config)
            {
                if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry))
                {
                    return new Ext.util.paintmonitor.OverflowChange(config);
                }
                else
                {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            }
        });
		
        Ext.fly('appLoadingIndicator').destroy();

       
        _App.baseURL = "http://localhost:9090/hosp/api/";
        //_App.baseURL =  "http://154.0.170.187:9090/hosp/api/"

        _App.myWebServiceGet = function (param) {

            Ext.Viewport.setMasked(true);
            var result = {}
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", param, false);

            //try the send request
            try {
                xmlHttp.send(null);
            } catch (err) {
                //<debug>
                console.log(err.message);
                //</debug>
                result.errorMessage = 'The server is currently unavailable.';
            }

            //200 means it was successfull
            if (xmlHttp.status == 200) {
                try {

                    result.data = JSON.parse(xmlHttp.response);
                    Ext.Viewport.setMasked(false);
                }
                catch (err) {
                    //<debug>
                    console.log(err.message);
                    //</debug>
                }
            }

            //no connectiviy
            if (xmlHttp.status == 0) {
                result.errorMessage = 'Failed to connect to server. Please ensure that your device is connected to the internet.';
            }

            Ext.Viewport.setMasked(false);
            return result;
        }

   

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('_App.view.Main'));
        Ext.Viewport.add(Ext.create('_App.view.login.Main'));
        //Ext.Viewport.setActiveItem(new _App.view.login.Main());
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
