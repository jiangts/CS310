Ext.define('Entre.store.Persons', {
    extend: 'Ext.data.Store',
    storeId: 'person',
    model: 'Entre.model.Person',
    proxy : {
        type : 'ajax',
        url: '/Entre/resources/person/' + Entre.cfg.Runtime.getToken(),
        //must use extraParams. wasted 2 hours of time...
        //extraParams: {
        //    user_id: Runtime.cfg.Runtime.getToken()
        //},
        reader : {
            type : 'xml',
            record: 'person'
        }
    },
    autoLoad: true
});
