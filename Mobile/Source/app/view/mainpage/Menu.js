Ext.define('_App.view.mainpage.Menu', {
    requires: [
         '_App.view.mainpage.Main'
    ],
    singleton: true,
    initialize: function () {
        this.additionalCfg = null;


        this.region = 'left';

        var arrData = [];

        //arrData.push({ text: 'Employee', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.employee.EmployeeMain' });
        //arrData.push({ text: 'Patient', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.patient.PatientMain' });
        //arrData.push({ text: 'Medicine', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.medicine.MedicineMain' });
        //arrData.push({ text: 'Treatment', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.treatment.TreatmentMain' });
        arrData.push({ text: 'User', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.user.UserMain' });
        arrData.push({ text: 'Category', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.category.CategoryMain' });
        arrData.push({ text: 'Logout', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.login.Main' });

        /*arrData.push({ text: 'Operation', icon: 'icon-info' });
        arrData.push({ text: 'Operation Theatre', icon: 'icon-info' });
        arrData.push({ text: 'Room', icon: 'icon-info' });
        arrData.push({ text: 'Bed', icon: 'icon-info' });*/


        
        //    arrData.push({ text: 'My Trips', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.features.trips.Main' });
        
       
        //    arrData.push({ text: 'My Excursions', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.features.excursion.Main' });
        
        
        //    arrData.push({ text: 'Media', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
        
        //    arrData.push({ text: 'Passenger Excursion', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
        
        //    arrData.push({ text: 'Restaurants', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
        
        //    arrData.push({ text: 'My Profile', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
        
        //    arrData.push({ text: 'My Expenditures', icon: 'icon-info', handler: '', isApp: '1', form: '_App.view.features.expenditure.CapturePicture' });
        
        
        //    arrData.push({ text: 'View My Tours', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
        
        //    arrData.push({ text: 'Weather', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        
       
        //    arrData.push({ text: 'Traffic', icon: 'icon-info', handler: '', isApp: '1', form: '' });
        

        //arrData.push({ text: 'Settings', icon: 'icon-info', handler: '' });
        //arrData.push({ text: 'Logout', icon: 'icon-logout big', handler: 'this.btnLogout_onTap()' });

        this.menu = Ext.create('Ext.Menu', {
            width: '65%',
            style: 'padding:0px;border-right:2px groove;',
            layout: 'fit',
            items: [
                {
                    xtype: 'titlebar',
                    style: 'height: 48px;',
                    title: 'Menu',
                    //ui: 'TouristaGreen',
                    docked: 'top',
                    items: [
                        {
                            iconCls: 'home', ui: 'plain', align: 'left', scope: this, handler: function () {
                                Ext.Viewport.toggleMenu('right');
                                this.toggleMenu(this.additionalCfg);
                                //_App.view.mainpage.Menu.btnHomeMenu_onTap();
                                //_App.view.mainpage.Main;
                                //Ext.Viewport.add(Ext.create('_App.view.mainpage.Main'));
                                Ext.Viewport.setActiveItem(new _App.view.mainpage.Main());
                            }
                        }
                    ]
                },
                {
                    xtype: 'list',
                    selectedCls: 'gray-list-selected',
                    itemCls: 'gray-list',
                    style: 'background-color: #ffffff;',
                    itemTpl: [

                        '<table>',
                            '<tr>',
                                '<td style="width:35px; height : 50px;">',
                                    '<icon class="{icon}" style="height:30px;width:30px;"></icon>',
                                '</td>',
                                '<td>',
                                    '<span style="margin-bottom:10px;font-size:0.9em;">&nbsp;&nbsp;{text}</span>',
                                '</td>',
                            '</tr>',
                        '</table>'
                    ].join(''),
                    data: arrData,
                    listeners: {
                        scope: this,
                        itemtap: function (list, index, target, record, e, eOpts) {
                            Ext.Viewport.toggleMenu(this.region);
                            this.toggleMenu(this.additionalCfg);
                            this.menuItem_onTap(record);

                        }
                    }
                }
            ]
        });

        Ext.Viewport.setMenu(this.menu, {
            side: this.region,
            reveal: true
        });
    },
    menuItem_onTap: function (record) {
        if (record.get('isApp') == "1") {
            this.ShowApp(record);

        }
        else if (record.get('handler')) {
            Ext.apply(eval(record.get('handler')), this);
        }
    },

    toggleMenu: function (config) {
        if (config.scope) {
            config.scope.parent.setMasked(null);
            config.scope.parent.setMasked(this.menu.getHidden());
            this.additionalCfg = config;
            var mask = config.scope.parent.getMasked();
            if (mask) {
                mask.clearListeners();

                mask.on('tap', function () {
                    console.log('mask tapped');
                    this.toggleMenu(config);
                }, this, { single: true });
            }
        }
        Ext.Viewport.toggleMenu(this.region);
    },

    btnHomeMenu_onTap: function () {
        Ext.Viewport.setActiveItem(new _App.view.Main());
    },

    ShowApp: function (record) {
        if (record.get('form')) {
            var form = Ext.create(record.get("form"));
            
            //var result = {};

            var result = _App.myWebServiceGet(_App.baseURL + 'getAllTreatmentDetails?');
            if (result.data.length < 1)
            {
                console.log("length less than 1");
                if (record.get("form") == '_App.view.medicine.MedicineMain' || record.get("form") == '_App.view.treatment.TreatmentMain') {
                    console.log("Medicine or treatment menu pressed");
                    Ext.Msg.alert('Notification', 'First add a patient record.', Ext.emptyFn);
                    return;
                }
            }
            else if (!result.data.length)
            {
                Ext.Msg.alert('Notification', 'The server is currently anavailable', Ext.emptyFn);
            }
           
        console.log("Menu item displayed");
        Ext.Viewport.setActiveItem(form);
            
            
        }
    }
});