Ext.define('Entre.view.Header', {
    extend: 'Ext.container.Container',
    
    xtype: 'app-header',
    cls: 'app-header',

    layout: {
        type: 'hbox',
        //how to pack things together horizontally
        //pack: 'start'
        //align to the middle vertically
        align: 'middle'
    },

    items: [{
        xtype: 'component',
        html: 'Homeostat — Manage Your Property',
        cls: 'app-header-title',
        flex:1,
        margins: '0 0 0 15'
    },{
        xtype: 'button',
        text: 'Allan Jiang',
        margins: '0 15 0 0',
        menu: {
            showSeparator: false,
            items:[
                {text: 'User Settings'},
                {text: 'Log Out'}
            ]
        }
    }]

});
