Ext.define('Entre.view.ObjectWin', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox'
    ],
    xtype: 'object-win',
    
    title: 'Object',
    height: 300,
    width: 400,
    layout: 'fit',
    items: {
        xtype: 'form',
        border: false,
        //url: '/Entre/resources/api/object/create',
        layout: 'form',
        defaults: {
            anchor: '100%'
        },
        
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Name', 
            name: 'name', 
            allowBlank: false
        },{ 
            fieldLabel: 'Property',  
            name: 'propertyId',
            xtype: 'combobox',
            store: 'Properties',
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            typeAhead: true,
            allowBlank: false
        },{ 
            fieldLabel: 'Type',  
            name: 'objectType', 
            allowBlank: true
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
