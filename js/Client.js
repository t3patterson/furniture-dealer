;(function(exports){

    "use strict";

    var PageRouter = Parse.Router.extend({
        initialize: function(){
            console.log('routing started');
            Backbone.history.start()
        },

        routes:{
            '*default': 'home'
        },

        home: function(){
            console.log('great')
        }
    })

    exports.PageRouter = PageRouter;

})(typeof module === "object" ? module.exports : window);