;(function(exports) {
    "use strict";


    //Utility Functions
    function numberCommaSeparated(num, spaceOption) {

        var num = num.toFixed()
        var digitLength = num.length

        var numArray = num.split('')
        var commaSeparated = []

        if (digitLength < 4) {
            return numArray.join('')
        }

        for (var i = 0; i < num.length; i++)
            if ((i + 1) % 3 === 0) {
                commaSeparated.unshift(numArray.pop())
                commaSeparated.unshift(',')
            } else {
                commaSeparated.unshift(numArray.pop())
            }
        var newnum = commaSeparated.join('')
        return newnum
    }



    function resetField(el) {
        el.wrap('<form>').parent('form').trigger('reset');
        el.unwrap();
    }

    Parse.PageRouter = Parse.Router.extend({
        initialize: function() {
            // -------------------------
            // Code for saving data to Parse **
            // ---------------------------
            // 
            // var dataToParse = dataArrayToUpload;
            // console.log(dataToParse)
            // dataToParse.forEach(function(item, index){
            //         var itemToUpload = new Parse.FurnitureItem(item);
            //         _.delay(function(){itemToUpload.save()},80);
            // })  

           
            var self = this
            console.log('routing initialized');

            //Collections 
            this.shoppingCart = new Parse.FurnitureGroup();


            //Set Up the Views
            this.navView = new Parse.NavView()
            this.homeView = new Parse.HomeView();
            this.footerView = new Parse.FooterView();
            this.productsListView = new Parse.ProductPageView(); //will take this.collection 
            this.singleListingView = new Parse.SingleListingView({
                cart: this.shoppingCart
            });
            this.aboutView = new Parse.AboutView()
            this.consignView = new Parse.ConsignView()
            this.cartView = new Parse.ShoppingCartView();
            this.finalizeOrderView = new Parse.FinalizeOrderView({
                collection: this.shoppingCart
            })
            this.thankCustomerView = new Parse.ThanksView();
            this.newItemFormView = new Parse.EnterNewItemFormView();
            this.adminLoginView = new Parse.AdminLoginView();
            // this.userLoginView = new Parse.UserLoginView();
            this.adminDashboardView = new Parse.AdminDashboardView();
            this.breadCrumbView = new Parse.BreadCrumbView();
            
            //Temporary-app-helper 
            this.reorganizeImagesView = new Parse.ReorganizeImagesView();


            //-------------------
            //Application Event Listeners/Handlers
            //-------------------
            this.singleListingView.on('addToCart', this.addToCartHandler.bind(this))

            this.singleListingView.on('itemRemoved', this.removeFromCartHandler.bind(this))
            this.cartView.on('itemRemoved', this.removeFromCartHandler.bind(this))

          

            Parse.history.start();
        },

        //Events - Handlers

        //Handling the view-logic and 
        //collection-logic for adding items to the shopping cart
        addToCartHandler: function() {
            var self = this
                //Get the MR-ID on Session Storage
            var MRidOnSS = parseInt(sessionStorage.getItem('MR-item-ID'));
            console.log(MRidOnSS)

            //Filter the model from the browsedItems array
            console.log(this.shoppingCart)


            if (!this.productsListView.collection) {
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
                var theCollection = this.productsListView.collection;
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

        removeFromCartHandler: function() {
            console.log('item removed heard by router')
            var MRidOnSS = sessionStorage.getItem('MR-item-ID');
            console.log(this.shoppingCart)
            var modelRemoved = this.shoppingCart.models.filter(function(model) {
                console.log(model)
                return model.get('MR_id') === MRidOnSS;
            })

            this.shoppingCart.remove(modelRemoved);
            this.cartView.collection = this.shoppingCart
            console.log(this.shoppingCart)
        },

        //Routes


        routes: {
            'employee/*/enter-new-item': 'loadEnterNewItemForm',
            'employee/*/edit-existing-item/:mrId': 'loadEditExistingItemForm',

            'employee/login': 'loadUserLogin',
            'admin/dashboard': 'loadAdminDashboard',
            'admin/login': 'loadAdminLogin',
            'finalize-order': 'loadFinalizeOrder',
            'consignment-form': 'loadConsignment',
            'thankyou': 'loadThankCustomer',
            'shopping-cart': 'loadShoppingCart',
            'products/*/categories/:type': 'loadCategoryListings',
            'products/*/listing/:mrId': 'loadSingleListing',
            'products/*/style/:styleName': 'loadStyleListings',
            'products': 'loadProductsPg',
            'about-us': 'loadAboutPg',

            //add-items
            'fix-images':'loadReorganizeImgs',
            
            '*path': 'loadHome'
        },

        loadReorganizeImgs: function(){
            this.reorganizeImagesView.collection = {
                imageArray: [],
                imageTnArray: []
            }

            this.reorganizeImagesView.render();
        },

        loadHome: function() {
            this.navView.render();
            window.scrollTo(0,0)
            this.homeView.render();
            this.clearBreadCrumb();
            this.footerView.render()
            console.log(this.homeView)
        },

        checkNav: function() {
            var navEl = document.querySelector('nav');

            if (navEl.innerHTML.indexOf('div') === -1) {
                this.navView.render()
            }

        },

        insertBreadCrumb: function(){
            var breadCrumbEl = document.querySelector('.my-breadcrumb');
              if (breadCrumbEl.innerHTML.indexOf('div') === -1) {
                this.breadCrumbView.render()
            }
        },

        checkFooter: function() {
            var footerEl = document.querySelector('footer');
            if (footerEl.innerHTML.indexOf('div') === -1) {
                this.footerView.render()
            }
        },

        clearBreadCrumb: function(){
            document.querySelector('.my-breadcrumb').innerHTML = ""
        },

        clearFooter: function() {
            document.querySelector('footer').innerHTML = ""
        },

        /**
         * [loadProductsPg description]
         * ---------------------------------
         * 1) makes a Parse-query for 30 items,
         * 2) query-result returns a collection
         * 3) set productsListView.collection as query-result
         * 3) render productsListView w/ collection
         */
        loadProductsPg: function() {
            var self = this
            console.log('product-page loaded')
            this.checkNav()
            //new ParseQuery with FurnitureItem-model
            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.descending('MR_id');
            pQuery.equalTo('inventoryStatus','1')
            pQuery.limit(20);
            //1) Make Query, 
            //2) Set the productsListView collection with returned results
            //3) Render the collection on the productsListView
            pQuery.find().then(function(parseReturn) {
                console.log(parseReturn)
                self.productsListView.collection = parseReturn
                window.scrollTo(0,0)
                self.productsListView.render();
                self.insertBreadCrumb();
                self.checkFooter();
            })
        },

        /**
         * [loadCategoryListings description]
         *     @param  {categoryType} string 
         * ----------------------------------
         * 1) Pass categoryType as a parameter
         * 2) Make parse query and make equalTo based on categoryType
         * 3) Query returns matched results as collection
         * 4) Render the collection
         */
        loadCategoryListings: function(catType) {
            var self = this
            console.log('category Page loaded');
            this.checkNav();

            var categoryLabelMap = {
                "rugs": "Rugs",
                "tables": "Tables",
                "desks": "Desks",
                "lighting": "Lighting",
                "case-goods": "Case Goods",
                "seating": "Seating"

            }

            var pQuery = new Parse.Query(Parse.FurnitureItem);
            

            pQuery.equalTo("categoryTreeByName", categoryLabelMap[catType]);
            pQuery.limit(20)

            pQuery.find().then(function(matched) {
                console.log(matched)
                self.productsListView.collection = matched
                self.checkFooter();
                window.scrollTo(0,0);
                self.productsListView.render(); //pass a collection;
                self.insertBreadCrumb();

            })

        },

        loadStyleListings: function(styleName){
            var self = this;

            this.checkNav();

            var styleLabelMap = {
                "mid-century": "Mid Century",
                "art-deco": "Art Deco",
                "scandinavian" : "Scandinavian",
                "traditional": "Traditional"
            }

            var styleCollection = new Parse.FurnitureGroup()
            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.equalTo('inventoryStatus','1');

            if (styleName === "mid-century"){
                pQuery.limit(400);
                var regexTest = false;
                } else {
                    pQuery.limit(60);
                    
                    pQuery.equalTo("categoryTreeByName",styleLabelMap[styleName])
                    var regexTest = true;
                }

            pQuery.find().then(function(data){
                data.forEach(function(listing){
                    console.log(listing)
                    if(listing.get('item') && (regexTest || listing.get('item').match(/mid century/gi))){
                        if(styleCollection.length<=20) styleCollection.add(listing)
                    }
                    window.scrollTo(0,0);

                    self.productsListView.collection = styleCollection
                    self.productsListView.render()
                    self.insertBreadCrumb();

                })
            })
           
        },


        loadSingleListing: function(mrId) {
            var self = this
            mrId = parseInt(mrId)
            console.log('single-listing routed');
            this.checkNav();
            //test to see if the collection exists
            if (!this.productsListView.collection) {
                //if collection doesn't exist...
                console.log('no collection in productsListView')
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
                        //put the model on browsedItems array
                    self.insertBreadCrumb();

                    //render footer
                    self.checkFooter();

                })
            } else {
                console.log('collection found in productsListView')
                var listingsGroup = this.productsListView.collection;
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
                this.insertBreadCrumb();
                this.checkFooter();


            }
        },

        loadShoppingCart: function() {
            var self = this
            this.checkNav()
            this.clearBreadCrumb();
            self.cartView.collection
            self.cartView.render();
            window.scrollTo(0,0)
            self.checkFooter();


        },

        loadFinalizeOrder: function() {
            console.log('finalizeOrder')
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.finalizeOrderView.render();

        },

        loadOrderConfirmation: function() {
            this.checkNav();
            this.clearBreadCrumb();
            this.checkFooter();
            this.orderConfView.render();
            window.scrollTo(0,0)


        },

        loadThankCustomer: function() {
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.thankCustomerView.render();


        },

        loadConsignment: function() {
            console.log('consignment-form loaded')
            this.checkNav();
            this.clearBreadCrumb();
            this.checkFooter();
            window.scrollTo(0,0)
            this.consignView.render();

        },

        loadEnterNewItemForm: function() {

            console.log
            var data = {
                categoryLabels: MRCategoryLabels,
                categoryMap: MRCategoryMap
            }
            this.newItemFormView.collection = data
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.newItemFormView.render()

        },

        loadEditExistingItemForm: function() {

          
        },



        loadAdminLogin: function() {
            console.log('admin login rendered')
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.adminLoginView.render();


        },


        loadAdminDashboard: function() {
            console.log('dashboard')
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.adminDashboardView.render();

        },

        loadUserLogin: function() {
            console.log('login????')
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0)
            this.userLoginView.render();
        },

        loadAboutPg: function() {
            this.checkNav();
            this.clearBreadCrumb();
            this.checkFooter();
            window.scrollTo(0,0)
            this.aboutView.render();
        }
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'landing-page',
        el: '.wrapper',
        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.style-link":"triggerStylePageHash",
            "click a.cat-link": "triggerCatPageHash",
            "click .consignment-form-btn": "triggerConsignmentFormHash"
        },



        triggerProductPageHash: function(evt) {
            evt.preventDefault();
            console.log('event hurrrd')
            window.location.hash = "/products"
        },

        triggerCatPageHash: function(evt) {
            evt.preventDefault();
            console.log(window.location.hash);
            console.log(evt.target)
            
            var categoryName = $(evt.target).closest('a').attr('data-category');
            
            window.location.hash = "/products/categories/" + categoryName;
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

    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',

        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.cart-link": "triggerShoppingCartHash",
            "click a.about-link": "triggerAboutHash",
            "click a.search-link": "handleSearchLink"
        },

        triggerProductPageHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/products"
        },
        triggerShoppingCartHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/shopping-cart"
        },
        triggerAboutHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/about-us"
        },

        handleSearchLink: function() {}
    })

    Parse.BreadCrumbView = Parse.TemplateView.extend({
        el: '.my-breadcrumb',
        view: 'nav-breadcrumb'
    })

    Parse.FooterView = Parse.TemplateView.extend({
        view: 'footer',
        el: 'footer'
    })

    Parse.ConsignView = Parse.TemplateView.extend({
        view: 'consignment-form',
        el: '.wrapper'

    })

    Parse.AboutView = Parse.TemplateView.extend({
        view: 'about-us',
        el: '.wrapper'
    })

    Parse.ProductPageView = Parse.TemplateView.extend({
        view: 'product-page',
        el: '.wrapper',
        events: {
            'click .single-listing-link': 'triggerSingleListingHash'
        },

        triggerSingleListingHash: function(evt) {
            evt.preventDefault();

            console.log(evt)

            var productMRid = $(evt.target).closest('.img-listing-container').attr('data-MR-ID')
            window.location.hash = "/products/listing/" + productMRid;
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

    Parse.FinalizeOrderView = Parse.TemplateView.extend({
        view: 'finalize-order',
        el: '.wrapper',
        events: {
            "click .confirm-purchase": "loadPayPal"
        },
        
        loadPayPal: function(evt){
            if($('#checkout').attr('data-status')==='inactive'){          
                $('#checkout').attr('data-status','active')    
                braintree.setup(
                    // Replace this with a client token from your server
                    "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3NDM0OGQwODUyMTYwMmQxYTI0YjgwNmY2M2RmYWMwYTc4OWY2MDA1M2IzNjkzNWM1OGJmMzA2NTExZTZjMmE2fGNyZWF0ZWRfYXQ9MjAxNS0wMy0zMFQwMTo1MTo1Mi4xOTkwMzgxMjMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQiLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjp0cnVlLCJjb2luYmFzZSI6eyJjbGllbnRJZCI6IjExZDI3MjI5YmE1OGI1NmQ3ZTNjMDFhMDUyN2Y0ZDViNDQ2ZDRmNjg0ODE3Y2I2MjNkMjU1YjU3M2FkZGM1OWIiLCJtZXJjaGFudEFjY291bnQiOiJjb2luYmFzZS1kZXZlbG9wbWVudC1tZXJjaGFudEBnZXRicmFpbnRyZWUuY29tIiwic2NvcGVzIjoiYXV0aG9yaXphdGlvbnM6YnJhaW50cmVlIHVzZXIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tL2NvaW5iYXNlL29hdXRoL3JlZGlyZWN0LWxhbmRpbmcuaHRtbCJ9LCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXBheW1lbnRzLmRldi1kY29wZWxhbmQiLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiXX19",
                    'dropin', {
                        container: 'dropin'
                    });
            }
        },

        triggerThanksHash: function(evt) {
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/thankyou"
        }
    })

    Parse.ThanksView = Parse.TemplateView.extend({
        view: 'thank-customer',
        el: '.wrapper'
    })

    Parse.AdminLoginView = Parse.TemplateView.extend({
        view: 'admin-login',
        el: '.wrapper',

        events: {
            "click .admin-login-btn": 'verifyPassword'
        },

        verifyPassword: function(evt) {
            evt.preventDefault();

            var loginName = $('#login-name').val()
            var passwordValue = $('#login-password').val()

            console.log([loginName, passwordValue])

            Parse.User.logIn(loginName, passwordValue)
                .then(function(parseUser) {

                    if (parseUser.get('role') === 'admin') {
                        window.location.hash = '/admin/dashboard';
                    } else {
                        parseUser.logOut();
                        $('.response-msg').text("User is not an admin").fadeIn();
                    }
                })
                .fail(function(error) {
                    $('.response-msg').text("Username doesn't exist or password is invalid").fadeIn();
                })



        }
    })

    Parse.AdminDashboardView = Parse.TemplateView.extend({
        view: 'admin-dashboard',
        el: '.wrapper',

        events: {
            'click .add-new-employee': 'addNewEmployee'
        },

        addNewEmployee: function(evt) {
            evt.preventDefault();
            console.log(evt);
            var newUserName = $('.new-employee-username').val();
            var newUserPassword = $('.new-employee-password').val();

            console.log(newUserName)
            console.log(newUserPassword)

            console.log(newUserName.length)
            console.log(newUserPassword.length)


            if (newUserName.length > 0 && newUserPassword.length > 0) {
                console.log('add user initiated')
                var newEmployeeUser = new Parse.User();
                newEmployeeUser.set('username', newUserName);
                newEmployeeUser.set('password', newUserPassword);
                newEmployeeUser.set('role', 'employee');


                newEmployeeUser.signUp()
                    .then(function(newUser) {
                        console.log(newUser);
                        Parse.User.logOut();
                        $('.response-msg').text('new employee submitted').show();
                        $('.new-employee-username').val("");
                        $('.new-employee-password').val("");

                    }).fail(function(error) {
                        $('.response-msg').text('didnt work user not submitted, sorry...').show();
                    })
            } else {
                $('.response-msg').text('enter values for new employee and new password').show();
            }
        }
    })

    Parse.UserLoginView = Parse.TemplateView.extend({
        view: 'user-login',
        el: '.wrapper'
    })

    Parse.EnterNewItemFormView = Parse.TemplateView.extend({
        view: 'enter-new-item',
        el: '.wrapper',
        events: {
            'click .generate-MR': 'queryDBForNewMR_id',
            'submit .new-item-form': 'submitItemToDB',
            'blur .top-level-category': 'handleTopLevelSelection',
            'blur .sub-category-1': 'handleSubCategory_1_Selection',
        },

        subCategory1: "",

        handleTopLevelSelection: function(evt){
            console.log(evt)
            var self = this;
            $('.sub-category-1').prop('disabled',false)//
            $('option.sub-category1-value').remove()
            $('.disabled-subcat1-option').prop('selected', true);

            var firstLevelCategory = $('.top-level-category').val()

            var subCategories = this.collection.categoryMap[firstLevelCategory];

            if(!subCategories){
                console.log('noSubCategories')
                $('.disabled-subcat1-option').text("--No subcategories for this option--")
                $('.sub-category-1').prop('disabled',true);

            } else {subCategories.forEach(function(subCategoryNum){
                $('.disabled-subcat1-option').text("--Select Sub-Category--")

                var subCategoryHTMLOptionEl = $('<option>');
                    subCategoryHTMLOptionEl
                        .val(subCategoryNum)
                        .addClass('sub-category1-value')
                        .text(self.collection.categoryLabels[subCategoryNum]+" - ("+subCategoryNum+")")
                    $('select.sub-category-1').append(subCategoryHTMLOptionEl)

                })
            }
        },

        handleSubCategory_1_Selection:function(evt){
            var self = this;
            console.log('<select> sub-cat-1 blurred')
            $('select.sub-category-2').prop('disabled',false)//
            $('option.sub-category2-value').remove()
            $('option.disabled-subcat2-option').prop('selected', true)

            var selectedSubCategory = $('select.sub-category-1').val();

            var subCategories = this.collection.categoryMap[selectedSubCategory];

            if(!subCategories){
                console.log('noSubCategories-2')
                $('.disabled-subcat2-option').text("--No subcategories for this option--");
                $('.sub-category-2').prop('disabled',true);
            
            } else {
                subCategories.forEach(function(subCategoryNum){
                
                $('.disabled-subcat2-option').text("--Select Sub-Category--")

                    var subCategoryHTMLOptionEl = $('<option>');

                    subCategoryHTMLOptionEl
                        .val(subCategoryNum)
                        .addClass('sub-category2-value')
                        .text(self.collection.categoryLabels[subCategoryNum]+" - ("+subCategoryNum+")")

                    $('select.sub-category-2').append(subCategoryHTMLOptionEl);
                    
                })
            }
        },

        queryDBForNewMR_id: function(evt) {
            evt.preventDefault()
            var self = this

            if (!this.queryMade) {
                console.log('input clicked..')
                var queryAllMRs = new Parse.Query(Parse.FurnitureItem);
                queryAllMRs.descending("MR_id");
                queryAllMRs.limit(5)
                queryAllMRs.find().then(function(results) {
                    console.log(results)
                    var highestID = results[0].get('MR_id');
                    var newItemMR_id = highestID + 1;
                    document.querySelector('.MR-ID-display').innerHTML = newItemMR_id
                })
            }
        },

        submitItemToDB: function(evt) {
            evt.preventDefault()

                var $newMrId = $('.MR-ID-display'),
                    $newItemName = $('.new-item-name'),
                    $newItemPrice = ($('.new-item-price')),
                    $newItemDesc = $('.new-item-desc'),
                    $newItemCondition = $('.new-item-condition'),
                    $newItemDesigner = $('.new-item-designer'),
                    $newItemDimensions = $('.new-item-dimensions'),
                    $newItemManufacturer = $('.new-item-manufacturer'),
                    $topLevelCategory = $('.top-level-category'),
                    $subCategory_1 = $('.sub-category-1'),
                    $subCategory_2 = $('.sub-category-2'),
                    $newImgFile = $('.selected-img-file')

                //
                
                var categoryTreeByNumber= []
                if($topLevelCategory.find('option:selected').val()) { categoryTreeByNumber.push($topLevelCategory.find('option:selected').val()) }
                if($subCategory_1.find('option:selected').val()) {categoryTreeByNumber.push($subCategory_1.find('option:selected').val())}
                if($subCategory_2.find('option:selected').val()) {categoryTreeByNumber.push($subCategory_2.find('option:selected').val())}


                console.log(categoryTreeByNumber)
                var treeByName = categoryTreeByNumber.map(function(categoryNum){
                    return MRCategoryLabels[categoryNum]
                })

                var newFurnitureItemModel = new Parse.FurnitureItem({
                    MR_id: parseInt($newMrId.text()),
                    item: $newItemName.val(),
                    price: parseInt($newItemPrice.val()),
                    priceDollar: "$"+numberCommaSeparated( parseInt($newItemPrice.val()) ),
                    condition: $newItemCondition.val(),
                    description: $newItemDesc.val(),
                    designer: $newItemDesigner.val(),
                    dimensions: $newItemDimensions.val(),
                    manufacturer: $newItemManufacturer.val(),
                    categoryTreeByNumber: categoryTreeByNumber || "",
                    categoriesByNumber: [categoryTreeByNumber[categoryTreeByNumber.length-1]] || "",
                    categoryTreeByName: treeByName || "",
                    categoriesByName: [treeByName[treeByName.length-1]]|| "",
                    inventoryStatus: "1"
                })

                //Create a Parse.File and put the file from the DOM onto it
                var uploadedFiles = $newImgFile[0].files

                var counter = 1;
                var filesGroupArray = [];

                //iterate over all the properties of the uploaded files
                for (var file in uploadedFiles) {
                    //filter the iteration for over those properties that have their own 'size' property
                    //i.e. (only the files, not .length or other stuff on the prototype)
                    if (uploadedFiles[file].hasOwnProperty('size')) {
                        //put the files on a sub-array and then push them to a grouped array
                        var fileWithFileNameArray = []
                        fileWithFileNameArray.push($newMrId.text() + "-" + "photo" + counter); //push name
                        fileWithFileNameArray.push(uploadedFiles[file]); //push uploaded file
                        filesGroupArray.push(fileWithFileNameArray);
                        counter++;
                    }
                }

                //create load function that iterates over img-files and saves them to parse server
                var loadFiles = function(filesGroup, itemModel) {
                    console.log('loading files....')
                    var totalFiles = filesGroup.length;
                    
                    filesGroup.forEach(function(imgFile, filesIndex) {
                        var parseImgFile = new Parse.File(imgFile[0], imgFile[1]);
                        console.log(parseImgFile)
                    
                        parseImgFile.save()
                            .then(function(parseFile) {
                                console.log(parseFile)
                                var imgNameInDB = ("database_img_FILE_" + (filesIndex + 1))
                                itemModel.set(imgNameInDB, parseFile);
                                
                                if (filesIndex + 1 === filesGroup.length) {
                                    console.log(itemModel)
                                    itemModel.set("imageCount", filesGroup.length)
                                
                                    itemModel.save().then(function(result) {
                                        console.log(result)
                                    }).fail(function(error) {
                                        console.log(error)
                                    });
                                }
                            })

                    })
                }

                loadFiles(filesGroupArray, newFurnitureItemModel)




                //Clear out the form inputs

                $newMrId.text("");
                $newItemName.val("");
                $newItemDesc.val("");
                $newItemPrice.val("");
                $newItemCondition.val("");
                $newItemDesigner.val("");
                $newItemDimensions.val("");
                $newItemManufacturer.val("")


                //For Categories: Clear out the <option> in <select> top-level category and sub-category
                console.log($('option.sub-category1-value'));
                $('option.sub-category1-value').remove();
                $('option.sub-category2-value').remove();
                //For Categories: Select first 'disabled' default options
                $topLevelCategory.find('.disabled-top-level-option').text('--Select Category--').prop('selected',true);
                $subCategory_1.find('.disabled-subcat1-option').text('--Must Select Top-Level Category--').prop('selected',true).prop('disabled',true);
                $subCategory_2.find('.disabled-subcat2-option').text('--Must Select Sub-Category--').prop('selected',true).prop('disabled',true);

                //For ImageFiles: Clear the files stored in <input type="file" multiple>
                resetField($newImgFile)

                //remove styles
                $('.form-group').each(function() {
                    $(this).removeClass('has-success has-error')

                })
            // }
        },

        _validateFormUI: function() {
            var testFields = []

            var $newMrId = $('.MR-ID-display')
            var $newItemName = $('.new-item-name');
            var $newItemPrice = $('.new-item-price');
            var $newItemDesc = $('.new-item-desc');
            var $newImgFile = $('.selected-img-file');

            //check to see if MR-ID field has a value
            if (!$newMrId.text()) {
                $newMrId.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newMrId.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
            }

            //check to see if New Item field has a name
            if (!$newItemName.val()) {
                $newItemName.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newItemName.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

            }


            //Check to see if new item price 
            if (!$newItemPrice.val() || $newItemPrice.val().match(/[a-z]/i)) {
                console.log('price is not a number')
                $newItemPrice.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                console.log('price is a number')
                testFields.push(true)
                $newItemPrice.closest('.form-group').addClass('has-success').removeClass('has-error')
            }


            //Check to see if new item category has value
            // if (!$newItemCategory.val()) {
            //     $newItemCategory.closest('.form-group').addClass('has-error')
            //     testFields.push(false)

            // } else {
            //     $newItemCategory.closest('.form-group').addClass('has-success').removeClass('has-error')
            //     testFields.push(true)

            // }

            //check to see if new item cagegory has value
            if (!$newItemDesc.val()) {
                $newItemDesc.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newItemDesc.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

            }

            if ($newImgFile[0].files.length < 1) {
                console.log('there is no image file')
                $newImgFile.closest('.form-group').addClass('has-error');
                testFields.push(false);
            } else {
                console.log($newImgFile)
                console.log('it says there is an image file')
                $newImgFile.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
            }


            var validFormTest;
            testFields.indexOf(false) === -1 ? validFormTest = true : validFormTest = false

            return validFormTest
        }
    })



    Parse.ReorganizeImagesView = Parse.TemplateView.extend({
        view: 'fix-images',
        el: '.wrapper',

        events:{
            'click .get-mr-imgs': 'getImagesFromDB',
            'click .upload-imgs': 'saveImagesToDB',
            'click .select-image': 'handleSelected'
        },

        imgTotal: 0,
        imgCounter: 0,
        currentMR: null,


        getImagesFromDB:function(evt){
            var self = this
            evt.preventDefault();

            var mrValue = parseInt($('.mr-input').val());
            this.currentMR = mrValue;

            var pQuery = new Parse.Query(Parse.FurnitureItem)

            pQuery.equalTo('MR_id', mrValue)

            pQuery.find().then(function(data){
                console.log(data)
                var data = self.revisedModel = data[0]
                
                var imageArray = []
                var imageTnArray = []
                for (var key in data.attributes){
                    if(key.match(/database_img_LINK_[0-9]/)) {
                        imageArray.push(data.attributes[key])
                    }
                    if(key.match(/database_img_LINK_t_[0-9]/)) {
                        imageTnArray.push(data.attributes[key])
                    }
                }


                self.collection = {
                    imageTnArray: imageTnArray,
                    imageArray: imageArray
                }

                console.log(self)


                self.imgTotal = imageArray.length
                
                self.render()
                $('h3').html('MR-'+mrValue).attr('data-id',mrValue)
                })
            console.log('get clicked');
        },

        handleSelected: function(evt){
            console.log(evt.target)
            var imageSourceTN = $(evt.target).attr('src');
            var imageSourceREG = $(evt.target).attr('data-imgSrc')
            $(evt.target).parent().remove();

            this.imgCounter++

            $('.img-input-'+this.imgCounter).find('img').attr('src',imageSourceTN)
            $('.img-input-'+this.imgCounter).find('p').text(imageSourceREG)
            
            console.log(this.imgCounter + " | " + this.imgTotal)

            if(this.imgCounter===this.imgTotal){
                console.log('image counter = image total')
                $('a.upload-imgs').removeAttr('disabled')
            }
        },

        saveImagesToDB: function(evt){
            evt.preventDefault();
            console.log('saved clicked');

            console.log(this.imgCounter)
            console.log(this.revisedModel)
            
            var i
            
            var uploadImages = {}
            var uploadThumbnails = {}
            
            for (i = 0; i < this.imgCounter; i++){
                var imgString = $('.img-input-'+(i+1)).find('p').text()
                console.log(imgString)

                var thumbnailImgString = imgString.slice(0,imgString.indexOf('.jpg')) + '_t.jpg';
                console.log(thumbnailImgString) 

                uploadImages['database_img_LINK_'+(i+1)] = imgString
                uploadThumbnails['database_img_LINK_t_'+(i+1)] = thumbnailImgString
               
            }

            console.log(uploadImages);
            console.log(uploadThumbnails);

            console.log(this.revisedModel)

            this.revisedModel.set(uploadImages)
            this.revisedModel.set(uploadThumbnails)

            //Clear fields
            $('.listing-id').text('MR')
            $('.info-container').html('')
            $('.upload-imgs').attr('disabled',true)
            this.imgCounter = 0;
            this.imgTotal = 0;
            this.currentMR++
            $('input.mr-input').val(this.currentMR)

        }
    })


    //*****************
    // Models & Collections
    //****************
    //

    Parse.FurnitureItem = Parse.Object.extend({
        className: "mrInventory",

        defaults: {
         // Sofa, Dining-Table, Bedframe, Rug
                // color: "",
                // timePeriod: // 
                // styleTags:, // Scandi, Art-Deco, Industrial, Contemporary
                // designer_creator: ""
                // status: "",
                // manufactureDate: 0,
                // condition:"",
                // height: 0,
                // width: 0,
                // depth: 0,
                // dateOfEntry: 0,
                // newArrival: false,
                // inventoryStatus: {
                //     listed: true
                //     available: true,
                //     shipped: false,
                //     successfulDelivery: false
                //     },
                // sold: false,
                // clearance: false
        },

        initialize: function() {
            var self = this

            //sanity check for price: if no price entered, then listed=false

            this.on('change', function() {
                self.save()
            })
        },

        validate: function() {
            //validate item name
            //validate item category
            //validate MR-ID
            //validate: listing-status

        }
    })

    Parse.FurnitureGroup = Parse.Collection.extend({
        model: Parse.FurnitureItem,

    })

    


    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);
