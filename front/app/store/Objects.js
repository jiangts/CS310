Ext.define('Entre.store.Objects', {
    extend: 'Ext.data.Store',
    storeId: 'objects',
    model: 'Entre.model.Object',
    proxy : {
        type : 'ajax',
        url: '/Entre/resources/object/',
        //must use extraParams. wasted 2 hours of time...
        //extraParams: {
        //    user_id: Runtime.cfg.Runtime.getToken()
        //},
        reader : {
            type : 'xml',
            record: 'object1',
            root: 'object1s'
        }
    },
    autoLoad: true
});
