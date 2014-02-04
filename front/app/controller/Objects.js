Ext.define('Entre.controller.Objects', {
    extend: 'Ext.app.Controller',
    requires: [
        'Entre.view.ObjectWin'
    ],

    refs: [{
        ref: 'objectGrid',
        selector: 'manage-object-view > grid'
    },{
        ref: 'navtree',
        selector: 'app-nav'
    }],

    init: function() {
        this.control({
            /*
            'manage-object-view > grid': {
                aftershow: this.refreshGrid
            },
            */
            'manage-object-view > grid > * > #create': {
                click: this.objectWin
            },
            'manage-object-view > grid > * > #update': {
                click: this.objectWin2
            },
            'object-win > form > toolbar > #submit': {
                click: this.addNewObject
            },
            'manage-object-view > grid > * > #delete': {
                click: this.deleteObject
            }
        });
    },

    //for create!!
    objectWin: function(form) {
        global.setCU('create');
        var win = Ext.create('Entre.view.ObjectWin');
        win.show();
    },

    //for update!!
    objectWin2: function(form) {
        global.setCU('update');
        var grid = this.getObjectGrid();
        //if something is selected,
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            global.setTmp(row.data.id);
            var win = Ext.create('Entre.view.ObjectWin');
            win.show();
            win.down('form').getForm().loadRecord(row);
        } else {
            alert('please select a object to update!');
        }
    },

    deleteObject: function(){
        var grid = this.getObjectGrid();
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
            alert('please select an object to delete!');
        }
    },

    ajax: function(prop_id, grid, METHOD, nodename){
        var me = this;
        Ext.Ajax.request({
            url: '/Entre/resources/object/' + prop_id,
            method: METHOD,
            success: function(resp){
                grid.getStore().load();
                alert('successfully deleted');
            }
        });
    },

    addNewObject: function(ths){
        var isNew = global.getCU();
        var url;
        if(isNew == 'update'){
            url = '/Entre/resources/api/object/update/' + global.getTmp();
        } else {
            url = '/Entre/resources/api/object/create/';
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
                    win.close();
                    alert('Success');
                    me.getObjectGrid().getStore().load();
                },
                failure: function(form, action) {
                    alert('Failed');
                }
            });
        }
    },

    refreshGrid: function(ths){
        ths.getStore().load();
    }

});
