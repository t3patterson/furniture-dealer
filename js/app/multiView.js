;(function(exports) {

    Parse.Router = Parse.Router.extend({
        _pQueryAndRender: function(options, queryType, routeNodeOrInput){
            var self = this;
            this.breadCrumbView.bcOptions.queryType = queryType

            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.descending('MR_id');
            pQuery.notEqualTo('inventoryStatus','0')
            pQuery.limit(20);

            switch (queryType){
                case "category":
                    pQuery.equalTo("categoryTreeByNumber", routeNodeOrInput);
                    break;

                case "style":  
                   if (routeNodeOrInput === "mid-century"){
                    pQuery.containsAll("searchKeywords",["mid","century"])
                    } else {
                    pQuery.equalTo("categoryTreeByName",options.labelOption)
                    }

                    break;
                
                case "search":

                    var inputArray = routeNodeOrInput.split(" ")

                    var excludedWords = ["the","in","by","for","of","on", "in", "and","with","&"]

                    var queryValue = inputArray.filter(function(word){
                                return excludedWords.indexOf(word)=== -1 
                            }).map(function(word){

                                // only capitalized MR's will be searched, 
                                // all others searched strings will be reduced to lowerCase
                                if (word.indexOf('MR')>-1) {
                                    return word
                                } else {return word.toLowerCase() }
                            })
 
                    pQuery.containsAll("searchKeywords", queryValue);

                    break;

                default:
                    pQuery = pQuery
                    break;
            }

            this.currentQueryParams = pQuery; //save pquery for later

            //make query, when query returns data
            pQuery.count().then(function(totalQueryMatches){
                pQuery.find().then(function(arrayOfModels) {
                        // data returned is an array of Parse models
                        window.scrollTo(0,0);

                        self.multiListingView.collection = arrayOfModels
                        //insert the breadcrumb navigation & check the footer
                        
                        self.breadCrumbView.bcOptions.totalMatches = totalQueryMatches
                        self.breadCrumbView.bcOptions.totalPages = Math.ceil(totalQueryMatches/20 || "")
                        self.breadCrumbView.bcOptions.currentPage = 1;
                        self.breadCrumbView.bcOptions.labelOption = options && options.labelOption || "";

                        console.log(options)
                        self.breadCrumbView.bcOptions.searchTerms = options && options.Option || "";

                        console.log(self.breadCrumbView.bcOptions)
                        var pagOptions = self.breadCrumbView.bcOptions
                        var bcOptions = self.breadCrumbView.bcOptions
                        
                        self.paginationView.paginationOptions = pagOptions

                        console.log(bcOptions)
                        self.pageLayout_insertBreadCrumb(bcOptions)
                        self.pageLayout_insertPagination(pagOptions)
                        console.log('1stRender')
                        self.multiListingView.render();

                        self.pageLayout_checkFooter()
                })
            })
        },

        multiView_loadAllProductsPg: function() {
            var self = this;
            //make sure navbar exists
            this.pageLayout_checkNavBar();
            this._pQueryAndRender();  
        },
        
        multiView_loadListingsByCategory: function(catNum) {
                var bcOptions = {
                    labelOption: catNum,
                    queryType: 'category'
                }

                var pagOptions = {

                }

                var self = this
                this.pageLayout_checkNavBar();

                this._pQueryAndRender(bcOptions, "category", catNum)
        },
        
        multiView_loadListingsByStyle: function(styleName){
            var self = this;
            console.log('styles loaded?')
            this.pageLayout_checkNavBar();

            var styleLabelMap = {
                "mid-century": "Mid Century",
                "art-deco": "Art Deco",
                "scandinavian" : "Scandinavian",
                "traditional": "Traditional"
            }

            var bcOptions = {
                    labelOption: styleLabelMap[styleName]
                }

            this._pQueryAndRender(bcOptions,'style',styleName)
        },

        multiView_loadSearchResults: function(keywords){
            var self = this 
            this.pageLayout_checkNavBar()
            
            console.log('searchResults-loaded')
            //get key words from hash route and put them into space-separated string: 
            //   * (e.g. /results=herman,miller,chair >> 'herman miller chair')
            var wordsSearched = keywords.slice(keywords.indexOf('=')+1).replace(/,/g," ")            

                var options = {
                    labelOption: wordsSearched,
                }
                this._pQueryAndRender(options,'search',wordsSearched)
        }
     })
    
    Parse.MultiListingView = Parse.TemplateView.extend({
            view: 'product-page',
            el: '.wrapper',
            events: {
                'click .single-listing-link': 'triggerSingleListingHash'
            },

            listingsCount: 0,

            totalPages: function(){
                return this.listingsCount / 20
            },


            triggerSingleListingHash: function(evt) {
                evt.preventDefault();

                console.log(evt)

                var productMRid = $(evt.target).closest('.img-listing-container').attr('data-MR-ID')
                window.location.hash = "/products/listing/" + productMRid;
            }
    })

    exports.Parse.Router = Parse.Router
    exports.Parse.MultiListingView = Parse.MultiListingView

})(typeof module === "object" ? module.exports : window);

