Ext.define('Entre.view.Property', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.layout.container.Form',
        'Ext.form.field.Display',
        'Ext.form.field.Number',
        'Ext.form.Panel'
    ],
    
    xtype: 'property-view',

    //html: 'Tab #' + (Entre.cfg.Runtime.getTabNu() + 1),

    items: [{
        title: 'Property Information',
        xtype: 'form',
        bodyPadding: 5,
        width: 400,

        itemId: 'pt',
//        url: '/entre/resources/property/update/',

        // Fields will be arranged vertically, stretched to full width
        layout: 'form',
        defaults: {
            anchor: '100%'
        },

        defaultType: 'textfield',
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Name',
            readOnly: true,
            name: 'name'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Type',
            readOnly: true,
            name: 'objectType'
        },{
            fieldLabel: 'Set Temperature',
            xtype: 'numberfield',
            labelWidth: '200',
            name: 'setTemp'
        },{
            fieldLabel: 'Current Temperature',
            xtype: 'displayfield',
            readOnly: true,
            labelWidth: '200',
            name: 'currentTemp'
        },{
            fieldLabel: 'Outdoor Temperature',
            xtype: 'displayfield',
            readOnly: true,
            labelWidth: '200',
            name: 'outdoorTemp'
        }]
    }],

    bbar: {
        xtype: 'button',
        text: 'Send Set Temperature',
        itemId: 'submit'
    }
});
