# ./controller

This folder contains the controllers

# ./model

This folder contains the models

# ./view

This folder contains the views

# ./store

This folder contains the stores


Standards:
mkdir config
vim Runtime.js
Ext.define('MyApp.config.Runtime',{
    singleton : true,
    config : {
        myLastCustomer : 0   // initialize to 0
    },
    constructor : function(config){
        this.initConfig(config);
    }
});

Ext.application({
    name : 'MyApp',
    requires : ['MyApp.config.Runtime'],
   ...
});


Split up controllers by functionality
Split up views by functionality (think object oriented)
