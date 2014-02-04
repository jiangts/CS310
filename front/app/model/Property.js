Ext.define('Entre.model.Property', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id'},
        {name: 'city'},
        {name: 'country'},
        {name: 'name'},
        {name: 'state'},
        {name: 'streetName'}, //, mapping: 'userId.email'},
        {name: 'streetNu'},
        {name: 'streetSuffix'},
        {name: 'zip'}
    ]

});
