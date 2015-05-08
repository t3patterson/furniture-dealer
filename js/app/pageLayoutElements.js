;(function(exports) {

    Parse.Router = Parse.Router.extend({
        pageLayout_checkNavBar: function() {
            var navEl = document.querySelector('nav');
            
            if (navEl.innerHTML.indexOf('div') === -1) {
                this.navView.render()
            }

        },

        pageLayout_insertBreadCrumb: function(options){

            //create the options
            //
            var data = {
                        //loads the category labels &  category map ()
                        categoryQuery: options && options.queryType === 'category' ? true : false,
                        categoryLabels: MRCategoryLabels,
                        categoryMap: MRCategoryMap,
                        
                        //empty array to establish the current-category's category tree in the view
                        currentCategoryTree: [],
                        currentCategory: options && options.labelOption || "",

                        //tests to see if queryType is 'style'
                        // if yes, breadcrumb <h1> will render string from loadListingsByStyle()
                        styleQuery: options && options.queryType ==='style' ? true : false,
                        styleType: options && options.labelOption || "",   

                        // tests to see if queryType is 'search'
                        // if yes,  breadcrumb <h1> will render string from loadSearchResults()
                        searchQuery: options && options.queryType==='search' ? true : false,
                        searchTerms: options && options.labelOption || "",
                                            
                        
                        //Pagination
                        
                        totalMatches: options && options.totalMatches ||"",
                        totalPages: options && options.totalMatches && Math.ceil(options.totalMatches/20 || ""),
                        currentPage: options && options.currentPage || 1,
 
                    }


            data.currentListingSet= [(data.currentPage-1)*20+1, 
                        Math.min(data.totalMatches, (data.currentPage-1)*20+20)]

            var breadCrumbEl = document.querySelector('.my-breadcrumb');
            
            if (data.categoryQuery) {
                var labelNum = utility_returnCategoryTree(data.currentCategory, data.categoryMap);

                labelNum.forEach(function(labelNum){
                    data.currentCategoryTree.push(data.categoryLabels[labelNum])
                })
            }


            data.currentCategoryTree.unshift('All Products');
            console.log(data.currentCategoryTree);
            this.breadCrumbView.collection = data;
            this.breadCrumbView.render();

        },

        pageLayout_insertPagination: function(options){
            var data = {
                totalMatches: options && options.totalMatches ||"",
                totalPages: options && options.totalMatches && Math.ceil(options.totalMatches/20 || ""),
                currentPage: options && options.currentPage || 1
            }
            
            this.paginationView.collection = data;
            this.paginationViewBottom.collection = data;
            console.log(this.paginationViewBottom)
            
            this.paginationView.render();
            this.paginationViewBottom.render();
        },

        pageLayout_checkFooter: function() {
            var footerEl = document.querySelector('footer');
            if (footerEl.innerHTML.indexOf('div') === -1) {
                this.footerView.render()
            }
        },

        pageLayout_clearBreadCrumb: function(){
            document.querySelector('.my-breadcrumb').innerHTML = ""
        },

        pageLayout_clearPagination: function(){
            document.querySelector('.pagination-top').innerHTML=""
            document.querySelector('.pagination-bottom').innerHTML=""

        },

        pageLayout_clearFooter: function() {
            document.querySelector('footer').innerHTML = ""
        }
    })
    
    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',

        events: {
            "click a.products-link": "triggerProductPageHash",
            "click a.cart-link": "triggerShoppingCartHash",
            "click a.about-link": "triggerAboutHash",
            "click a.search-toggle": "toggleSearch",
            "click a.enter-search-terms": "keywordSearch"
        },

        triggerProductPageHash: function(evt) {
            evt.preventDefault();
        },
        triggerShoppingCartHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/shopping-cart"
        },
        triggerAboutHash: function(evt) {
            evt.preventDefault();
            window.location.hash = "/about-us"
        },

        toggleSearch:function(evt){
            evt.preventDefault()
            $('.search-bar').toggle();
        },

        keywordSearch: function(){
            console.log('item searched')
            var $itemSearchInput = $('.item-search-input');
            var wordsSearched = $itemSearchInput.val().split(" ").join(",")
            window.location.hash = "/products/search-results/keywords="+wordsSearched
        }
    })

    Parse.FooterView = Parse.TemplateView.extend({
        view: 'footer',
        el: 'footer'
    })

    Parse.BreadCrumbView = Parse.TemplateView.extend({
        el: '.my-breadcrumb',
        view: 'nav-breadcrumb',    
        bcOptions: {
            totalMatches: 0,
            totalPages: function(){ return Math.ceil(this.totalMatches/20) },
            currentPage: 1,
        },
    })

    Parse.PaginationView = Parse.TemplateView.extend({
        el: '.pagination-top',
        view: 'pagination',
        
        paginationOptions: {
            
        },

        calcTotalPages: function(){
            return Math.ceil(this.totalMatches/20)
        },

        events: {
            'click .next-20': 'triggerNext20',
            'click .prev-20': 'triggerPrev20',
            'click .select-page': 'triggerPageX'
        },

         triggerNext20: function(evt){
            evt.preventDefault();
            console.log(evt)
            this.trigger('showNext20');
        },

        triggerPrev20: function(evt){
            evt.preventDefault();
            this.trigger('showPrev20')
        },

        triggerPageX: function(evt){
            evt.preventDefault();
            $(evt.target).attr('data-event','page')
            this.trigger('showPageX')
        }
    })

    Parse.PaginationViewBottom = Parse.PaginationView.extend({
        el: '.pagination-bottom',
        view: 'pagination'
    })

    exports.Parse.Router = Parse.Router;
    exports.Parse.NavView = Parse.NavView;
    exports.Parse.FooterView = Parse.FooterView
    exports.Parse.PaginationView = Parse.PaginationView;
    exports.Parse.PaginationViewBottom = Parse.PaginationViewBottom;
    exports.Parse.BreadCrumbView = Parse.BreadCrumbView;



})(typeof module === "object" ? module.exports : window);

