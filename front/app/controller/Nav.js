Ext.define('Entre.controller.Nav', {
    extend: 'Ext.app.Controller',
    requires: [
        'Entre.view.Property',
        'Entre.view.Dashboard',
        'Entre.view.ManageProperty',
        'Entre.view.ManageObject',
        'Entre.view.UserSettings'
    ],

    refs: [{
        ref: 'navtree',
        selector: 'app-nav'
    },{
        ref: 'maintabs',
        selector: 'app-main > tabpanel'
    }],

    init: function() {
        this.control({
            'app-nav': {
                itemclick: this.addTab
            },
            'app-main > tabpanel': {
                tabchange: this.treeTabSync
            }
        });
    },

    addTab: function(ths, rec, item) {
        if(!rec || rec.data.leaf == true){
            //if we are calling the function without clicking on a treenode
            //ex, it is through clicking on a menu
            if(!rec){
                var title = ths.text;
            } else {
                //tree node title
                var title = rec.data.text;
            }
            //get tabpanel
            var tabs = this.getMaintabs();

            //get names of all open tabs
            var tabnames = [];
            for(idx in tabs.items.items){
                tabnames.push(tabs.items.items[idx].title);
            }

            var index = tabnames.indexOf(title);
            //open new tab if not already open
            if(index == -1) {
                var newtab = this.chooseTab(title);
                Entre.cfg.Runtime.setTabNu(tabs.items.length);
                var tab = tabs.add({
                    title: title,
                    xtype: newtab,
                    closable: true
                });
                tabs.setActiveTab(tab);
            } else {
                tabs.setActiveTab(index);
            }
        }
    },

    treeTabSync: function(tabPanel, newCard, oldCard) {
        var title = newCard.title;
        var openTreeLeaves = [];
        var navtree = this.getNavtree().getSelectionModel();
        for(idx in navtree.store.data.items){
            openTreeLeaves.push(navtree.store.data.items[idx].data.text);
        }

        var exist = openTreeLeaves.indexOf(title);
        if(exist != -1){
            navtree.select(exist);
        } else {
            navtree.deselectAll();
        }
    },

    chooseTab: function(title){
        switch(title){
            case 'User Settings':
                return 'user-settings-view';
                break;
            case 'Register Thermostat':
                return 'register-thermo-view';
                break;
            case 'Dashboard':
                return 'dashboard-view';
                break;
            case 'Manage Properties':
                return 'manage-property-view';
                break;
            case 'Manage Objects':
                return 'manage-object-view';
                break;
            default:
                return 'property-view';
        }
    },

    refreshTreeStore: function(){
        this.getNavtree().store.setRootNode(global.getNavTreeData());
        //this.getNavtree().store.setRootNode(global.getLoadNavTree()());
    }

});
