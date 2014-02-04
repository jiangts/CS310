Ext.define('Entre.controller.Settings', {
    extend: 'Ext.app.Controller',

    /*
    refs: [{
        ref: 'navtree',
        selector: 'app-nav'
    }],
    */

    init: function() {
        this.control({
            'user-settings-view > form': {
                beforerender: this.loadPersonForm
            }
        });
    },

    loadPersonForm: function(form) {
        var form = form.getForm();
        form.loadRecord(Entre.cfg.Runtime.getPersonObj());
    }
});
