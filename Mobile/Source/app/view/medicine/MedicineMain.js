Ext.define('_App.view.medicine.MedicineMain', {
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
            title: 'Medicine Main Menu',
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
                    text: '<span>View Medicine <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'info',
                    scope: this,
                    handler: this.btnViewMedicine_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'add',
                    text: '<span>Add Medicine <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnAddMedicine_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'compose',
                    text: '<span>Update Medicine <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnUpdateMedicine_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Delete Medicine <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'delete',
                    scope: this,
                    handler: this.btnDeleteMedicine_onTap
                }
            ]
        });
    },

    btnViewMedicine_onTap: function () {
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllMedicineDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No medicine records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.medicine.ViewMedicine());
        }

            //Ext.Viewport.setActiveItem(new _App.view.medicine.ViewMedicine());
    },

    btnAddMedicine_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.medicine.AddMedicine());
    },

    btnDeleteMedicine_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.medicine.DeleteMedicine());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllMedicineDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No medicine records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.medicine.DeleteMedicine());
        }
    },
    btnUpdateMedicine_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.medicine.UpdateMedicine());

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllMedicineDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No medicine records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.medicine.UpdateMedicine());
        }
    }
});



