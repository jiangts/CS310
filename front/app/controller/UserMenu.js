Ext.define('Entre.controller.UserMenu', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'menuBtn',
        selector: 'app-header > button'
    }],

    models: ['Person'],
    stores: ['Persons'],

    init: function() {
        this.control({
            'app-header > button > menu > menuitem': {
                click: this.addTab
            },
            'app-header > button': {
                beforerender: this.setupUser
            }
        });
    },

    addTab: function(item) {
        if(item.text == "User Settings"){
            this.getController('Nav').addTab(item);
        }
        if(item.text == "Log Out"){
            //close a window via javascript!!
            //window.open('','_self').close();
        }
    },

    setupUser: function(ths){
        this.getPersonsStore().load({
            url: '/Entre/resources/person/' + Entre.cfg.Runtime.getToken(),
            callback: function(records, operation, success){
                Entre.cfg.Runtime.setPersonObj(records[0]);
                name = records[0].data.fname + ' ' + records[0].data.lname;
                ths.setText(name);
            }
        });
    }
});
