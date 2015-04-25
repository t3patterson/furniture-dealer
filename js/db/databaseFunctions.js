;(function(exports) {

    var DataBaseManagement = {

        parseDeleteLoop : function (iterations, queryType, queryField, queryValue) {
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
        },

        uploadInventoryToParse : function (dataArrayToParse){
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
        },

        createSandbox : function(){
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
        },

        createKeyWordArrayForMRs : function(floorMR,upperMR, excludedWordsList, callback){
            if ( (upperMR-floorMR) / 100  < 1 ){
                var totalQueries = 1
            } else{
                var totalQueries = Math.ceil((upperMR - floorMR) / 100)
            }

            console.log(totalQueries)
            
            callback( floorMR, upperMR, totalQueries, excludedWordsList)  
        },

        _queryEditAndSave : function(floorMR, upperMR, iterations, excludedWordsList){
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
    }

    // -------------------------
    // ExecutionCode for modifying data in Parse **
    // ---------------------------

    // ADD
    // -------
    // var dataToParse = dataArrayToUpload;
    // console.log(dataToParse)
    // DatabaseManagement.uploadInventoryToParse(dataToParse)

    //DELETE
    //-------
    //DatabaseManagement.parseDeleteLoop(10, 'greaterThan','createdAt', {"__type":"Date", "iso":"2015-04-16T22:45:08.256Z"})                    


    //CREATE KEYWORDS
    //-----------
    // var noNoWordsList = ["the","in","by","for","of","on", "in", "and","with","&"]
    // DatabaseManagement.createKeyWordArrayForMRs(6000,14000,noNoWordsList)


})(typeof module === "object" ? module.exports : window);

