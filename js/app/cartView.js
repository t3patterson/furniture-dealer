;(function(exports) {

    Parse.Router = Parse.Router.extend({
        cartView_loadShoppingCart: function() {
            window.scrollTo(0,0)
            var self = this
            this.pageLayout_checkNavBar()
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            self.cartView.render();
            self.pageLayout_checkFooter();
        },  
     })
    
    Parse.ShoppingCartView = Parse.TemplateView.extend({
        view: 'shopping-cart',
        el: '.wrapper',
        events: {
            "click a.finalize-order-btn": "triggerFinalizeOrderHash",
            "click .tcell-remove-item i": "removeItemFromCart"
        },

        triggerFinalizeOrderHash: function(evt) {
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/finalize-order"
        },
        removeItemFromCart: function(evt) {
            evt.preventDefault();
            console.log('remove-item-cell-clicked')
            var tr = $(evt.target).closest('tr'),
                removedListingMR_ID = tr.attr('data-MRid')
            tr.remove()

            console.log(removedListingMR_ID)

            sessionStorage.setItem('MR-item-ID', removedListingMR_ID);
            this.trigger('itemRemoved');
        }

    })


    exports.Parse.Router = Parse.Router
    exports.Parse.ShoppingCartView = Parse.ShoppingCartView

})(typeof module === "object" ? module.exports : window);

