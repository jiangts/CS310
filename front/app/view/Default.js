Ext.define('Entre.view.Default', {
    extend: 'Ext.container.Container',
    
    xtype: 'default-view',

    html: 'Tab #' + (Entre.cfg.Runtime.getTabNu() + 1)

});
