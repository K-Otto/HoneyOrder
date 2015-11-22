Ext.define('_App.view.product.AddProduct', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.product.ProductMain'
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
            title: 'Add Product',
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
                        Ext.Viewport.setActiveItem(new _App.view.product.ProductMain());
                    }
                }
            ]
        });

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllCategoryDetails?');

        var arrData = [];

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    //searchResults.push({
                    //    categoryId: records[i].categoryId,
                    //    categoryTitle: records[i].categoryTitle
                    //});
                    //arrData.push(records[i].categoryTitle);
                    arrData.push({ text: records[i].categoryTitle, value: records[i].categoryTitle })
                }
            }
            else {
                //searchResults = [{}];
                // Ext.Viewport.down('[name=searchResultsList]').setData([]);
                // Ext.Viewport.down('[name=searchResultsList]').getStore().setData([]);
            }
        }


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
                     name: 'ProductName',
                     //label: 'Patient ID',                    
                     placeHolder: 'ProductName'
                 },
                  {
                      xtype: 'textfield',
                      name: 'ProductDescription',
                      //label: 'Patient ID',
                      placeHolder: 'Product Description'
                  },
                   {
                       xtype: 'numberfield',
                       label: 'Price',
                       name: 'Price'
                   },
                   {
                       xtype: 'fieldset',
                       title: 'Select',
                       items: [
                           {
                               xtype: 'selectfield',
                               label: 'Choose one',
                               id: 'CategoryTitle',
                               name: 'CategoryTitle',
                               options: arrData
                           }
                       ]},
                   //{
                   //    html: [
                   //        '<div style="text-align:left;">',
                   //            '<div>',
                   //               '<br><select id="CategoryTitle"></select><br>',
                   //            '</div>',
                   //        '</div>'
                   //    ].join(''),
                   //    style: 'margin-bottom: 30px;'
                   //},
                   {
                       xtype: 'button',
                       iconCls: 'add',
                       text: '<span >Add <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                       scope: this,
                       handler: this.btnSearch_onTap
                   }
            ]
        });

        //this.load();

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
        var category = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        var productName = '&productName=' + me.down('[name= ProductName]').getValue();
        var productDescription = '&productDescription=' + me.down('[name= ProductDescription]').getValue();
        var price = '&price=' + me.down('[name= Price]').getValue();
       

        var params = category + productName + productDescription + price;
        var result = _App.myWebServiceGet(_App.baseURL + 'addProduct?' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        if (result) {
                    Ext.Msg.alert('Success', 'Product record successfully saved.', Ext.emptyFn);
                    Ext.Viewport.setActiveItem(new _App.view.product.ProductMain());
        }

        //var result1 = _App.myWebServiceGet(_App.baseURL + 'getUserByUsername?' + username);

        //if (result1.data == undefined) {
        //    var result = _App.myWebServiceGet(_App.baseURL + 'saveUser?' + params);

        //    console.log(result);

        //    if (result) {
        //        Ext.Msg.alert('Success', 'User record successfully saved.', Ext.emptyFn);
        //        Ext.Viewport.setActiveItem(new _App.view.user.UserMain());
        //    }
        //}
        //else {
        //    Ext.Msg.alert('Error', 'A user with that username already exists.', Ext.emptyFn);
        //}

    }
});



