Ext.define('_App.view.patient.UpdatePatientForm', {
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
            title: 'Update Patient',
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
                       name: 'Description',
                       //label: 'Patient ID',                    
                       placeHolder: 'Description'
                   },
                   /*{
                       xtype: 'textfield',
                       name: 'TreatmentID',
                       //label: 'Patient ID',                    
                       placeHolder: 'Treatment ID'
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

        var patientid = localStorage.getItem("patientId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getPatientDetails?patientID=' + patientid);
        var records = result.data;
        var firstNameField = this.down('[name=FirstName]');
        firstNameField.setValue(records.person.firstName);
        var lastNameField = this.down('[name=LastName]');
        lastNameField.setValue(records.person.lastName);
        var ageField = this.down('[name=Age]');
        ageField.setValue(records.person.age);
        //var genderSelection = this.down('[name=Gender]');
        //genderSelection.setGroupValue(records.person.gender);
        var Description = this.down('[name=Description]');
        Description.setValue(records.description);
        /*var TreatmentId = this.down('[name=TreatmentID]');
        TreatmentId.setValue(records.treatmentID);*/

    },
    btnUpdate_onTap: function () {
        var me = this;

        if (me.down('[id= Male]')._checked == false && me.down('[id= Female]')._checked == false) {
            Ext.Msg.alert('Notification', 'Please select a Gender.', Ext.emptyFn);
            return;
        }

        var patientid = localStorage.getItem("patientId");
        var treatmentid = localStorage.getItem("treatmentId");
        var firstName = 'firstName=' + me.down('[name= FirstName]').getValue();
        var lastName = '&lastName=' + me.down('[name= LastName]').getValue();
        var age = '&age=' + me.down('[name= Age]').getValue();
        var gender = '&gender=' + me.down('[name= Gender]').getGroupValue();
        var Description = '&description=' + me.down('[name= Description]').getValue();
        var treatmentIdParam = '&treatmentID=' + treatmentid;
        var employeeIdParam = '&patientID=' + patientid;


        var params = firstName + lastName + gender + age + Description + employeeIdParam + treatmentIdParam;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updatePatient?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Patient record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.patient.PatientMain());
        }

    }
});



