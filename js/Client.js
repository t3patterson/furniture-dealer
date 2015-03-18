;(function(exports){

    "use strict";

    Parse.PageRouter = Parse.Router.extend({
        initialize: function(){
            console.log('routing started');
            this.navView= new Parse.NavView()
            this.homeView = new Parse.HomeView()
            this.productsListView = new Parse.ProductPageView()
            Parse.history.start()
        },

        routes:{
            'product': 'loadProductPg',
            '*default': 'home'
        },

        home: function(){
            this.navView.render();
            this.homeView.render();
        },

        loadProductPg: function(){
            console.log('product-page loaded')
            this.productsListView.render();
            var navEl = document.querySelector('nav');
            navEl.innerHTML.indexOf('div') === -1 ? this.navView.render(): console.log('falsy');
        }
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'homepage',
        el: '.wrapper',
        events: {
            "click a": "goToProductPage"
        },

        goToProductPage: function(evt){
            evt.preventDefault()
            console.log('event hurrrd')
            window.location.hash="/product"
        }

        })

    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav'
    })

    Parse.ProductPageView = Parse.TemplateView.extend({
        view: 'product-page',
        el: '.wrapper',
       
    })

    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);