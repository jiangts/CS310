Ext.define('Entre.model.HistoryTemp', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'setTemp', type:'float' },
        { name: 'currentTemp', type:'float' },
        { name: 'date', mapping:'timestamp', type: 'date' },
        { name: 'name', mapping:'objectId > name' },
        { name: 'property_name', mapping:'objectId > propertyId > name' }
    ]
});
