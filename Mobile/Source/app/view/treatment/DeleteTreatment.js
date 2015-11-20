Ext.define('_App.view.treatment.DeleteTreatment', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.treatment.TreatmentMain'
    ],
    config: {
        //style: 'background-color: #4D4DFF  ;',
        cls: 'app-background-white',

        // style: 'background-color: #79CDCD  ;',
        layout: {
            type: 'fit'
            //align: 'center'
        }
    }, initialize: function () {


        var me = this;

        //_App.view.mainpage.Menu.initialize();

        this.add({
            xtype: 'titlebar',
            title: 'Delete Treatment',
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
                },
                {

                    xtype: 'button',
                    align: 'right',
                    name: 'navigator',
                    text: '<span>Back <icon class="icon-reorder" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: function () {
                        Ext.Viewport.setActiveItem(new _App.view.treatment.TreatmentMain());
                    }
                }
            ]
        });

        this.add({
            xtype: 'container',
            docked: 'top',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            },
            items: [
                 {
                     xtype: 'textfield',
                     name: 'Treatment ID',
                     //label: 'Patient ID',                    
                     placeHolder: 'Treatment ID'
                 },
                 {
                     xtype: 'button',
                     iconCls: 'delete',
                     text: '<span >Delete <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this
                 }
            ]
        });

        var searchResults = [];
        searchResults.push({ name: 'Kurt', surname: 'Wasserfall' });
        searchResults.push({ name: 'Ancel', surname: 'Albertus' });
        searchResults.push({ name: 'Garran', surname: 'Micheals' });

        var searchResultsList = new Ext.create('Ext.List', {
            fullscreen: true,
            itemTpl: [
                '<div>{name}</div>',
                '<div>{surname}</div>',
            ].join(''),
            data: searchResults
        });
    }
});



