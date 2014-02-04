Ext.define('Entre.view.ManageProperty', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer'
    ],
    
    xtype: 'manage-property-view',

    items:[{
        title: 'Manage Properties',
        xtype: 'grid',
        width: 800,
        height: 300,
        store: 'Properties',
        columns: [
            { text: 'Name', dataIndex: 'name', flex: 1 },
            { text: 'Address', dataIndex: 'streetNu', flex: 1,
                renderer: function(value, metaData, rec){
                    return rec.data.streetNu + ' ' + rec.data.streetName + ' ' + rec.data.streetSuffix;
                }
            },
            //{ text: 'Number', dataIndex: 'streetNu' },
            //{ text: 'Street', dataIndex: 'streetName' },
            //{ text: 'Suffix', dataIndex: 'streetSuffix' },
            { text: 'City',  dataIndex: 'city' },
            { text: 'State', dataIndex: 'state' },
            { text: 'Zip', dataIndex: 'zip' },
            { text: 'Country', dataIndex: 'country' }
        ],
        bbar: [{
            xtype: 'button',
            text: 'Refresh',
            handler: function(){
                this.up('grid').getStore().load();
            }
        },{
            xtype: 'tbspacer',
            flex: 1
        },{
            xtype: 'button',
            itemId: 'create',
            text: 'Add New'
        },{
            xtype: 'button',
            itemId: 'update',
            text: 'Update'
        },{
            xtype: 'button',
            itemId: 'delete',
            text: 'Delete'
        }]
    }]
});
