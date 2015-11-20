Ext.define('_App.view.user.UpdateUserForm', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.user.UserMain'
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
            title: 'Update User',
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
                        Ext.Viewport.setActiveItem(new _App.view.user.UserMain());
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
                     name: 'FirstName',
                     //label: 'Patient ID',                    
                     placeHolder: 'First Name'
                 },
                  {
                      xtype: 'textfield',
                      name: 'LastName',
                      //label: 'Patient ID',
                      placeHolder: 'Last Name'
                  },
                   {
                       xtype: 'textfield',
                       name: 'Username',
                       //label: 'Patient ID',
                       placeHolder: 'Username'
                   },
                   {
                       xtype: 'textfield',
                       name: 'Password',
                       //label: 'Patient ID',
                       placeHolder: 'Password'
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
        var userid = localStorage.getItem("userId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getUserById?userId=' + userid);
        var records = result.data;
        var firstNameField = this.down('[name=FirstName]');
        firstNameField.setValue(records.firstName);
        var lastNameField = this.down('[name=LastName]');
        lastNameField.setValue(records.lastName);

        var usernameField = this.down('[name=Username]');
        usernameField.setValue(records.username);
        var passwordField = this.down('[name=Password]');
        passwordField.setValue(records.password);
    },

    btnUpdate_onTap: function () {
        var me = this;

        var userid = localStorage.getItem("userId");

        var username = 'username=' + me.down('[name= Username]').getValue();
        var password = '&password=' + me.down('[name= Password]').getValue();
        var firstName = '&firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();
        var userIdParam = '&userId=' + userid;


        var params = username + password + firstName + lastName + userIdParam;
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateUser?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'User record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.user.UserMain());
        }

    }
});



