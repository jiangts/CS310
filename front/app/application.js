var debug;
Ext.define('Entre.Application', {
    name: 'Entre',

    extend: 'Ext.app.Application',

    requires: [
        'Entre.cfg.Runtime',
        'Ext.Ajax',
        'Ext.data.reader.Xml',
        'Ext.data.Store'
    ],

    models: [
        'WeatherPoint'
    ],

    views: [
    ],

    controllers: [
        'Nav',
        'UserMenu',
        'Settings',
        'Properties',
        'Objects',
        'Dashboard'
    ],

    stores: [
        'NavTree',
        'Persons',
        'Properties',
        'Objects',
        'Objects2',
        'Thermostats',
        'HistoryTemps'
    ]
});
