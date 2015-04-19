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

    function returnCategoryTree(value, categoryMap){
                var categoryTree = [];
                var MRCategories = MRCategoryLabels;

                if (categoryMap['top-level'].indexOf(value) !== -1){
                    categoryTree.push(value)
                } else {

                    while(categoryTree.indexOf(value)===-1){
                    categoryTree.push(value)

                        for (var key in categoryMap){
                            if (categoryMap['top-level'].indexOf(value)>-1){
                                var i = categoryMap['top-level'].indexOf(value);
                                categoryTree.push(categoryMap['top-level'][i])
                                break
                            } else if(categoryMap[key].indexOf(value)>-1){
                                value = key
                            }
                        }
                    }
                }
            return categoryTree.reverse()
        }



    function resetField(el) {
        el.wrap('<form>').parent('form').trigger('reset');
        el.unwrap();
    }

    //Database Management
    function parseDeleteLoop(iterations, queryType, queryField, queryValue) {
        function setQueryParameter(query, queryType){
            switch(queryType){
                case 'greaterThan':
                    query.greaterThan(queryField,queryValue);
                    break;
                
                case 'greaterThanOrEqualTo':
                    query.greaterThanOrEqualTo(queryField,queryValue);
                    break;
                
                case 'lessThan':
                    query.lessThan(queryField,queryValue);
                
                case 'lessThanOrEqualTo':
                    query.lessThanOrEqualTo(queryField,queryValue);
                    break;

                default:
                    throw "USER ERROR: Enter a queryType: 'greaterThan', 'greatherThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo'";
            }
        }

        if (iterations){
            _.delay(function(){
               var query = new Parse.Query(Parse.FurnitureItem); 
               setQueryParameter(query,queryType)
                
                query.find().then(function(dataFromParse){
                    console.log(dataFromParse)
                     dataFromParse.forEach(function(model){
                         _.delay(function(){
                        model.destroy()
                        }, 50) 
                    })  
                })
                iterations--
                parseDeleteLoop(iterations,queryType, queryField,queryValue)
            },6000) 
        }
    }

    function uploadInventoryToParse(dataArrayToParse){
        var iterations = dataArrayToParse.length
        var modelAttributes = dataArrayToParse.pop();
        var itemToUpload = new Parse.FurnitureItem(modelAttributes);
        
        itemToUpload.save().then(function(){
            if(iterations){
                _.delay(function(){
                    uploadInventoryToParse(dataArrayToParse)  
                },50)
            }
        })
    }

    function createSandbox(){
        var pQuery = new Parse.Query(Parse.FurnitureItem);
            
            pQuery.find().then(function(data){
                console.log(data);

                data.forEach(function(model){
                    var attributes = {}
                    var key
                    for (key in model.attributes){
                        attributes[key] = model.attributes[key]
                    }

                    var sandboxModel = new Parse.FurnitureItemSandbox(attributes)
                    sandboxModel.save();

                })
            })
    }

    function createKeyWordArrayForMRs(floorMR,upperMR, excludedWordsList){
        if ( (upperMR-floorMR) / 100  < 1 ){
            var totalQueries = 1
        } else{
            var totalQueries = Math.ceil((upperMR - floorMR) / 100)
        }

        console.log(totalQueries)
        _queryEditAndSave( floorMR, upperMR, totalQueries, excludedWordsList)  
    }

    function _queryEditAndSave(floorMR, upperMR, iterations, excludedWordsList){
        var doItOnce = function(upperMR, excludedWordsList){
            console.log(upperMR)
            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.greaterThan("MR_id",Math.max(upperMR-100,floorMR))
            pQuery.lessThanOrEqualTo("MR_id",upperMR)
            
            pQuery.find().then(function(data){
                console.log(data)
                data.forEach(function(model){
                    _.delay(function(){
                        if(model.get('item')){ 
                            var splitDescriptionArray = model.get('item').split(" ")
                            var filteredDescriptionArray = splitDescriptionArray.filter(function(word){
                            console.log(word)
                            return excludedWordsList.indexOf(word)=== -1 
                             }).map(function(word){
                            return word.toLowerCase()
                        })
                    }

                        model.set("searchKeywords",filteredDescriptionArray)
                        model.save()
                    }, 50)
                })
            })
        }

        doItOnce(upperMR, excludedWordsList);
        upperMR = upperMR - 100
        iterations--
        console.log(iterations)
        if(iterations){ _.delay(function(){_queryEditAndSave( floorMR, upperMR, iterations, excludedWordsList)},10000)}
    }
    
    //Future-App Functions
    function searchInventoryByItemName(inputValue, excludedWords){
        
        var $promise = $.Deferred()

        var pQuery = new Parse.Query(Parse.FurnitureItem)

        var inputArray = inputValue.split(" ")
        
        var queryValue = inputArray.filter(function(word){
                    return excludedWords.indexOf(word)=== -1 
                }).map(function(word){
                    return word.toLowerCase()
                })

        pQuery.containsAll("searchKeywords",queryValue)
        
        pQuery.find().then(function(searchResults){
            if(searchResults.length === 0){searchResults = ('shit, you got nothing')}
            console.log($promise)
            console.log(searchResults)
            $promise.resolve(searchResults)
        })

        return $promise

    }
    

    var noNoWordsList = ["the","in","by","for","of","on", "in", "and","with","&"]


    Parse.PageRouter = Parse.Router.extend({
        initialize: function() {
            console.log('routing initialized');


            // -------------------------
            // Code for modifying data in Parse **
            // ---------------------------

            //ADD
            //-------
            // var dataToParse = dataArrayToUpload;
            // console.log(dataToParse)
            // uploadInventoryToParse(dataToParse)

            //DELETE
            //-------
            //parseDeleteLoop(10, 'greaterThan','createdAt', {"__type":"Date", "iso":"2015-04-16T22:45:08.256Z"})                    


            //CREATE KEYWORDS
            //-----------
            // createKeyWordArrayForMRs(6000,14000,noNoWordsList)


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
            this.categoriesView = new Parse.CategoriesView()

            this.aboutView = new Parse.AboutView()
            this.consignView = new Parse.ConsignView()
            this.cartView = new Parse.ShoppingCartView();
            this.finalizeOrderView = new Parse.FinalizeOrderView({
                collection: this.shoppingCart
            })
            
            this.thankCustomerView = new Parse.ThanksView();
            
            this.newItemFormView = new Parse.EnterNewItemFormView();
            
            this.searchItemView = new Parse.SearchExistingItemView();
            
            this.editItemView = new Parse.EditExistingItemView()

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
            var modelRemoved = this.shoppingCart.models.filter(function(model) {
                return model.get('MR_id') === MRidOnSS;
            })

            this.shoppingCart.remove(modelRemoved);
            this.cartView.collection = this.shoppingCart
        },

        //Routes


        routes: {
            'employee/*/enter-new-item': 'loadEnterNewItemForm',
            'employee/*/edit-item/:mrId': 'loadEditExistingItemForm',
            'employee/*/search-item': 'loadSearchItem',
            'employee/login': 'loadUserLogin',
           
            'admin/dashboard': 'loadAdminDashboard',
            'admin/login': 'loadAdminLogin',
           
            'finalize-order': 'loadFinalizeOrder',
            'consignment-form': 'loadConsignment',
            'thankyou': 'loadThankCustomer',
            'shopping-cart': 'loadShoppingCart',


            'products/*/search-results/:search': 'loadSearchResults',
            'products/*/category/:type': 'loadListingsByCategory',
            'products/*/listing/:mrId': 'loadSingleListing',
            'products/*/style/:styleName': 'loadStyleListings',
            'products/categories': 'loadCategoriesPage',
            'products': 'loadProductsPg',
            'about-us': 'loadAboutPg',

            //add-items
            'fix-images':'loadReorganizeImgs',
            
            '*path': 'loadHome'
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

        insertBreadCrumb: function(categoryOption){
            var data = {
                        categoryLabels: MRCategoryLabels,
                        categoryMap: MRCategoryMap,
                        currentCategory: categoryOption || "",
                        currentCategoryTree: []
                    }

            var breadCrumbEl = document.querySelector('.my-breadcrumb');
          
            if (breadCrumbEl.innerHTML.indexOf('div') === -1) {
            
            

            if(data.currentCategory){
                var labelNum = returnCategoryTree(categoryOption,data.categoryMap);
                labelNum.forEach(function(labelNum){
                    data.currentCategoryTree.push(data.categoryLabels[labelNum])
                })
            
            }

            data.currentCategoryTree.unshift('All Products');
            console.log(data.currentCategoryTree)
            this.breadCrumbView.collection = data
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

        loadCategoriesPage: function(){
            this.checkNav()
            window.scrollTo(0,0)

            var data = {
                categoryLabels: MRCategoryLabels,
                categoryMap: MRCategoryMap
            }

            this.clearBreadCrumb();
            this.categoriesView.collection = data
            this.categoriesView.render()
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
        
        //BOOKMARK-b: make it where the hash route can search for subcategories
        loadListingsByCategory: function(catNum) {

                var self = this
                console.log('category Page loaded');
                this.checkNav();


                var pQuery = new Parse.Query(Parse.FurnitureItem);

                pQuery.equalTo("categoryTreeByNumber", catNum);
                pQuery.limit(20)

                pQuery.find().then(function(matched) {
                    console.log(matched)
                    self.productsListView.collection = matched
                    self.checkFooter();
                    window.scrollTo(0,0);

                    self.productsListView.render(); //pass a collection;
                    
                    self.insertBreadCrumb(catNum);


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

        loadSearchResults: function(keywords){
            var self = this 

            this.checkNav()
            console.log('searchResults-loaded')
            var wordsSearched = keywords.slice(keywords.indexOf('=')+1).replace(","," ")
            console.log(wordsSearched)
            searchInventoryByItemName(wordsSearched,noNoWordsList).then(function(data){
                var sliced = _.slice(data,0,20)
                self.productsListView.collection = sliced;
                self.insertBreadCrumb(wordsSearched)
                self.productsListView.render();
                self.checkFooter();
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

                    //render footer
                    self.insertBreadCrumb();  
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
            window.scrollTo(0,0);
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
            window.scrollTo(0,0);
            this.newItemFormView.render()

        },

        loadSearchItem:function(){
            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0);
            this.searchItemView.render();
        },

        loadEditExistingItemForm: function(mrId) {
            var self = this;

            this.checkNav();
            this.clearBreadCrumb();
            this.clearFooter();
            window.scrollTo(0,0);

            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.equalTo('MR_id',parseInt(mrId))
            
            pQuery.find().then(function(model){
                var retrievedModel = model[0]
                 self.editItemView.model = retrievedModel
                 self.editItemView.render();
            })           
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
        },

         loadReorganizeImgs: function(){
            this.reorganizeImagesView.collection = {
                imageArray: [],
                imageTnArray: []
            }
            this.reorganizeImagesView.render();
        }
    })

        Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',

        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.cart-link": "triggerShoppingCartHash",
            "click a.about-link": "triggerAboutHash",
            "click a.enter-search-terms": "keywordSearch"
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

        keywordSearch: function(){
            console.log('item searched')
            var $itemSearchInput = $('.item-search-input');
            var wordsSearched = $itemSearchInput.val().split(" ").join(",")
            window.location.hash = "/products/search-results/keywords="+wordsSearched
        }
    })

    Parse.BreadCrumbView = Parse.TemplateView.extend({
        el: '.my-breadcrumb',
        view: 'nav-breadcrumb'
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

    Parse.CategoriesView = Parse.TemplateView.extend({
        view: 'categories',
        el: '.wrapper',

        events: {
            "click .category-tag": "triggerCategoryHash"
        },

        triggerCategoryHash: function(evt){
            evt.preventDefault()
            var categoryTag = $(evt.target).attr('data-tag')
            //BOOKMARK-a: add correct hash route;
            console.log(categoryTag)
            window.location.hash="/products/category/"+categoryTag

        }
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
            'click .single-listing-link': 'triggerSingleListingHash',
            'click .next-20': 'queryDBAndReRenderNext',
            'click .prev-20': 'queryDBAndReRenderPrev'

        },

        skipFactor:0,

        triggerSingleListingHash: function(evt) {
            evt.preventDefault();

            console.log(evt)

            var productMRid = $(evt.target).closest('.img-listing-container').attr('data-MR-ID')
            window.location.hash = "/products/listing/" + productMRid;
        },

        queryDBAndReRenderNext: function(){
            var self = this;
            console.log(window.location.hash)
            
            var pQuery = new Parse.Query(Parse.FurnitureItem)
                this.skipFactor++
                pQuery.limit(20)
                pQuery.skip(this.skipFactor*20)

            if(window.location.hash==="#/products"){
                pQuery.find().then(function(data){
                    self.collection = data
                    self.render()
                })
            } else if(window.location.hash.indexOf('category')){
                    var stringOmania = window.location.hash
                    var dividerStr = 'category/'
                    var cutOffIndex = stringOmania.indexOf('category/')
                    console.log(stringOmania)
                    console.log(dividerStr)
                    console.log(cutOffIndex)
                    var targetCatNum= stringOmania.substr(cutOffIndex+dividerStr.length)
                    pQuery.equalTo("categoryTreeByNumber",targetCatNum)
                    pQuery.find().then(function(data){
                        self.collection = data
                        console.log(self.collection)
                        self.render()
                    })
            }
            console.log(this.skipFactor)

        },

      queryDBAndReRenderPrev: function(){
            var self = this;
            console.log(window.location.hash)
            
            var pQuery = new Parse.Query(Parse.FurnitureItem)
                if(this.skipFactor===0){return}
                this.skipFactor===0 ? this.skipFactor = 0 : this.skipFactor--;

                pQuery.limit(20)
                pQuery.skip(this.skipFactor*20)

            if(window.location.hash==="#/products"){
                pQuery.find().then(function(data){
                    self.collection = data
                    self.render()
                })
            } else if(window.location.hash.indexOf('category')){
                    var stringOmania = window.location.hash
                    var dividerStr = 'category/'
                    var cutOffIndex = stringOmania.indexOf('category/')
                    console.log(stringOmania)
                    console.log(dividerStr)
                    console.log(cutOffIndex)
                    var targetCatNum= stringOmania.substr(cutOffIndex+dividerStr.length)
                    pQuery.equalTo("categoryTreeByNumber",targetCatNum)
                    pQuery.find().then(function(data){
                        self.collection = data
                        console.log(self.collection)
                        self.render()
                    })
            }
            console.log(this.skipFactor)
        },


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

    Parse.EmployeeDashboardView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'employee-dashboard'
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
    
    Parse.SearchExistingItemView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'search-existing-item',

        events: {
            "click .search-MR": "queryMRDatabase"
        },

        queryMRDatabase: function(evt){
            evt.preventDefault();
            var inputMR = parseInt($('.mr-search-input').val())

            window.location.hash = "/employee/edit-item/"+inputMR;
        }

    })

    Parse.EditExistingItemView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'edit-existing-item',



        initialize: function(){
            var query = new Parse.Query(Parse.TemporaryPhotosForEdit);
            query.find().then(function(data){
                var promises = []
                data.forEach(function(model){
                    promises.push(model.destroy())
                })
                return Parse.Promise.when(promises)
            })
        },

        events: {
            'change .selected-img-file': 'checkFile'
        },



        checkFile: function(e){
            console.log(e)
            if(e.target.files.length > 0){


                var theFile = e.target.files[0];
                var targetEl = $(e.target);
                var targetInput = $(e.target)
                var currntImgIndex = targetEl.attr('data-index');
                var parseFile = new Parse.File("tmpphoto", theFile)
                var imgReference = "temp_img_"+ currntImgIndex


                //check to see if there is an image the parse database, 
                //    if yes, then delete
                
                var savetheTempFilesAndChangeTheImage = function(){
                    parseFile.save().then(function(){
                        var tempImg = new Parse.TemporaryPhotosForEdit();
                        

                        tempImg.set("imageIndex", imgReference)
                        tempImg.set(imgReference, parseFile)

                        tempImg.save().then(function(data){
                            console.log(data)
                            var pQuery = new Parse.Query(Parse.TemporaryPhotosForEdit)
                            pQuery.equalTo('imageIndex',imgReference)
                            pQuery.find().then(function(file){
                                console.log(file)
                                var imgSrc = file[0].get('temp_img_'+currntImgIndex)._url
                                $('.sample-img-'+currntImgIndex).attr({'src':imgSrc, 'data-parsetemp':'true'})
                                
                                })

                            })

                    })
                }

                
                if($('.sample-img-'+currntImgIndex).attr('data-parsetemp')==='true' ) {
                    var parseQuery = new Parse.Query(Parse.TemporaryPhotosForEdit);
                    parseQuery.find()
                        .then(function(results){

                            var promises = []
                            results.forEach(function(model){
                                promises.push(model.destroy())
                            })
                            return Parse.Promise.when(promises)
                        
                        }).then(function(){
                        savetheTempFilesAndChangeTheImage()
                        })
                } else {
                    savetheTempFilesAndChangeTheImage();
                }

                //save the file & image to the database
               
            }
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

            if(this.imgCounter > 0){
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
            
            for (i = 0; i < this.imgTotal; i++){
                var imgString = $('.img-input-'+(i+1)).find('p').text()
                console.log(imgString)

                var thumbnailImgString = (imgString) ? imgString.slice(0,imgString.indexOf('.jpg')) + '_t.jpg': "";
                console.log(thumbnailImgString)

                uploadImages['database_img_LINK_'+(i+1)] = imgString
                uploadThumbnails['database_img_LINK_t_'+(i+1)] = thumbnailImgString
               
            }

            console.log(uploadImages);
            console.log(uploadThumbnails);

            console.log(this.revisedModel)

         


            $.when(
                this.revisedModel.set(uploadImages),
                this.revisedModel.set(uploadThumbnails) )
                .then(function(model){
                    for (var key in model.attributes){
                        if(key.match(/database_img_LINK_[0-9]/)) {
                            if(!model.attributes[key]){
                                model.unset(key);
                                model.set('imageCount', model.get('imageCount')-1)
                            }

                        }

                        if(key.match(/database_img_LINK_t_[0-9]/)) {
                           if(!model.attributes[key]){model.unset(key)}
                        }

                    model.save()
                }


            })

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

    Parse.FurnitureItemSandbox = Parse.Object.extend({
        className: "sandbox",

        defaults: {
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
        model: Parse.FurnitureItem

    })

    Parse.TemporaryPhotosForEdit = Parse.Object.extend({
        className: "TempPhotos",
        defaults: {
            "imageName" : "",
            "temp_img_1": undefined,
            "temp_img_2": undefined,
            "temp_img_3": undefined,
            "temp_img_4": undefined,
            "temp_img_5": undefined,
            "temp_img_6": undefined,
            "temp_img_7": undefined,
            "temp_img_8": undefined

        }
   })


    



    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);
