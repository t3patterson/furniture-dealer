;(function(exports){

    "use strict";

    Parse.PageRouter = Parse.Router.extend({
        initialize: function(){
            console.log('routing started');
            this.navView= new Parse.NavView()
            this.homeView = new Parse.HomeView();
            this.productsListView = new Parse.ProductPageView();
            this.singleListingView = new Parse.SingleListingView()
            Parse.history.start()
        },

        routes:{
            'cart' : 'loadShoppingCart',
            'product/:id':'loadSingleListing',
            'product': 'loadProductPg',
            '*default': 'home'
        },

        home: function(){
            this.navView.render();
            this.homeView.render();
        },

        checkNavCheckFooter:function(){
            var navEl = document.querySelector('nav');
             navEl.innerHTML.indexOf('div') === -1 ? this.navView.render(): console.log('falsy');
            //make logic for checking footer
        },

        loadProductPg: function(){
            console.log('product-page loaded')
            this.checkNavCheckFooter()
            this.productsListView.render();
        },

        loadSingleListing: function(id){
            console.log('single-listing loaded');
            this.singleListingView.render()
            document.querySelector('.test').innerHTML = (id)
        }
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'homepage',
        el: '.wrapper',
        events: {
            "click a.browse-listings-btn": "goToProductPage"
        },

        goToProductPage: function(evt){
            evt.preventDefault();
            console.log('event hurrrd')
            window.location.hash="/product"
        }

        })

    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',
    })

    Parse.ProductPageView = Parse.TemplateView.extend({
        view: 'product-page',
        el: '.wrapper',
        events:{
            'click .more-info': 'goToSinglePage'
        },

        goToSinglePage: function(evt){
            evt.preventDefault();
            console.log(evt.target)
            var productId = $(evt.target).closest('.img-listing-container').attr('data-productID')
            window.location.hash="/product/"+productId;

        }
    })

    Parse.SingleListingView = Parse.TemplateView.extend({
        view: 'single-listing',
        el: '.wrapper'
    })


    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);