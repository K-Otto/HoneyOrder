Ext.define('_App.view.product.ProductMain', {
    extend: 'Ext.Panel',
    requires: [
    ],
    config: {
        //style: 'background-color: #4D4DFF  ;',
        cls: 'app-background-white',

        //style: 'background-color: #79CDCD  ;',
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
            title: 'Product Main Menu',
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
                }
            ]
        });

        this.add({
            centered: true,
            //width: '50%',
            items: [

                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>View Product <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'info',
                    name: 'View',
                    scope: this,
                    handler: this.btnViewProduct_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'add',
                    text: '<span>Add Product <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnAddProduct_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'compose',
                    text: '<span>Update Product <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnUpdateProduct_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Delete Product <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'delete',
                    scope: this,
                    handler: this.btnDeleteProduct_onTap
                }
            ]
        });

        /*var result = _App.myWebServiceGet(_App.baseURL + 'getAllEmployeeDetails?');

        if(result.data)
        {
            me.down('[name= View]');
        }*/
    },

    btnViewProduct_onTap: function () {

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllProductDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No product records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.product.ViewProduct());
        }


    },

    btnAddProduct_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.product.AddProduct());
    },

    btnDeleteProduct_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.employee.DeleteEmployee());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllProductDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No product records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.product.DeleteProduct());
        }
    },
    btnUpdateProduct_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.employee.UpdateEmployee());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllProductDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No product records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.product.UpdateProduct());
        }
    }
});



