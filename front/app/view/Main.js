Ext.define('Entre.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Entre.view.Header',
        'Entre.view.Dashboard',
        'Entre.view.Navigation'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'app-header',
        height: 60
    },{
        region: 'west',
        xtype: 'app-nav',
        split: true,
        maxWidth: 300,
        minWidth: 150,
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Dashboard',
            xtype: 'dashboard-view'
        }]
    }]
});
