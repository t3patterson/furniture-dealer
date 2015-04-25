;(function(exports) {

    exports.utility_numberCommaSeparated = function (num, spaceOption) {

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

    exports.utility_returnCategoryTree = function(value, categoryMap){
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

    exports.utility_searchInventoryByItemName = function(query){
        

        //create a promise object to be resolved after an asynch process completes
        var $promise = $.Deferred()

        var pquery = query

        pQuery.containsAll("searchKeywords",queryValue)
        
        pQuery.count().then(function(totalMatched){
            pQuery.find().then(function(searchResults){
                if(searchResults.length === 0){searchResults = false}
                var resolvedPromise = 
                console.log(totalMatched)
                console.log(searchResults)
                $promise.resolve(searchResults)
            })
        })

        return $promise
    }

})(typeof module === "object" ? module.exports : window);

