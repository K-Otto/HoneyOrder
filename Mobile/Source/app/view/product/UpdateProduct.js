Ext.define('_App.view.product.UpdateProduct', {
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

        var searchResultsList = new Ext.create('Ext.List', {
            fullscreen: true,
            name: 'searchResultsList',
            data: this.load(),
            deferEmptyText: true,
            scope: this,
            emptyText: 'No Product Records to display.',
            itemTpl: [
                '<div><span>Product Id: {productId}</span></div>',
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
                     iconCls: 'compose',
                     text: '<span >Update <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnUpdate_onTap
                 }
            ]
        });
    },
    btnUpdate_onTap: function () {
        //<debug>
        console.log('btnDelete_onTap');
        //</debug>
        var me = this;

        var templist = this.down('[name=searchResultsList]');
        var list = (this.down('[name=searchResultsList]') ? this.down('[name=searchResultsList]').getSelection() : 0);

        if (list.length) {
            var productRecord = this.down('[name=searchResultsList]').getSelection()[0];
            var product = productRecord.get('productId');
            me.updateProduct(product);

            this.down('[name=searchResultsList]').setData([]);
            this.down('[name=searchResultsList]').getStore().setData([]);
            this.down('[name=searchResultsList]').setData(me.load());

        }
    },
    updateProduct: function (product) {
        //var result = _App.myWebServiceGet(_App.baseURL + 'deleteEmployee?employeeID=' + employeeId);

        localStorage.setItem("productId", product);
        Ext.Viewport.setActiveItem(new _App.view.product.UpdateProductForm());

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



