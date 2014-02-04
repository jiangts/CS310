Ext.define('Entre.store.Properties', {
    extend: 'Ext.data.Store',
    storeId: 'properties',
    model: 'Entre.model.Property',
    proxy : {
        type : 'ajax',
        url: '/Entre/resources/property/',
        //must use extraParams. wasted 2 hours of time...
        //extraParams: {
        //    user_id: Runtime.cfg.Runtime.getToken()
        //},
        reader : {
            type : 'xml',
            record: 'property'
        }
    },
    autoLoad: true
});
