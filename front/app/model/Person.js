Ext.define('Entre.model.Person', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'country'},
        {name: 'dob'},
        {name: 'email'},
        {name: 'fname'},
        {name: 'gender'}, //, mapping: 'userId.email'},
        {name: 'lname'},
        {name: 'mname'},
        {name: 'phone'},
        {name: 'userType'}
    ]

});
