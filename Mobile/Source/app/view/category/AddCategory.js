Ext.define('_App.view.category.AddCategory', {
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
    }, initialize: function () {


        var me = this;

        //_App.view.mainpage.Menu.initialize();

        this.add({
            xtype: 'titlebar',
            title: 'Add Category',
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
                     name: 'CategoryTitle',
                     //label: 'Patient ID',                    
                     placeHolder: 'Category Title'
                 },
                   {
                       xtype: 'button',
                       iconCls: 'add',
                       text: '<span >Add <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                       scope: this,
                       handler: this.btnSearch_onTap
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

        //this.add(searchResultsList);
    },

    btnSearch_onTap: function () {
        var me = this;
        var categoryTitle = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        var params = categoryTitle;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);

        var result1 = _App.myWebServiceGet(_App.baseURL + 'getCategoryByCategoryTitle?' + categoryTitle);

        if (result1.data == undefined) {
            var result = _App.myWebServiceGet(_App.baseURL + 'addCategory?' + params);

            console.log(result);

            if (result) {
                Ext.Msg.alert('Success', 'Category record successfully saved.', Ext.emptyFn);
                Ext.Viewport.setActiveItem(new _App.view.category.CategoryMain());
            }
        }
        else {
            Ext.Msg.alert('Error', 'A category with that title already exists.', Ext.emptyFn);
        }

        

    }
});



