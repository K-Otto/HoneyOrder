Ext.define('_App.view.patient.PatientMain', {
    extend: 'Ext.Panel',
    requires: [
    ],
    config: {
        //style: 'background-color: #4D4DFF  ;',
        cls: 'app-background-white',

        //style: 'background-color: #79CDCD  ;',
        layout: {
            type: 'fit'
            //align: 'center'
        }
    },
    initialize: function () {


        var me = this;

        //_App.view.mainpage.Menu.initialize();

        this.add({
            xtype: 'titlebar',
            title: 'Patient Main Menu',
            docked: 'top',
            items: [
                {

                    xtype: 'button',
                    align: 'left',
                    name: 'navigator',
                    text: '<span>Menu <icon class="icon-reorder" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: function () {
                        _App.view.mainpage.Menu.toggleMenu({
                            scope: this
                        });
                    }
                }
            ]
        });

        this.add({
            centered: true,
            //width: '50%',
            items: [
                
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>View Patient <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'info',
                    scope: this,
                    handler: this.btnViewPatient_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'add',
                    text: '<span>Add Patient <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnAddPatient_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'compose',
                    text: '<span>Update Patient <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnUpdatePatient_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Delete Patient <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'delete',
                    scope: this,
                    handler: this.btnDeletePatient_onTap
                }
            ]
        });
    },

    btnViewPatient_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.patient.ViewPatient());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllPatientDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No patient records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.patient.ViewPatient());
        }
    },

    btnAddPatient_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.patient.AddPatient());
    },

    btnDeletePatient_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.patient.DeletePatient());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllPatientDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No patient records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.patient.DeletePatient());
        }
    },
    btnUpdatePatient_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.patient.UpdatePatient());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllPatientDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No patient records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.patient.UpdatePatient());
        }
    }
});



