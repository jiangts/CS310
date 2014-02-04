Ext.define('Entre.view.ManageObject', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer'
    ],
    
    xtype: 'manage-object-view',

    items:[{
        title: 'Manage Objects',
        xtype: 'grid',
        width: 800,
        height: 300,
        store: 'Objects',
        columns: [
            { text: 'Name', dataIndex: 'name', flex: 2 },
            { text: 'Property Name',  dataIndex: 'propertyId', flex: 1 },
            { text: 'Owner', dataIndex: 'ownerfname', flex: 1,
                renderer: function(value, metaData, rec){
                    return rec.data.ownerlname + ', ' + rec.data.ownerfname;
                }
            },
            { text: 'Type',  dataIndex: 'objectType' }
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
