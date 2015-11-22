Ext.define('_App.view.product.UpdateProductForm', {
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
            title: 'Update Product',
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
                       ]
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
        var productid = localStorage.getItem("productId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getProduct?productId=' + productid);
        var records = result.data;
        var productNameField = this.down('[name=ProductName]');
        productNameField.setValue(records.productName);
        var productDescriptionField = this.down('[name=ProductDescription]');
        productDescriptionField.setValue(records.productDescription);
        var priceField = this.down('[name=Price]');
        priceField.setValue(records.price);
        var categoryTitleField = this.down('[name=CategoryTitle]');
        categoryTitleField.setValue(records.categoryTitle.categoryTitle);
    },

    btnUpdate_onTap: function () {
        var me = this;

        var productid = localStorage.getItem("productId");
        var category = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        var productName = '&productName=' + me.down('[name= ProductName]').getValue();
        var productDescription = '&productDescription=' + me.down('[name= ProductDescription]').getValue();
        var price = '&price=' + me.down('[name= Price]').getValue();
        var productIdParam = '&productId=' + productid;

        var params = category + productName + productDescription + price + productIdParam;
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateProduct?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Product record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.product.ProductMain());
        }

    }
});



