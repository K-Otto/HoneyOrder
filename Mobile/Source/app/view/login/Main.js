Ext.define('_App.view.login.Main', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.Main',
        '_App.view.mainpage.Main'
    ],
    config: {
        style: 'background-color: #8DA1BB  ;',
        //cls: 'app-background-white',
        //style: 'background-color: #79CDCD  ;',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        listeners: {
            'erased': function ()
            {
                this.destroy();
            }
        }
    },
    initialize: function ()
    {

        var me = this;
        var username = "";
        var userNameHardCoded = "admin";
        var password = "";
        var passwordHardCoded = "admin";
        var remember = "";
    
        if (localStorage.getItem("password") != "" || localStorage.getItem("password") !=  null)
        {
            password = localStorage.getItem("password");
        }


        if (localStorage.getItem("username") != "" || localStorage.getItem("username") != null)
        {
            username = localStorage.getItem("username");
        }

        //Ext.Msg.alert('Error', password , Ext.emptyFn);

        this.add({
            centered: true,
            width: '50%',
            items: [
                {
                    html: [
                        '<div style="text-align:center;">',
                            '<div>',
                               '<img src="resources/images/loginLogo2.png" style="max-width: 200%;max-height:200px;"/>',
                            '</div>',
                        '</div>'
                    ].join(''),
                    style: 'margin-bottom: 30px;'
                },
                {
                    xtype: 'textfield',
                    style: 'font-size:0.8em;',
                    id: 'uname',
                    placeHolder: 'Username',
                    name: 'Username',
                    value: username
                },
                {
                    xtype: 'passwordfield',
                    style: 'margin-top: 10px;font-size:0.8em;',
                    id: 'pword',
                    placeHolder: 'Password',
                    name: 'Password',
                    value: password
                },
                {
                    xtype: 'button',
                    style: 'margin-top: 10px;',
                    text: '<span>Login <icon class="icon-play-circle-o" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    handler: this.btnLogin_onTap
                },
                /*{
                    xtype: 'Ext.field.Checkbox',
                    style: 'font-size:0.8em;',
                    placeHolder: 'Remember me',
                    name: 'Remember',
                    value: remember
                }*/

                /*{
                    xtype: 'checkboxfield',
                    style: '',
                    name: 'tomato',
                    label: 'Tomato',
                    value: 'tomato',
                    checked: true
                }*/
                {
                    html: [
                        '<div style="text-align:left;">',
                            '<div>',
                               '<br><input type="checkbox" name="remember" id="remember" ' + (password == "" || password == null ? '' : 'checked') + '> Remember me<br>',
                            '</div>',
                        '</div>'
                    ].join(''),
                    style: 'margin-bottom: 30px;'
                }
            ]
        });

        //document.getElementById("remember").checked == true;
    },

    btnLogin_onTap: function ()
    {

        var username = this.down('[name=Username]').getValue();
        var password = this.down('[name=Password]').getValue();

        if (document.getElementById("remember").checked == true)
        {
            localStorage.setItem("password", password);
            localStorage.setItem("username", username);
        }
        else {
            localStorage.setItem("password", "");
            localStorage.setItem("username", "");
        }


        if ((username == "") || (password == ""))
        {
            Ext.Msg.alert('Error', 'Please enter login credentials', Ext.emptyFn);
            return false;
        }
        else if ((username == "admin") && (password == "admin")) {
            var result = _App.myWebServiceGet(_App.baseURL + 'getUserByUsername?username=' + username);
            if (result.data == undefined)
            {
                var addUser = result = _App.myWebServiceGet(_App.baseURL + 'saveUser?username=admin&password=admin&firstName=admin&lastName=admin');
                Ext.Viewport.setActiveItem(new _App.view.mainpage.Main());
            }
            else {
                Ext.Viewport.setActiveItem(new _App.view.mainpage.Main());
            }        
        }
        else {
            var result = _App.myWebServiceGet(_App.baseURL + 'getUserByUsername?username=' + username);
            if (result.data == undefined)
            {
                Ext.Msg.alert('Error', 'Please enter valid login credentials', Ext.emptyFn);
            }
            else
            {
                Ext.Viewport.setActiveItem(new _App.view.mainpage.Main());
            }
        }

        //password = _App.ux.Cordova.Encode(password);
        //_App.view.controllers.login(username, password);

      
    }

});