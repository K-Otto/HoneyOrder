Ext.define('_App.view.patient.AddPatient', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.patient.PatientMain'
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
            title: 'Add Patient',
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
                        Ext.Viewport.setActiveItem(new _App.view.patient.PatientMain());
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
                      //label: 'Ptient ID',
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
                       name: 'Description',
                       //label: 'Patient ID',                    
                       placeHolder: 'Description'
                   },
                   {
                       xtype: 'datepickerfield',
                       label: 'Date Admitted',
                       name: 'DateAdmitted',
                       value: new Date()
                   },
                   //button
                   

                   {
                       xtype: 'button',
                       iconCls: 'add',
                       text: '<span >Add <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                       docked: 'bottom',
                       scope: this,
                       handler: this.btnAdd_onTap
                   }
            ]
        });
        //this.add(searchResultsList);
    },
    btnAdd_onTap: function () {
        var me = this;
        var firstName = 'firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();
        var age = '&age=' + me.down('[name= Age]').getValue();
        var gender = '&gender=' + me.down('[name= Gender]').getGroupValue();
        var description = '&description=' + me.down('[name= Description]').getValue();
        var dateAdmitted = '&dateAdmitted=' + me.down('[name= DateAdmitted]').getValue();


        var params = firstName + lastName + gender + age + description + dateAdmitted + '&dateDischarged=null';
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'addPatient?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Patient record successfully saved.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.patient.PatientMain());
        }

    }
});



