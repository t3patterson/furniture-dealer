;(function(exports) {
    "use strict";

    //UNRESOLVED ISSUES: 
        
        // * Ensure customer-facing site is not showing sold inventory (pQuery.notEqualTo('inventoryStatus','0'))
        // 
        // * Updating Parse database with MR14403 - MR14425 
        // 
        // * Editing and modifying inventory data
        // 
        // * finding the cause for 'dead' links for single listings
        //  ex: MR13283 , MR12283
        // 
        //  * Employee Search functionality for Editing-Inventory
        // 
        // * refactor codebase
        // 
        // * Payment system in place - ALEX
    
    //Utility Functions
    
    Parse.PageRouter = Parse.Router.extend({
        initialize: function() {
            var self = this;


            console.log('routing initialized');

            //Collections 
            this.shoppingCart = new Parse.FurnitureGroup();
            

            //----------------------
            //Application Views
            //----------------------
            

            //adminViews.js
            this.adminLoginView = new Parse.AdminLoginView();
            this.adminDashboardView = new Parse.AdminDashboardView();
            
            //cartView.js
            this.cartView = new Parse.ShoppingCartView();
            
            //categorysView.js
            this.categoriesView = new Parse.CategoriesView()

            //employeeViews.js
            this.newItemFormView = new Parse.EmployeeEnterNewItemFormView();
            this.searchExistingItemView = new Parse.EmployeeSearchExistingItemView();
            this.editItemView = new Parse.EmployeeEditExistingItemView()
            this.reorganizeImagesView = new Parse.EmployeeReorganizeImagesView();
            this.employeeLoginView = new Parse.EmployeeLoginView();

            //homeView.js
            this.homeView = new Parse.HomeView();

            //multiview.js
            this.multiListingView = new Parse.MultiListingView(); //this.collection = anArray
            
            //miscViews.js
            this.aboutView = new Parse.AboutView()
            this.consignView = new Parse.ConsignView()
            this.finalizeOrderView = new Parse.FinalizeOrderView({collection: this.shoppingCart})
            this.cancelOrderView = new Parse.CancelOrderView();
            this.thankCustomerView = new Parse.ThanksView();
            
            //pageLayout.js
            this.navView = new Parse.NavView()
            this.breadCrumbView = new Parse.BreadCrumbView();
            this.paginationView = new Parse.PaginationView()
            this.paginationViewBottom = new Parse.PaginationViewBottom()
            this.footerView = new Parse.FooterView();
            
           
            //singleView.js
            this.singleListingView = new Parse.SingleListingView({
                cart: this.shoppingCart
            });
    
            

        //-------------------
        //Application Event Listeners/Handlers
        //-------------------
            

            //------------------
            // 1) Pagination (PaginationView | BreadcrumbView | Procd)
            // -----------------
            
           

            this.paginationView.on(('showNext20'),this.events_pagination_showNext20.bind(this))
            this.paginationViewBottom.on(('showNext20'),this.events_pagination_showNext20.bind(this))
            
            this.paginationView.on(('showPrev20'), this.events_pagination_showPrev20.bind(this))
            this.paginationViewBottom.on(('showPrev20'),this.events_pagination_showPrev20.bind(this))

            this.paginationView.on(('showPageX'),this.events_pagination_showPageX.bind(this))
            this.paginationViewBottom.on(('showPageX'),this.events_pagination_showPageX.bind(this))

            // --------------------------------
            // 2) Shopping Cart & SingleListing 
            // ----------------------------------
            
            this.singleListingView.on('addToCart', this.events_cart_addToCartHandler.bind(this))

            this.singleListingView.on('itemRemoved', this.events_cart_removeFromCartHandler.bind(this))
            this.cartView.on('itemRemoved', this.events_cart_removeFromCartHandler.bind(this))
            
            Parse.history.start();
        },

        //Events - Handlers

        events_pagination_showNext20 : function (){
                var self = this
                var pQuery = self.currentQueryParams

                this.paginationView.paginationOptions.currentPage = Math.min(++self.paginationView.paginationOptions.currentPage, self.paginationView.paginationOptions.totalPages)


                pQuery.skip(20*(this.paginationView.paginationOptions.currentPage-1));

                pQuery.find().then(function(dataArray){
                    
                    var bcOptions = self.breadCrumbView.bcOptions
                    var pagOptions = self.paginationView.paginationOptions
                    
                    self.pageLayout_insertBreadCrumb(bcOptions)
                    self.pageLayout_insertPagination(pagOptions)
                    self.multiListingView.collection = dataArray;

                    window.scrollTo(0,0)
                    self.multiListingView.render()
                })
            },


        events_pagination_showPrev20: function(){
                var self = this;
                var pQuery = self.currentQueryParams

                this.paginationView.paginationOptions.currentPage--


                if(this.paginationView.paginationOptions.currentPage<1){
                    this.paginationView.paginationOptions.currentPage=1;
                }
                

                pQuery.skip(20*(self.paginationView.paginationOptions.currentPage-1));

                pQuery.find().then(function(dataArray){
                    self.paginationView.paginationOptions
                    
                    var bcOptions = self.breadCrumbView.bcOptions
                    var pagOptions = self.paginationView.paginationOptions
                    
                    self.pageLayout_insertBreadCrumb(bcOptions)
                    self.pageLayout_insertPagination(pagOptions)
                    self.multiListingView.collection = dataArray;

                    window.scrollTo(0,0)
                    self.multiListingView.render()
                })
            },

        events_pagination_showPageX: function(){
            var self = this
            var pQuery = self.currentQueryParams

            var pageNumber = parseInt($("a[data-event='page'").text())
            
            this.paginationView.paginationOptions.currentPage = pageNumber

            pQuery.skip(20*(self.paginationView.paginationOptions.currentPage-1));

            pQuery.find().then(function(dataArray){
                self.paginationView.paginationOptions
                
                var bcOptions = self.breadCrumbView.bcOptions
                var pagOptions = self.paginationView.paginationOptions
                
                self.pageLayout_insertBreadCrumb(bcOptions)
                self.pageLayout_insertPagination(pagOptions)
                self.multiListingView.collection = dataArray;

                window.scrollTo(0,0)
                self.multiListingView.render()
            })
            
        },

        //Handling the view-logic and 
        //collection-logic for adding items to the shopping cart
        events_cart_addToCartHandler: function() {
            var self = this
            //Get the MR-ID on Session Storage
            var MRidOnSS = parseInt(sessionStorage.getItem('MR-item-ID'));
            console.log(MRidOnSS)

            //Filter the model from the browsedItems array
            console.log(this.shoppingCart)


            if (!this.multiListingView.collection) {
                console.log('collection not defined');
                var pQuery = new Parse.Query(Parse.FurnitureItem);
                pQuery.equalTo('MR_id', MRidOnSS)
                
                pQuery.find().then(function(result) {
                    console.log(result)
                    self.shoppingCart.add(result);
                    self.cartView.collection = self.shoppingCart;
                    self.singleListingView.cart = self.shoppingCart;
                })
            } else {
                var theCollection = this.multiListingView.collection;
                var theListing = theCollection.filter(function(model) {
                    return model.get('MR_id') === MRidOnSS
                })
                console.log(theListing)
                var listingOnCartTest = (this.shoppingCart.get(theListing[0].id))

                if (!listingOnCartTest) {
                    console.log('the listing now added')
                    this.shoppingCart.add(theListing);
                    this.cartView.collection = this.shoppingCart;
                    this.singleListingView.cart = this.shoppingCart;
                }
            }

                sessionStorage.clear()
        },

        events_cart_removeFromCartHandler: function() {
            console.log('item removed heard by router')
            console.log(MRidOnSS)
            var MRidOnSS = parseInt (sessionStorage.getItem('MR-item-ID'));
            var modelRemoved = this.shoppingCart.models.filter(function(model) {
                return model.get('MR_id') === MRidOnSS;
            })

            console.log(modelRemoved)
            this.shoppingCart.remove(modelRemoved[0]);
            console.log(this.shoppingCart)

            this.cartView.collection = this.shoppingCart
        },

        //Routes


        routes: {
            'employee/*/enter-new-item': 'employeeView_loadEnterNewItemForm',
            'employee/*/edit-item/:mrId': 'employeeView_loadEditExistingItemForm',
            'employee/*/search-item': 'employeeView_loadSearchItem',
            'employee/login': 'employeeView_loadEmployeeLogin',
            'employee/*/fix-images':'employeeView_loadReorganizeImgs',

            'admin/dashboard': 'adminView_loadAdminDashboard',
            'admin/login': 'adminView_loadAdminLogin',

            'about-us': 'miscViews_loadAboutPg',
            'finalize-order': 'miscViews_loadFinalizeOrder',
            'consignment-form': 'miscViews_loadConsignment',
            'thankyou': 'miscViews_loadThankCustomer',
            'cancel-order':'miscViews_loadCancelOrder',

            'shopping-cart': 'cartView_loadShoppingCart',

            'products/categories': 'categoriesView_loadCategoriesPage',
            'products/*/listing/:mrId': 'singleView_loadSingleListing',

            'products/*/search-results/:search': 'multiView_loadSearchResults',
            'products/*/category/:type': 'multiView_loadListingsByCategory',
            'products/*/style/:styleName': 'multiView_loadListingsByStyle',
            'products': 'multiView_loadAllProductsPg',
            
            '*path': 'homeView_loadHome'
        },           
    })

    //*****************
    // Models & Collections
    //****************
    //
    



    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);
