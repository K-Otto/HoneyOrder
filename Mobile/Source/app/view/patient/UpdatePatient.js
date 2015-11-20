﻿Ext.define('_App.view.patient.UpdatePatient', {
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

        var searchResultsList = new Ext.create('Ext.List', {
            fullscreen: true,
            name: 'searchResultsList',
            data: this.load(),
            deferEmptyText: true,
            scope: this,
            emptyText: 'No Employee Records to display.',
            itemTpl: [
               '<div><span>Patient Id: {patientID}</span></div>',
               '<div><span>Firstname: {firstName}</span>&nbsp;<span>Lastname: {lastName}</span></div>',
               '<div><span>Gender: {gender}</span>&nbsp;<span>Age: {age}</span></div>',
               '<div><span>Description: {description}</span></div>',
               '<div><span>Treatment ID: {treatmentID}</span></div>',
            ].join(''),
            //data: this.load()
        });

        if (this.load().length) {

            this.add(searchResultsList);
        }
        else { return };

        /*this.add({
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
                     name: 'PatientID',
                     //label: 'Patient ID',                    
                     placeHolder: 'Patient ID'
                 },
                 {
                     xtype: 'button',
                     iconCls: 'compose',
                     text: '<span >Update <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this
                 }
            ]
        });*/

        this.add({
            xtype: 'container',
            docked: 'bottom',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            },
            items: [
                 //{
                 //    xtype: 'textfield',
                 //    name: 'EmployeeID',
                 //    //label: 'Patient ID',                    
                 //    placeHolder: 'Employee ID'
                 //},
                 {
                     xtype: 'button',
                     iconCls: 'compose',
                     text: '<span >Update <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnUpdate_onTap
                 }
            ]
        });
    },
    btnUpdate_onTap: function () {
        //<debug>
        console.log('btnDelete_onTap');
        //</debug>
        var me = this;

        var templist = this.down('[name=searchResultsList]');
        var list = (this.down('[name=searchResultsList]') ? this.down('[name=searchResultsList]').getSelection() : 0);

        if (list.length) {
            var patientRecord = this.down('[name=searchResultsList]').getSelection()[0];
            var patient = patientRecord.get('patientID');
            var treatment = patientRecord.get('treatmentID');
            me.updatePatient(patient, treatment);

            this.down('[name=searchResultsList]').setData([]);
            this.down('[name=searchResultsList]').getStore().setData([]);
            this.down('[name=searchResultsList]').setData(me.load());

        }
    },
    updatePatient: function (patientId, treatmentId) {
        //var result = _App.myWebServiceGet(_App.baseURL + 'deleteEmployee?employeeID=' + employeeId);

        localStorage.setItem("patientId", patientId);
        localStorage.setItem("treatmentId", treatmentId);

        Ext.Viewport.setActiveItem(new _App.view.patient.UpdatePatientForm());

        if (result.errorMessage) {
            //alert result.errorMessage
            return;
        }
        else {
            //alert succes delete emp
        }
    },
    load: function () {
        var searchResults = [];

        var result = _App.myWebServiceGet(_App.baseURL + 'getAllPatientDetails?');

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    searchResults.push({
                        patientID: records[i].patientID,
                        firstName: records[i].person.firstName,
                        lastName: records[i].person.lastName,
                        gender: records[i].person.gender,
                        age: records[i].person.age,
                        description: records[i].description,
                        treatmentID: records[i].treatmentID
                    });
                }
            }
            else {
                //searchResults = [{}];
                // Ext.Viewport.down('[name=searchResultsList]').setData([]);
                // Ext.Viewport.down('[name=searchResultsList]').getStore().setData([]);
            }
        }


        return searchResults;


    }
});



