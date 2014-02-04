Ext.define('Entre.view.UserSettings', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.grid.Panel',
        'Ext.layout.container.Form',
        'Ext.form.Panel'
    ],
    xtype: 'user-settings-view',

    items: [{
        title: 'Edit your personal information',
        xtype: 'form',
        bodyPadding: 5,
        width: 400,

        url: '/entre/resources/person/update/',

        // Fields will be arranged vertically, stretched to full width
        layout: 'form',
        defaults: {
            anchor: '100%'
        },

        defaultType: 'textfield',
        //fieldDefaults:{ labelAlign:'right', labelWidth:200},
        //columnWidth: 100,
        //labelWidth: 100,
        items: [{
            fieldLabel: 'First Name',
            name: 'fname',
            allowBlank: false
        },{
            fieldLabel: 'Middle Name',
            name: 'mname',
            allowBlank: false
        },{
            fieldLabel: 'Last Name',
            name: 'lname',
            allowBlank: false
        },{
            fieldLabel: 'Date of Birth',
            name: 'dob',
            allowBlank: false
        },{
            fieldLabel: 'Email',
            name: 'email',
            allowBlank: false
        },{
            fieldLabel: 'Gender',
            name: 'gender',
            allowBlank: false
        },{
            fieldLabel: 'Phone',
            name: 'phone',
            allowBlank: false
        },{
            fieldLabel: 'Country',
            name: 'country',
            allowBlank: false
        }],

        // Reset and Submit buttons
        buttons: [{
            //text: 'Reset',
            //handler: function() {
            //    this.up('form').getForm().reset();
            //}
            text: 'Revert',
            handler: function() {
                this.up('form').getForm().loadRecord(Entre.cfg.Runtime.getPersonObj())
            }
        }, {
            text: 'Update',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                           alert('Success\n' + action.result.msg);
                        },
                        failure: function(form, action) {
                           alert('Failed\n' + action.result.msg);
                        }
                    });
                }
            }
        }]
    }]
});
