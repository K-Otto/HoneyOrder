Ext.define('_App.view.category.DeleteCategory', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.category.CategoryMain'
    ],
    config: {
        //style: 'background-color: #4D4DFF  ;',
        cls: 'app-background-white',

        // style: 'background-color: #79CDCD  ;',
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
            title: 'Delete Category',
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
                        Ext.Viewport.setActiveItem(new _App.view.category.CategoryMain());
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
            emptyText: 'No Category Records to display.',
            itemTpl: [
               '<div><span>Category Id: {categoryId}</span>&nbsp;<span>Title: {categoryTitle}</span></div>',
            ].join(''),
            //data: this.load()
        });

        if (this.load().length) {

            this.add(searchResultsList);
        }
        else { return };

        this.add({
            xtype: 'container',
            docked: 'bottom',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            },
            items: [
                 //{
                 //    xtype: 'textfield',
                 //    name: 'EmployeeID',
                 //    //label: 'Patient ID',                    
                 //    placeHolder: 'Employee ID'
                 //},
                 {
                     xtype: 'button',
                     iconCls: 'delete',
                     text: '<span >Delete <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnDelete_onTap
                 }
            ]
        });


    },
    btnDelete_onTap: function () {
        //<debug>
        console.log('btnDelete_onTap');
        //</debug>
        var me = this;

        var templist = this.down('[name=searchResultsList]');
        var list = (this.down('[name=searchResultsList]') ? this.down('[name=searchResultsList]').getSelection() : 0);

        if (list.length) {
            var categoryRecord = this.down('[name=searchResultsList]').getSelection()[0];
            var category = categoryRecord.get('categoryId');
            me.deleteCategory(category);

            this.down('[name=searchResultsList]').setData([]);
            this.down('[name=searchResultsList]').getStore().setData([]);
            this.down('[name=searchResultsList]').setData(me.load());

        }
    },
    deleteCategory: function (categoryId) {
        var result = _App.myWebServiceGet(_App.baseURL + 'deleteCategory?categoryId=' + categoryId);

        if (result.errorMessage) {
            //alert result.errorMessage
            return;
        }
        else {
            //alert succes delete emp
        }
    },
    load: function () {
        var searchResults = [];

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllCategoryDetails?');

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    searchResults.push({
                        categoryId: records[i].categoryId,
                        categoryTitle: records[i].categoryTitle
                    });
                }
            }
            else {
                //searchResults = [{}];
                // Ext.Viewport.down('[name=searchResultsList]').setData([]);
                // Ext.Viewport.down('[name=searchResultsList]').getStore().setData([]);
            }
        }
        /*result.data[0].person
Object {firstName: "Doe", lastName: "John", gender: "Male", age: 50}*/


        /*[{"employeeID":1,"person":{"firstName":"Grey","lastName":"Merideth",
        "gender":"Female","age":25},
        "qualification":"MD",
        "employeeType":"Doctor",
        "treatment":null},*/


        return searchResults;


    }

});



