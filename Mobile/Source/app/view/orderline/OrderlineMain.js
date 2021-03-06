﻿Ext.define('_App.view.orderline.OrderlineMain', {
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
            title: 'Orderline Main Menu',
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
                    text: '<span>View User <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'info',
                    name: 'View',
                    scope: this,
                    handler: this.btnViewUser_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'add',
                    text: '<span>Add Order <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnAddOrderline_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    iconCls: 'compose',
                    text: '<span>Update User <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnUpdateUser_onTap
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Delete User <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    iconCls: 'delete',
                    scope: this,
                    handler: this.btnDeleteUser_onTap
                }
            ]
        });

        /*var result = _App.myWebServiceGet(_App.baseURL + 'getAllEmployeeDetails?');

        if(result.data)
        {
            me.down('[name= View]');
        }*/
    },

    btnViewUser_onTap: function () {

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllProductDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'There are no products to order', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.user.ViewUser());
        }


    },

    btnAddOrderline_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.orderline.AddOrderline());
    },

    btnDeleteUser_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.employee.DeleteEmployee());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllUserDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No user records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.user.DeleteUser());
        }
    },
    btnUpdateUser_onTap: function () {
        //Ext.Viewport.setActiveItem(new _App.view.employee.UpdateEmployee());
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllUserDetails?');

        if (result.data.length < 1) {
            Ext.Msg.alert('Notification', 'No User records exist.', Ext.emptyFn);
        }
        else {
            Ext.Viewport.setActiveItem(new _App.view.user.UpdateUser());
        }
    }
});



