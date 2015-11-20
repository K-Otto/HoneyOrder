Ext.define('_App.view.treatment.UpdateTreatmentForm', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.treatment.TreatmentMain'
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
            title: 'Add Treatment',
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
                        Ext.Viewport.setActiveItem(new _App.view.treatment.TreatmentMain());
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
                     name: 'TreatmentID',
                     label: 'Treatment ID',
                     disabled: true
                 },
                 {
                     xtype: 'datepickerfield',
                     label: 'Date Admitted',
                     name: 'DateAdmitted',
                     value: new Date()
                 },
                 {
                     xtype: 'datepickerfield',
                     label: 'Date Discharged',
                     name: 'DateDischarged'
                 },
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

        var treatmentid = localStorage.getItem("treatmentId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getTreatmentDetails?treatmentID=' + treatmentid);
        var records = result.data;

        var treatmentIdField = this.down('[name=TreatmentID]');
        treatmentIdField.setValue(treatmentid);

        var dateAdmittedString = records.dateAdmitted;
        var dateDischargedString = records.dateDischarged;

        var dateAdmitted = this.down('[name=DateAdmitted]');
        dateAdmitted.setValue(new Date(dateAdmittedString));
        if (dateDischargedString != "null")
        {
            var dateDischarged = this.down('[name=DateDischarged]');
            dateDischarged.setValue(new Date(dateDischargedString));
        }
        
    },

    btnUpdate_onTap: function () {
        var me = this;
        var treatmentId = '&treatmentID=' + localStorage.getItem("treatmentId");
        var dateAdmitted = 'dateAdmitted=' + this.down('[name=DateAdmitted]').getValue();
        var dateDischarged = '&dateDischarged=' + this.down('[name=DateDischarged]').getValue();

        var params = dateAdmitted + dateDischarged + treatmentId;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateTreatment?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Treatment record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.treatment.TreatmentMain());
        }

    }
});



