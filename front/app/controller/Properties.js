Ext.define('Entre.controller.Properties', {
    extend: 'Ext.app.Controller',
    requires: [
        'Entre.view.PropertyWin',
        'Entre.controller.Nav'
    ],

    refs: [{
        ref: 'propertyGrid',
        selector: 'manage-property-view > grid'
    },{
        ref: 'propertyThermostat',
        selector: 'property-view > form'
    },{
        ref: 'navtree',
        selector: 'app-nav'
    }],
    models: ['Object', 'Thermostat', 'Property'],
    stores: ['Objects2', 'Thermostats', 'Properties'],

    init: function() {
        this.control({
            'manage-property-view > grid > * > #create': {
                click: this.propertyWin
            },
            'manage-property-view > grid > * > #update': {
                click: this.propertyWin2
            },
            'property-win > form > toolbar > #submit': {
                click: this.addNewProperty
            },
            'manage-property-view > grid > * > #delete': {
                click: this.deleteProperty
            },
            //'property-view > form': {
            //    beforerender: this.loadThermostat
            //    //beforeshow: this.loadThermostat
            //},
            'property-view': {
                //important to use THIS form
                beforerender: function(ths){
                console.log('hi');
                    var form = ths.down('form');
                    this.loadThermostat(form);
                }
            }
        });
    },

    //for create!!
    propertyWin: function(form) {
        global.setCU('create');
        var win = Ext.create('Entre.view.PropertyWin');
        win.show();
    },

    //for update!!
    propertyWin2: function(form) {
        global.setCU('update');
        var grid = this.getPropertyGrid();
        //if something is selected,
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            global.setTmp(row.data.id);
            var win = Ext.create('Entre.view.PropertyWin');
            win.show();
            win.down('form').getForm().loadRecord(row);
        } else {
            alert('please select a property to update!');
        }
    },

    deleteProperty: function(){
        var grid = this.getPropertyGrid();
        //if something is selected,
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var prop_id = row.get('id');
            var name = row.get('name');
            var me = this;
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete "' + name + '"?', function(choice){
                if(choice == 'yes'){
                    me.ajax(prop_id, grid, 'DELETE', name)
                }
            });
        } else {
            alert('please select a property to delete!');
        }
    },

    ajax: function(prop_id, grid, METHOD, nodename){
        var me = this;
        Ext.Ajax.request({
            url: '/Entre/resources/property/' + prop_id,
            method: METHOD,
            success: function(resp){
                grid.getStore().load();
                alert('successfully deleted');
                var rnode = me.getNavtree().getRootNode();
                rnode.findChild('text', 'My Properties').findChild('text', nodename).remove();
            }
        });
    },

    addNewProperty: function(ths){
        var isNew = global.getCU();
        var url;
        if(isNew == 'update'){
            url = '/Entre/resources/api/property/update/' + global.getTmp();
        } else {
            url = '/Entre/resources/api/property/create/';
        }
        var me = this;
        var form = ths.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                params: {
                    ownerId: Entre.cfg.Runtime.getToken()
                },
                success: function(form, action) {
                    var win = ths.up('window');

                    if(isNew != 'update'){
                        var rnode = me.getNavtree().getRootNode();
                        rnode.findChild('text', 'My Properties').appendChild({
                            text: win.down('#name').getValue(),
                            leaf: true
                        });
                    }

                    win.close();
                    alert('Success');
                    //Ext.ComponentQuery.query('manage-property-view > grid')[0].getStore().load();
                    me.getPropertyGrid().getStore().load();
                },
                failure: function(form, action) {
                    alert('Failed');
                }
            });
        }
    },

    loadThermostat: function(form) {
        var id = this.getNavtree().getSelectionModel().getSelection()[0].data.id;
        //debug = id;
        var me = this;
        this.getObjects2Store().load({
            url: '/Entre/resources/api/object/for_property/' + id,
            method: 'GET',
            reader: {
                type: 'xml',
                root: 'object1s',
                record: 'object1'
            },
            callback: function(records, operation, success){
                //load record into form
                //me.getPropertyThermostat().loadRecord(records[0]);
                alert('this property has ' + records.length + ' objects.');
                form.loadRecord(records[0]);
                if(records[0].data.objectType == 'thermostat'){
                    me.getThermostatFromObject(records[0].data.id, form);
                }
            }
        });
    },

    getThermostatFromObject: function(objId, form){
        var me = this;
        this.getThermostatsStore().load({
            url: '/Entre/resources/api/thermostat/for_object/' + objId,
            method: 'GET',
            callback: function(rec, operation, success){
                //me.getPropertyThermostat().loadRecord(rec[0]);
                form.loadRecord(rec[0]);
            }
        });
    },

    sendNewTemp: function(btn){
        //debug = btn.up('form').getForm();
    }

});
