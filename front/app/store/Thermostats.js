Ext.define('Entre.store.Thermostats', {
    extend: 'Ext.data.Store',
    storeId: 'thermostats',
    model: 'Entre.model.Thermostat',
    proxy : {
        type : 'ajax',
        url: '/Entre/resources/thermostat/',
        //must use extraParams. wasted 2 hours of time...
        //extraParams: {
        //    user_id: Runtime.cfg.Runtime.getToken()
        //},
        reader : {
            type : 'xml',
            record: 'thermostat',
            root: 'thermostats'
        }
    },
    autoLoad: true
});
