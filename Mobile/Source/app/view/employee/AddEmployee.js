Ext.define('_App.view.employee.AddEmployee', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.employee.EmployeeMain'
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
            title: 'Add Employee',
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
                        Ext.Viewport.setActiveItem(new _App.view.employee.EmployeeMain());
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
                       xtype: 'numberfield',
                       label: 'Age',
                       minValue: 0,
                       maxValue: 150,
                       name: 'Age'
                   },
                   {
                       xtype: 'radiofield',
                       name: 'Gender',
                       value: 'Male',
                       label: 'Male'/*,
                       checked: true*/
                   },
                   {
                       xtype: 'radiofield',
                       name: 'Gender',
                       value: 'Female',
                       label: 'Female'
                   },
                   {
                       xtype: 'textfield',
                       name: 'Qualification',
                       //label: 'Patient ID',
                       placeHolder: 'Qualification'
                   },
                   {
                       xtype: 'radiofield',
                       name: 'EmployeeType',
                       value: 'Doctor',
                       label: 'Doctor'/*,
                       checked: true*/
                   },
                   {
                       xtype: 'radiofield',
                       name: 'EmployeeType',
                       value: 'Nurse',
                       label: 'Nurse'
                   },

                   //button

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
        var firstName = 'firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();
        var age = '&age=' + me.down('[name= Age]').getValue();
        var gender = '&gender=' + me.down('[name= Gender]').getGroupValue();
        var qualification = '&qualification=' + me.down('[name= Qualification]').getValue();
        var employeeType = '&employeeType=' + me.down('[name= EmployeeType]').getGroupValue();


        var params = firstName + lastName + gender + age + qualification + employeeType + '&dateAdmitted=null&dateDischarged=null';
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'addEmployee?' + params);
        
        console.log(result);

        if(result)
        {
            Ext.Msg.alert('Success', 'Employee record successfully saved.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.employee.EmployeeMain());
        }

    }
});



