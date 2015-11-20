Ext.define('_App.view.employee.UpdateEmployeeForm', {
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
            title: 'Update Employee',
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
                       label: 'Male',
                       id: 'Male'/*,
                       checked: true*/
                   },
                   {
                       xtype: 'radiofield',
                       name: 'Gender',
                       value: 'Female',
                       label: 'Female',
                       id: 'Female'
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
                       label: 'Doctor',
                       id: 'Doctor'/*,
                       checked: true*/
                   },
                   {
                       xtype: 'radiofield',
                       name: 'EmployeeType',
                       value: 'Nurse',
                       label: 'Nurse',
                       id: 'Nurse'
                   },
                   /*{
                       xtype: 'numberfield',
                       label: 'Treatment ID',
                       minValue: 0,
                       maxValue: 150,
                       name: 'TreatmentID'
                   },*/

                   //button

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
        var employeeid = localStorage.getItem("employeeid");
        var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + employeeid);
        var records = result.data;
        var firstNameField = this.down('[name=FirstName]');
        firstNameField.setValue(records.person.firstName);
        var lastNameField = this.down('[name=LastName]');
        lastNameField.setValue(records.person.lastName);
        var ageField = this.down('[name=Age]');
        ageField.setValue(records.person.age);
        //var genderSelection = this.down('[name=Gender]');
        //genderSelection.setGroupValue(records.person.gender);
        var qualificationField = this.down('[name=Qualification]');
        qualificationField.setValue(records.qualification);
        /*var employeeTypeSelection = this.down('[name=EmployeeType]');
        employeeTypeSelection.setGroupValue({ EmployeeType: records.employeeType });
        if (records.employeeType == "Doctor")
        {
            this.down('[id=Doctor]')._checked = true;
        }
        else
        {
            this.down('[id=Nurse]')._checked = true;
        }*/
        
        /*var treatmentField = this.down('[name=TreatmentID]');
        treatmentField.setValue(records.treatment);*/



    },

    btnUpdate_onTap: function () {
        var me = this;

        if (me.down('[id= Nurse]')._checked == false && me.down('[id= Doctor]')._checked == false)
        {
            Ext.Msg.alert('Notification', 'Please select an Employee Type.', Ext.emptyFn);
            return;
        }
        else if (me.down('[id= Male]')._checked == false && me.down('[id= Female]')._checked == false)
        {
            Ext.Msg.alert('Notification', 'Please select a Gender.', Ext.emptyFn);
            return;
        }

        var employeeid = localStorage.getItem("employeeid");
        var firstName = 'firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();
        var age = '&age=' + me.down('[name= Age]').getValue();
        var gender = '&gender=' + me.down('[name= Gender]').getGroupValue();
        var qualification = '&qualification=' + me.down('[name= Qualification]').getValue();
        var employeeType = '&employeeType=' + me.down('[name= EmployeeType]').getGroupValue();
        var employeeIdParam = '&employeeID=' + employeeid;


        var params = firstName + lastName + gender + age + qualification + employeeType + employeeIdParam;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateEmployee?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Employee record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.employee.EmployeeMain());
        }

    }
});



