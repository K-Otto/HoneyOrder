Ext.define('_App.view.mainpage.Main', {
    extend: 'Ext.Panel',
    requires: [
        '_App.view.Main'
    ],
    config: {
        //style: 'background-color: #4D4DFF  ;',
        cls: 'app-background-white',
        //style: 'background-color: #79CDCD  ;',
        layout: {
            type: 'fit'
            //align: 'center'
        }
    }, initialize: function () {


        var me = this;

        _App.view.mainpage.Menu.initialize();

        this.add({
            xtype: 'titlebar',
            title: 'Home',
            docked: 'top',
            //ui: 'TouristaGreen',
            items: [
                {
                   /* xtype: 'button',
                    //iconCls: 'menu',
                    align: 'left',
                    ui: 'plain',
                    name: 'navigator',
                    scope: this,
                    handler: function () {
                        _App.view.Menu.toggleMenu({
                            scope: this
                        });
                    }*/

                    xtype: 'button',
                    align: 'left',
                    name: 'navigator',
                    //text: '<icon class="icon-reorder" style="font-weight: normal;vertical-align: middle;"></icon>',
                    text: '<span>Menu <icon class="icon-reorder" style="font-weight: normal;vertical-align: middle;"></icon></span>',
                    scope: this,
                    //handler: this.btnLogin_onTap
                    handler: function () {
                        _App.view.mainpage.Menu.toggleMenu({
                            scope: this
                        });
                    }
                }
            ]
        });

        /*this.add(new Ext.dataview.List({
            cls: 'transparent-background customHeader', //customHeader
            itemCls: 'home-menu-item x-small-list-item',
            store: 'Excursion',
            emptyText: 'Please select <img src="resources/images/nav-help.png" style="width:30px"/> for options.',
            grouped: true,
            itemTpl: new Ext.XTemplate([
                '<div>',
                    '<table style="width:100%">',
                        '<tr>',
                            '<tr> <span style="color:#000000;font-weight: bold;">{ExcursionName}</span></tr></br>',
                             '<tr><span style="color:#000000;">Tour Guide:<i>{TourGuide}</i></span></tr></br>',
                            '<tr><span style="color:#000000;">Date: {TripExcursionDate:date("d-M-Y")}</span></tr>',
                            '<tr>',
                              '<td>',
                                 '<span style="color:#000000;">Duration Days: {DurationDays}</span>',
                              '</td>',
                               '<td style="text-align:right;padding-right:15px;">',
                                    '<span style="color:#000000;">Duration Nights: {DurationNights}</span>',
                               '</td>',
                            '</tr>',
                        '</tr>',
                    '</table>',
                '</div>'
            ].join(''),
            {
            }),
            listeners: {
                scope: me,
                itemtap: function (view, target, index, record) {
                    me.listItem_onTap(view, record);
                }
            }
        }));*/


        //_App.ux.BubbleNotification.show({
        //    title: 'Info',
        //    message: 'Please tap on a excursion for details.',
        //    delay: 6000,
        //    cls: 'info'
        //});

        //var btn = me.down('button[name= navigator]');

        //    var pnl = new Ext.Panel({
        //        hideOnMaskTap: true,
        //        modal: true,
        //        height: 45,
        //        padding: 5,
        //        width: 200,
        //        style: 'background-color:#7f925b',
        //        listeners: {
        //            'painted': function ()
        //            {
        //                Ext.defer(function ()
        //                {
        //                    this.on('hide', this.destroy, this);
        //                }, 200, this);
        //            }
        //        },
        //        showAnimation: { type: 'fadeIn', duration: 500 },
        //        html: 'Tap here for options'
        //    });

        //    pnl.showBy(btn);

        //    window.setTimeout(function ()
        //    {
        //        try
        //        {
        //            pnl.destroy();
        //        }
        //        catch (e)
        //        {
        //        }
        //    }, 3000);


       // this.loadPax();
    }

    //loadPax: function () {

    //    Ext.getStore('Excursion').removeAll();

    //    Ext.Viewport.setMasked(new Ext.LoadMask({
    //        message: "Loading..."
    //    }));

    //    _OASIS.callService({
    //        ServiceCall: 'PaxExcursion_listByPaxID',
    //        InputParams: {
    //            prmPaxID: _App.Session.PaxID
    //        },
    //        async: true,
    //        callback: function (result) {
    //            Ext.Viewport.setMasked(false);

    //            if (!result.Success) {
    //                _App.ux.BubbleNotification.show({
    //                    message: result.LastErrorDescription,
    //                    delay: 6000,
    //                    cls: 'failure'
    //                });
    //                return;
    //            }

    //            var records = result.Data;

    //            Ext.getStore('Excursion').add(records); //quick way to add to store
    //            Ext.getStore('Excursion').load();


    //        }
    //    });



    //},


    //listItem_onTap: function (view, record) {

    //    Ext.Viewport.setActiveItem(new _App.view.features.excursion.Info({
    //        record: record

    //    }));
    //}


});



