;(function(exports) {

    Parse.Router = Parse.Router.extend({
        
        homeView_loadHome: function() {
            this.navView.render();
            window.scrollTo(0,0)
            this.homeView.render();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.footerView.render();
            
            var changeCarouselImage = function(){ $('.carousel .right').trigger('click') }

                _.delay( function(){changeCarouselImage()},5000)         
        },
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'landing-page',
        el: '.wrapper',
        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.style-link":"triggerStylePageHash",
            "click a.cat-link": "triggerCatListingsHash",
            "click a.shop-categories-btn": "triggerCategoriesPageHash",
            "click .consignment-form-btn": "triggerConsignmentFormHash"
        },

        triggerProductPageHash: function(evt) {
            evt.preventDefault();
            console.log('event hurrrd')
            window.location.hash = "/products"
        },

        triggerCatListingsHash: function(evt) {
            evt.preventDefault();
            console.log(evt.target)
            
            var categoryName = $(evt.target).closest('a').attr('data-category');
            
            window.location.hash = "/products/category/" + categoryName;
        },

        triggerCategoriesPageHash: function(evt){
            evt.preventDefault();
            window.location.hash = "/products/categories"
        },

        triggerStylePageHash: function(evt){
            evt.preventDefault();
            var styleName = $(evt.target).closest('a').attr('data-byStyle');
            console.log(styleName);
            window.location.hash = "/products/style/"+styleName;
        },

        triggerConsignmentFormHash: function(evt) {
            evt.preventDefault();
            console.log('consignment event hurrd')
            window.location.hash = "/consignment-form"
        }
    })
    
    exports.Parse.Router = Parse.Router
    exports.Parse.HomeView = Parse.HomeView


})(typeof module === "object" ? module.exports : window);

