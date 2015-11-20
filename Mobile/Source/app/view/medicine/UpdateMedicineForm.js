Ext.define('_App.view.medicine.UpdateMedicineForm', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.medicine.MedicineMain'
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
            title: 'Update Medicine',
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
                        Ext.Viewport.setActiveItem(new _App.view.medicine.MedicineMain());
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
                     name: 'medicineName',
                     //label: 'Patient ID',                    
                     placeHolder: 'Medicine Name'
                 },
                  {
                      xtype: 'textfield',
                      name: 'medicineType',
                      //label: 'Patient ID',                    
                      placeHolder: 'Medicine Type'
                  },
                   {
                       xtype: 'numberfield',
                       label: 'Quantity',
                       minValue: 0,
                       maxValue: 150,
                       name: 'quantity'
                   },
                   {
                       xtype: 'numberfield',
                       label: 'Treatment ID',
                       minValue: 0,
                       maxValue: 150,
                       name: 'treatmentID',
                       disabled: true
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

        var medicineId = localStorage.getItem("medicineId");
        var result = _App.myWebServiceGet(_App.baseURL + 'getMedicineDetails?medicineID=' + medicineId);
        var records = result.data;
        var medicineNameField = this.down('[name=medicineName]');
        medicineNameField.setValue(records.medicineName);
        var medicineTypeField = this.down('[name=medicineType]');
        medicineTypeField.setValue(records.medicineType);
        var quantityField = this.down('[name=quantity]');
        quantityField.setValue(records.quantity);
        var treatmentIDField = this.down('[name=treatmentID]');
        treatmentIDField.setValue(records.treatmentID);
    },
    btnUpdate_onTap: function () {
        var me = this;

        var medicineId = localStorage.getItem("medicineId");
        var medicineName = 'medicineName=' + me.down('[name= medicineName]').getValue();
        var medicineType = '&medicineType=' + me.down('[name= medicineType]').getValue();
        var quantity = '&quantity=' + me.down('[name= quantity]').getValue();
        var treatmentID = '&treatmentID=' + me.down('[name= treatmentID]').getValue();
        var medicineIdParam = '&medicineID=' + medicineId;

        var params = medicineName + medicineType + quantity + treatmentID + medicineIdParam;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'updateMedicine?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Medicine record successfully updated.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.medicine.MedicineMain());
        }

    }
});



