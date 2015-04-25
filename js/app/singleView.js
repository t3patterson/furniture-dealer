;(function(exports) {

    Parse.Router = Parse.Router.extend({
       singleView_loadSingleListing: function(mrId) {
            var self = this
            mrId = parseInt(mrId)
            console.log('single-listing routed');
            this.pageLayout_checkNavBar();
            //test to see if the collection exists
            if (!this.multiListingView.collection) {
                //if collection doesn't exist...
                console.log('no collection in multiListingView')
                    //make a new parse query object
                var pQuery = new Parse.Query(Parse.FurnitureItem)
                    //...set query as equal to the MR_id
                pQuery.equalTo('MR_id', mrId)
                    //...then make the query 
                pQuery.find().then(function(returnModel) {
                    //put the returned-model on the singleListingView
                    // & render the view w/ the models
                    self.singleListingView.model = returnModel[0];
                    window.scrollTo(0,0)
                    self.singleListingView.render()

                    self.singleListingView.trigger('rendered')
                    console.log("'rendered' triggered")

                    //render footer
                    self.pageLayout_insertBreadCrumb();
                    self.pageLayout_clearPagination();
                    self.paginationView.render();
                    self.pageLayout_checkFooter();

                })
            } else {
                console.log('collection found in multiListingView')
                var listingsGroup = this.multiListingView.collection;
                var clickedModel = listingsGroup.filter(function(model) {
                        return model.get('MR_id') === mrId
                    })
                    //Handle the data
                    //Render on Page
                console.log(clickedModel[0])
                this.singleListingView.model = clickedModel[0]
                window.scrollTo(0,0)
                this.singleListingView.render();
                
                this.singleListingView.trigger('rendered');
                console.log("'rendered' triggered");
                this.pageLayout_insertBreadCrumb();
                this.pageLayout_clearPagination(); 
                this.pageLayout_checkFooter();


            }
        }
    })


    Parse.SingleListingView = Parse.TemplateView.extend({
        view: 'single-listing',
        el: '.wrapper',
        events: {
            'click .cart-link': "triggerShoppingCartHash",
            'click .keep-shopping': "triggerHomeHash",
            'click .add-item-btn': "addItemHandler",
            'click .remove-item-btn': 'removeItemHandler',
        },

        triggerShoppingCartHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/shopping-cart"
        },

        triggerHomeHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/"
        },

        addItemHandler: function(evt) {
            //show disabled button
            evt.preventDefault();
            console.log(this.cart)
            var thisListingMR_id = (this.model.get('mr_ID'))

            //DataManagement : on session storage
            sessionStorage.setItem('MR-item-ID', this.model.get('MR_id'));

            this.trigger('addToCart');


            //UserInterface : disable button
            document.querySelector('.add-item-btn').setAttribute('disabled', true);
            $('.remove-item-btn').fadeIn();
            $('.add-item-btn').addClass('btn-warning').removeClass('btn-success')
            $('.cart-status-notification').removeClass('bg-warning').addClass('bg-success').fadeIn(1000).text("This Item Is Now In Your Cart")

        },

        removeItemHandler: function(evt) {
            evt.preventDefault();
            sessionStorage.setItem('MR-item-ID', this.model.get('MR_id'));

            document.querySelector('.add-item-btn');
            $('.add-item-btn').removeAttr('disabled').removeAttr('disabled').removeClass('btn-warning').addClass('btn-success')
            $('.cart-status-notification').text("This Item Is No Longer In Your Cart").addClass('bg-warning').fadeOut(2000)
            $('.remove-item-btn').fadeOut('');
            this.trigger('itemRemoved')


        },

        initialize: function() {
            var self = this
            this.on('rendered', this.respondToRendered.bind(this))
        },

        respondToRendered: function(evt) {
            var self = this
            var cartTest = this.cart && this.cart.length + "item in singleListingView.cart" || 'no cart on singleListingView'
            console.log("'rendered' heard by singleListingView")
            console.log(cartTest)
            if (this.cart) {
                var filteredModel = this.cart.models.filter(function(cartModel) {
                    return cartModel.get('MR_id') === self.model.get('MR_id')
                })
                console.log("is the filtered model: " + this.model.get('item') + "' in the cart?")
                console.log(filteredModel)
                if (filteredModel.length > 0) {
                    document.querySelector('.add-item-btn').setAttribute('disabled', true);
                    $('.remove-item-btn').show();
                    $('.add-item-btn').removeClass('btn-success').addClass('btn-warning')
                    $('.cart-status-notification').text("This Item Is Already In Your Cart").addClass('bg-success')
                }
            }
        },

    })
    
    exports.Parse.Router = Parse.Router
    exports.Parse.SingleListingView = Parse.SingleListingView


})(typeof module === "object" ? module.exports : window);

