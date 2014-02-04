Ext.define('Entre.model.Object', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'propertyId', mapping: 'propertyId > name' },
        {name: 'ownerfname', mapping: 'ownerId > fname' },
        {name: 'ownerlname', mapping: 'ownerId > lname' },
        {name: 'objectType'}
    ]

});
