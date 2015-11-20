Ext.define('_App.view.medicine.AddMedicine', {
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
            title: 'Add Medicine',
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
                       name: 'treatmentID'
                   },

                   //button

                   {
                       xtype: 'button',
                       iconCls: 'add',
                       text: '<span >Add <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                       scope: this,
                       handler: this.btnAdd_onTap
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
    btnAdd_onTap: function () {
        var me = this;
        var medicineName = 'medicineName=' + me.down('[name= medicineName]').getValue();
        var MedicineType = '&medicineType=' + me.down('[name= medicineType]').getValue();
        var Quantity = '&quantity=' + me.down('[name= quantity]').getValue();
        var TreatmentID = '&treatmentID=' + me.down('[name= treatmentID]').getValue();


        var params = medicineName + MedicineType + Quantity + TreatmentID;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        //Ext.Msg.alert('Error', params, Ext.emptyFn);
        var result = _App.myWebServiceGet(_App.baseURL + 'getTreatmentDetails?treatmentID=' + me.down('[name= treatmentID]').getValue());
        if (!result.data)
        {
            Ext.Msg.alert('Notification', 'Treatment ID does not exist.', Ext.emptyFn);
            return;
        }
        console.log(params);
        var result = _App.myWebServiceGet(_App.baseURL + 'addMedicine?' + params);

        console.log(result);

        if (result) {
            Ext.Msg.alert('Success', 'Medicine record successfully saved.', Ext.emptyFn);
            Ext.Viewport.setActiveItem(new _App.view.medicine.MedicineMain());
        }

    }
});



