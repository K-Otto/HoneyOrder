Ext.define('_App.view.category.UpdateCategoryForm', {
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
            title: 'Update Category',
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
                       iconCls: 'compose',
                       text: '<span >Update <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                       scope: this,
                       handler: this.btnUpdate_onTap
                   }
            ]
        });
        //this.add(searchResultsList);
        var categoryId = localStorage.getItem("categoryId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getCategory?categoryId=' + categoryId);
        var records = result.data;
        var categoryTitleField = this.down('[name=CategoryTitle]');
        categoryTitleField.setValue(records.categoryTitle);
    },

    btnUpdate_onTap: function () {
        var me = this;

        var categoryId = localStorage.getItem("categoryId");

        var title = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        var categoryIdParam = '&categoryId=' + categoryId;


        var params = title + categoryIdParam;
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateCategory?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Category record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.category.CategoryMain());
        }

    }
});



