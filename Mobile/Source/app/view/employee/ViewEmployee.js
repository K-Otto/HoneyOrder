Ext.define('_App.view.employee.ViewEmployee', {
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
            title: 'View Employee',
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

        var searchResultsList = new Ext.create('Ext.List', {
            fullscreen: true,
            name: 'searchResultsList',
            data: this.load(),
            deferEmptyText: true,
            scope: this,
            emptyText: 'No Employee Records to display.',
            itemTpl: [
                '<div><span>Employee Id: {employeeID}</span></div>',
               '<div><span>First Name: {firstName}</span>&nbsp;<span>Last Name: {lastName}</span></div>',
               '<div><span>Gender: {gender}</span>&nbsp;<span>Age: {age}</span></div>',
               '<div><span>Employee Type: {employeeType}</span>&nbsp;<span>Qualification: {qualification}</span></div>',
            ].join(''),
            //data: this.load()
        });

        if (this.load().length) {

            this.add(searchResultsList);
        }
        else { return };

        this.add({
            xtype: 'container',
            docked: 'top',
            style: 'padding:10px;',
            width: '100%',
            defaults: {
                style: 'margin-top:10px;'
            },
            items: [
                 /*{
                     xtype: 'textfield',
                     name: 'EmployeeID',
                     id: 'EmployeeID',
                     //label: 'Patient ID',                    
                     placeHolder: 'Employee ID'
                 },*/
                 /*{
                     xtype: 'button',
                     iconCls: 'search',
                     text: '<span >Search <icon class="icon-play-circle-o" style="font-weight: normal;"></icon></span>',
                     scope: this,
                     handler: this.btnSearch_onTap
                 }*/
            ]
        });

        //var searchResults = [];
        //searchResults.push({ name: 'Kurt', surname: 'Wasserfall' });
        //searchResults.push({ name: 'Ancel', surname: 'Albertus' });
        //searchResults.push({ name: 'Garran', surname: 'Micheals' });
      
        //var searchResultsList = new Ext.create('Ext.List', {
        //    fullscreen: true,
        //    itemTpl: [
        //        '<div>{name}</div>',
        //        '<div>{surname}</div>',
        //    ].join(''),
        //    data: searchResults
        //});
    },

    btnSearch_onTap: function()
    {
        var me = this;
        var patientId = me.down('[name= EmployeeID]').getValue();
        var params = patientId;
        //var result = _App.myWebServiceGet(_App.baseURL + 'getEmployeeDetails?employeeID=' + params);
        Ext.Msg.alert('Error', _App.baseURL + 'getEmployeeDetails?employeeID=' + params, Ext.emptyFn);
    },

    load: function ()
    {
        var searchResults = [];
     
        var result = _App.myWebServiceGet(_App.baseURL + 'getAllEmployeeDetails?');

        if (result.errorMessage) {
            //alert result.errorMessage
        }
        else {
            var records = result.data;
            if (records.length) {

                for (var i = 0; i < records.length; i++) {
                    searchResults.push({
                        employeeID: records[i].employeeID,
                        firstName: records[i].person.firstName,
                        lastName: records[i].person.lastName,
                        age: records[i].person.age,
                        gender: records[i].person.gender,
                        qualification: records[i].qualification,
                        employeeType: records[i].employeeType
                    });
                }
            }
            else
            {
                //searchResults = [{}];
                // Ext.Viewport.down('[name=searchResultsList]').setData([]);
                // Ext.Viewport.down('[name=searchResultsList]').getStore().setData([]);
            }
        }
        /*result.data[0].person
Object {firstName: "Doe", lastName: "John", gender: "Male", age: 50}*/


        /*[{"employeeID":1,"person":{"firstName":"Grey","lastName":"Merideth",
        "gender":"Female","age":25},
        "qualification":"MD",
        "employeeType":"Doctor",
        "treatment":null},*/
       

        return searchResults;

        
    }
});





