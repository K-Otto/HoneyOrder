Ext.define('_App.view.treatment.ViewTreatment', {
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
            title: 'View Treatment',
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
        var searchResultsList = new Ext.create('Ext.List', {
            fullscreen: true,
            name: 'searchResultsList',
            data: this.load(),
            deferEmptyText: true,
            scope: this,
            emptyText: 'No Employee Records to display.',
            itemTpl: [
               '<div><span>Treatment Id: {treatmentId}</span></div>',
               '<div><span>Date Admitted: {dateAdmitted}</span></div>',
               '<div><span>Date Discharged: {dateDischarged}</span></div>'
            ].join(''),
            //data: this.load()
        });

        if (this.load().length) {

            this.add(searchResultsList);
        }
        else { return };

        this.add({
            xtype: 'container',
            docked: 'top',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            }
            /*items: [
                 {
                     xtype: 'textfield',
                     name: 'Treatment ID',
                     //label: 'Patient ID',                    
                     placeHolder: 'Treatment ID'
                 },
                 {
                     xtype: 'button',
                     iconCls: 'search',
                     text: '<span >Search <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this
                 }
            ]*/
        });
    },
    load: function () {
        var searchResults = [];

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllTreatmentDetails?');

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    searchResults.push({
                        treatmentId: records[i].treatmentID,
                        dateAdmitted: records[i].dateAdmitted,
                        dateDischarged: records[i].dateDischarged
                    });
                }
            }
            else {
                //searchResults = [{}];
                // Ext.Viewport.down('[name=searchResultsList]').setData([]);
                // Ext.Viewport.down('[name=searchResultsList]').getStore().setData([]);
            }
        }
        return searchResults;


    }
});



