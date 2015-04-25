;(function(exports) {

    var dbManagement = {

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
                       //setQueryParameter(query,queryType)
                        
                        query.find().then(function(dataFromParse){
                            console.log(dataFromParse)
                             dataFromParse.forEach(function(model){
                                 _.delay(function(){
                                model.destroy()
                                }, 80) 
                            })  
                        })
                        iterations--
                        dbManagement.parseDeleteLoop(iterations,queryType, queryField,queryValue)
                    },10000) 
                }
        },

        uploadInventoryToParse : function (dataArrayToParse){
            var iterations = dataArrayToParse.length
            var modelAttributes = dataArrayToParse.pop();
            var itemToUpload = new Parse.FurnitureItem(modelAttributes);
            
            itemToUpload.save().then(function(){
                if(iterations){
                    _.delay(function(){
                        dbManagement.uploadInventoryToParse(dataArrayToParse)  
                    },70)
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

        editArrayData : function(floorMR,upperMR, callback){
            if ( (upperMR-floorMR) / 100  < 1 ){
                var totalQueries = 1
            } else{
                var totalQueries = Math.ceil((upperMR - floorMR) / 100)
            }

            console.log(totalQueries)
            
            callback(floorMR, upperMR, totalQueries)  
        },

        _queryEditAndSaveKeyWords : function(floorMR, upperMR, iterations){
            var excludedWordsList = ["the","in","by","for","of","on", "in", "and","with","&"]

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
                                return excludedWordsList.indexOf(word)=== -1 
                                 }).map(function(word){
                                return word.toLowerCase()
                                })
                            }
                            
                            filteredDescriptionArray.push('MR'+model.get('MR_id'));
                            model.set('searchKeywords', filteredDescriptionArray);
                            model.save();

                        }, 70)
                    })
                })
            }

            doItOnce(upperMR, excludedWordsList);
            upperMR = upperMR - 100
            iterations--
            console.log(iterations)
            if(iterations>0){ _.delay(function(){dbManagement._queryEditAndSaveKeyWords( floorMR, upperMR, iterations)},10000)}
        },

        _queryEditAndSaveInventoryQuantity : function(floorMR, upperMR, iterations){
            var doItOnce = function(upperMR){
                console.log(upperMR)
                var pQuery = new Parse.Query(Parse.FurnitureItem);
                pQuery.greaterThan("MR_id",Math.max(upperMR-100,floorMR))
                pQuery.lessThanOrEqualTo("MR_id",upperMR)
                pQuery.find().then(function(data){
                    console.log(data)
                    data.forEach(function(model){
                        _.delay(function(){
                            var inventoryQuantity = parseInt(model.get('inventoryStatus'))

                            model.set("inventoryCount",inventoryQuantity)
                            model.save()
                        }, 60)
                    })
                })
            }

            doItOnce(upperMR);
            upperMR = upperMR - 100
            iterations--
            console.log(iterations)
            if(iterations){ 
                console.log(true)
                _.delay(function(){dbManagement._queryEditAndSaveInventoryQuantity(floorMR, upperMR, iterations)},10000)
            }
        }
    }

    // -------------------------
    // ExecutionCode for modifying data in Parse **
    // ---------------------------

    // ADD
    // -------
    // var dataToParse = dataArrayToUpload;
    // console.log(dataToParse)
    // dbManagement.uploadInventoryToParse(dataToParse)

    //DELETE
    //-------
        // dbManagement.parseDeleteLoop(10, 'greaterThan','createdAt', {"__type":"Date", "iso":"2015-04-16T23:01:00.256Z"})                    


    //CREATE KEYWORDS
    //-----------
    // dbManagement.editArrayData(6000,14000,noNoWordsList,dbManagement._queryEditAndSaveKeywords)

     // EditArrayData
     // dbManagement.editArrayData(14200,14402,dbManagement._queryEditAndSaveInventoryQuantity)

     exports.dbManagement = dbManagement

})(typeof module === "object" ? module.exports : window);

