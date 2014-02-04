Ext.define('Entre.cfg.Runtime',{
    singleton : true,
    config : {
        token : null,
        tabNu: 1,
        personObj: null,
        navTreeData: null,
        cU: null,
        tmp: null,
        thermostatObj: null,//this is trash programming
        constructor : function(config){
            this.initConfig(config);
        }
    },

    loadNavTree: function(){
        var cback;
        Ext.Ajax.request({
            //TODO fix to make it based on owner
            url : '/Entre/resources/property',
            
            method: 'GET',
            
            success: function ( result, request ) {
                var properties = result.responseXML.getElementsByTagName('property');
                var out = [];
                for(var idx=0; idx < properties.length; idx++){
                    var property = new Object();
                    property.text = properties[idx].getElementsByTagName('name')[0].textContent;
                    property.leaf = true;
                    property.type = 'property';
                    var fields = properties[idx].children;
                    for(index in fields){
                        if(fields[index].nodeName == 'id'){
                            property.id = fields[index].textContent;
                        }
                    }
                    out.push(property);
                }
                cback = global.getNavTreeData()
                //choosing the proper idx, so when the tree length changes we don't die
                for(idx in cback.children){
                    if(cback.children[idx].text == 'My Properties'){
                        cback.children[idx].children = out;
                    }
                }
                return cback;
            }
        });
    },

    downloadChart: function(chart){
        Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
            if(choice == 'yes'){
                chart.save({
                    type: 'image/png'
                });
            }
        });
    }


},
function(){
    //handle all cookie stuff here
    global = Entre.cfg.Runtime;
    Entre.cfg.Runtime.setToken(1);
});
