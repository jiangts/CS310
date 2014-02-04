Ext.define('Entre.view.PropertyWin', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Entre.controller.Nav'
    ],
    xtype: 'property-win',
    
    title: 'Property',
    height: 300,
    width: 400,
    layout: 'fit',
    items: {
        xtype: 'form',
        border: false,
        //url: '/Entre/resources/api/property/create',
        layout: 'form',
        defaults: {
            anchor: '100%'
        },
        
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Name', 
            name: 'name', 
            itemId: 'name',
            allowBlank: false
        },{ 
            fieldLabel: 'Number', 
            xtype: 'numberfield',
            name: 'streetNu',
            allowBlank: false
        },{ 
            fieldLabel: 'Street', 
            name: 'streetName',
            allowBlank: false
        },{ 
            fieldLabel: 'Suffix', 
            name: 'streetSuffix',
            allowBlank: false
        },{  
            fieldLabel: 'City',  
            name: 'city',
            allowBlank: false
        },{ 
            fieldLabel: 'State', 
            name: 'state',
            allowBlank: false
        },{ 
            fieldLabel: 'Zip', 
            name: 'zip',
            allowBlank: false
        },{ 
            fieldLabel: 'Country', 
            name: 'country', 
            allowBlank: false
        }],
        buttons: [{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, {
            text: 'Submit',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            itemId: 'submit'
        }]
    }
});
