Ext.define('Entre.model.Thermostat', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id'},
        {name: 'currentTemp'},
        {name: 'setTemp'}
        //{name: 'name', mapping: 'objectId > name' },
        //{name: 'type', mapping: 'objectId > type' }
    ]

});
