Ext.define('Entre.store.HistoryTemps', {
    extend: 'Ext.data.Store',
    storeId: 'person',
    model: 'Entre.model.HistoryTemp',
    proxy : {
        type : 'ajax',
        url: '/Entre/resources/thermostat_history',
        reader : {
            type : 'xml',
            root: 'thermostatHistories',
            record: 'thermostatHistory'
        }
    },
    autoLoad: true
});
