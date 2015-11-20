Ext.define('_App.view.user.AddUser', {
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
            title: 'Add User',
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
        var username = 'username=' + me.down('[name= Username]').getValue();
        var password = '&password=' + me.down('[name= Password]').getValue();
        var firstName = '&firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();

        var params = username + password + firstName + lastName;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result1 = _App.myWebServiceGet(_App.baseURL + 'getUserByUsername?' + username);

        if (result1.data == undefined)
        {
            var result = _App.myWebServiceGet(_App.baseURL + 'saveUser?' + params);

            console.log(result);

            if (result) {
                Ext.Msg.alert('Success', 'User record successfully saved.', Ext.emptyFn);
                Ext.Viewport.setActiveItem(new _App.view.user.UserMain());
            }
        }
        else {
            Ext.Msg.alert('Error', 'A user with that username already exists.', Ext.emptyFn);
        }

    }
});



