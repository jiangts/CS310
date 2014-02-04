Ext.define('Entre.controller.Dashboard', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'chartPanel',
        selector: 'dashboard-view > panel'
    }],

    init: function() {
        this.control({
            'dashboard-view > panel > chart': {
                //beforerender: this.changeTitle
                afterrender: this.changeTitle
            }
        });
    },


    changeTitle: function(me){
        //var me = this.getChartPanel(); console.log('hi');
        var panel = me.up('panel');
        var store = me.getStore();
        store.load({
            callback: function(){
                panel.setTitle(panel.title + ' - ' + store.data.items[0].data.property_name);
            }
        });
    }
    //changeTitle: function(me){
    //    //var me = this.getChartPanel(); console.log('hi');
    //    var store = me.down('chart').getStore();
    //    debug = store;
    //    console.log(debug);
    //    console.log(debug.data.items[0].data.property_name)
    //    me.setTitle(me.title + ' - ' + store.data.items[0].data.property_name);
    //}

});
