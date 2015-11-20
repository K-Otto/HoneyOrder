Ext.define('_App.view.treatment.TreatmentMain', {
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
            title: 'Treatment Main Menu',
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
                    text: '<span>View Treatment <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'info',
                    scope: this,
                    handler: this.btnViewTreatment_onTap
                },
                /*{
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'add',
                    text: '<span>Add Treatment <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnAddTreatment_onTap
                },*/
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'compose',
                    text: '<span>Update Treatment <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnUpdateTreatment_onTap
                }/*,
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Delete Treatment <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'delete',
                    scope: this,
                    handler: this.btnDeleteTreatment_onTap
                }*/
            ]
        });
    },

    btnViewTreatment_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.treatment.ViewTreatment());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllTreatmentDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No Treatment records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.treatment.ViewTreatment());
        }
    },

    btnAddTreatment_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.treatment.AddTreatment());
    },

    btnDeleteTreatment_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.treatment.DeleteTreatment());
    },
    btnUpdateTreatment_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.treatment.UpdateTreatment());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllTreatmentDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No Treatment records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.treatment.UpdateTreatment());
        }
    }
});



