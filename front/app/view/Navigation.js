Ext.define('Entre.view.Navigation', {
    extend: 'Ext.tree.Panel',
    requires:[
        'Ext.tree.Panel',
        'Entre.store.NavTree'
    ],
    
    xtype: 'app-nav',
    cls: 'no-icon',

    title: 'Navigation Menu',

    rootVisible: false,
    useArrows: true,
    store: Ext.create('Entre.store.NavTree') //Ext.data.StoreManager.lookup('nav-tree-store')  // ;'NavTree' //

});
