Ext.define('_App.view.orderline.AddOrderline', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.orderline.OrderlineMain'
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
            title: 'Delete Product',
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
                        Ext.Viewport.setActiveItem(new _App.view.orderline.OrderlineMain());
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
            emptyText: 'No Products to display.',
            itemTpl: [
               '<div><span>Product Name: {productName}</span>&nbsp;<span>Product Description: {productDescription}</span></div>',
               '<div><span>Category: {categoryTitle}</span>&nbsp;<span>Price: {price}</span></div>',
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
                     iconCls: 'add',
                     text: '<span >Add <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnAdd_onTap
                 }
            ]
        });


    },
    btnAdd_onTap: function () {
        //<debug>
        console.log('btnDelete_onTap');
        //</debug>
        var me = this;

        var templist = this.down('[name=searchResultsList]');
        var list = (this.down('[name=searchResultsList]') ? this.down('[name=searchResultsList]').getSelection() : 0);

        if (list.length) {
            var productRecord = this.down('[name=searchResultsList]').getSelection()[0];
            var product = productRecord.get('productId');
            me.addProduct(product);

            this.down('[name=searchResultsList]').setData([]);
            this.down('[name=searchResultsList]').getStore().setData([]);
            this.down('[name=searchResultsList]').setData(me.load());

        }
    },
    addProduct: function (productId) {
        //var result = _App.myWebServiceGet(_App.baseURL + 'deleteProduct?productId=' + productId);
        /*Ext.Msg.show({
            title: 'Quantity',
            message: 'Please enter the quantity you would like to purchase:',
            width: 300,
            buttons: Ext.MessageBox.OKCANCEL,
            multiLine: true,
            prompt: { 
                xtype: 'numberfield',
                name: 'Quantity'
             },
            fn: function () {
                //alert('You pressed the "' + buttonId + '" button.');
                //me.down('[name= CategoryTitle]').getValue();
                alert(opt);
            }
        });*/
        var quantity = 0;
        Ext.Msg.prompt(
    'Quantity',
    'Please enter the quantity you would like to purchase:',
    function (buttonId, value) {
        //console.log(value);
        //alert(value + productId);
        quantity = value;

    },
    null,
    false,
    null,
    {
        xtype: 'numberfield',
        name: 'Quantity'
    }
);

        var me = this;
        var productIdParam = 'productId=' + productId;
        var username = '&username=' + localStorage.getItem('loggedInUsername');


        var category = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        var productName = '&productName=' + me.down('[name= ProductName]').getValue();
        var productDescription = '&productDescription=' + me.down('[name= ProductDescription]').getValue();
        var price = '&price=' + me.down('[name= Price]').getValue();

        //var category = 'categoryTitle=' + me.down('[name= CategoryTitle]').getValue();
        //var productName = '&productName=' + me.down('[name= ProductName]').getValue();
        //var productDescription = '&productDescription=' + me.down('[name= ProductDescription]').getValue();
        //var price = '&price=' + me.down('[name= Price]').getValue();


        //var params = category + productName + productDescription + price;
        //var result = _App.myWebServiceGet(_App.baseURL + 'addOrderline?' + params);


    },
    load: function () {
        var searchResults = [];

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllProductDetails?');

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    searchResults.push({
                        productId: records[i].productId,
                        productName: records[i].productName,
                        productDescription: records[i].productDescription,
                        price: records[i].price,
                        categoryTitle: records[i].categoryTitle.categoryTitle
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



