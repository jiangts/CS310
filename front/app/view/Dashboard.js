//var store = Ext.create('Ext.data.Store', {
//    model: 'Entre.model.WeatherPoint',
//    data: [
//        { temperature: 58, date: new Date(2011, 1, 1, 12) },
//        { temperature: 63, date: new Date(2011, 1, 1, 11) },
//        { temperature: 73, date: new Date(2011, 1, 1, 10) },
//        { temperature: 78, date: new Date(2011, 1, 1, 9) },
//        { temperature: 81, date: new Date(2011, 1, 1, 8) }
//    ]
//});

Ext.define('Entre.view.Dashboard', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.chart.*'
    ],
    
    xtype: 'dashboard-view',

    items: [{
        xtype: 'panel',
        width: 500,
        height: 500,
        title: 'Aggregate Power Usage Portfolio',
        layout: 'fit',
        tbar: [{
            text: 'Save Chart',
            handler: function(){ global.downloadChart(this.up('panel').down('chart')); }
        }/*, '-', 
            'Thermostat: ' + global.getThermostatObj() , '->',
            'Property: ' + global.getThermostatObj() */
        ],
        items: [{
            xtype: 'chart',
            width: 400,
            height: 600,
            style: 'background:#ffdead',
            animate: true,
            store: 'HistoryTemps', //store, 
            axes: [
                {
                    title: 'Temperature',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['setTemp', 'currentTemp'],
                    /*
                    minimum: 0,
                    maximum: 100
                    */
                },
                {
                    title: 'Time',
                    type: 'Time',
                    position: 'bottom',
                    fields: ['date'],
                    dateFormat: 'M d',
                    minimum: new Date((new Date())- 14*24*60*60*1000),
                    maximum: new Date()
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'date',
                    yField: 'currentTemp',
                    tips: {
                        trackMouse: true,
                        minWidth: 100,
                        minHeight: 50,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name'));
                            this.update(storeItem.get('currentTemp'));
                        }
                    }
                }
                /*,
                {
                    type: 'line',
                    xField: 'date',
                    yField: 'temperature'
                }*/
            ]
        }]
    }]

});
