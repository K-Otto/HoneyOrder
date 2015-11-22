Ext.define('_App.view.product.ViewProduct', {
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
            title: 'View Product',
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
            docked: 'top',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            },
            items: [
                 /*{
                     xtype: 'textfield',
                     name: 'EmployeeID',
                     id: 'EmployeeID',
                     //label: 'Patient ID',                    
                     placeHolder: 'Employee ID'
                 },*/
                 /*{
                     xtype: 'button',
                     iconCls: 'search',
                     text: '<span >Search <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnSearch_onTap
                 }*/
            ]
        });

        //var searchResults = [];
        //searchResults.push({ name: 'Kurt', surname: 'Wasserfall' });
        //searchResults.push({ name: 'Ancel', surname: 'Albertus' });
        //searchResults.push({ name: 'Garran', surname: 'Micheals' });

        //var searchResultsList = new Ext.create('Ext.List', {
        //    fullscreen: true,
        //    itemTpl: [
        //        '<div>{name}</div>',
        //        '<div>{surname}</div>',
        //    ].join(''),
        //    data: searchResults
        //});
    },

    btnSearch_onTap: function () {
        var me = this;
        var productId = me.down('[name= ProductID]').getValue();
        var params = productId;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        Ext.Msg.alert('Error', _App.baseURL + 'getProduct?productId=' + params, Ext.emptyFn);
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





