;(function(exports) {
    "use strict";

    //-------------------
    //---Helper Functions
    //-------------------
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

    //----------------------------
    //1) Put from image-scrape into **organizedMR_IDImagesArray** 
    // Create an array of objects with:
    //     * MRID 
    //     * Images array

    var highINDEX = 8000,
        lowINDEX = 8000

    if(typeof jpegDataArray !== 'undefined'){
        var filteredArray = jpegDataArray
            .filter(function(dataObj) {
                return parseInt(dataObj.MR_id.substr(2)) >= lowINDEX && parseInt(dataObj.MR_id.substr(2)) <= highINDEX;
            }).map(function(dataObj) {
                dataObj['MR_id'] = dataObj['MR_id'].substr(2)
                return [dataObj['MR_id'], dataObj['images-src']];
            });

        var testArray = []
            filteredArray.forEach(function(element) {
            if (testArray.indexOf(element[0]) === -1) {
                testArray.push(element[0]);
            }
        })

        function NewDataObject(x, y) {
            this.MR_id = x;
            this.images = y;
        }

        var organizedMR_IDImagesArray = []

        testArray.forEach(function(mr_id) {
            var images = [];
            filteredArray.forEach(function(elements) {
                if (elements[0] === mr_id) {
                    images.push(elements[1])
                }
            });

            var newDataObj = new NewDataObject(mr_id, images);

            organizedMR_IDImagesArray.push(newDataObj);
        })
    }

    //----------------------
    //2 Put data from 'product-info' scrape into
    
    function MR_IdProductInfoObject(mrId, options){
        this.MR_id = mrId|| null;
        this.manufacturer = options.manufacturer || null;
        this.designer = options.designer || null;
        this.description =  options.description || null;
        this.dimensions = options.dimensions || null;
        this.condition = options.condition || null;
    }
    if(typeof productInfo !== 'undefined'){
        var organizedProductInfoArray = productInfo.map(function(dataObj){
            var productInfoOptions = {}
            
            var i = 1;
            for(i ; i <= 5 ; i++){

                var fieldName = dataObj['field-'+i+'-label-src'];
                if (!fieldName){
                    continue
                } else if (fieldName.match(/descript.jpg/)){
                    productInfoOptions.description = dataObj['field-'+i+'-value'];
                } else if (fieldName.match(/designer.jpg/)){
                    productInfoOptions.designer = dataObj['field-'+i+'-value'];
                } else if (fieldName.match(/dims.jpg/)){
                    productInfoOptions.dimensions = dataObj['field-'+i+'-value'];
                } else if (fieldName.match(/condit.jpg/)){
                    productInfoOptions.condition = dataObj['field-'+i+'-value'];
                } else if (fieldName.match(/manufac.jpg/)){
                    productInfoOptions.manufacturer = dataObj['field-'+i+'-value'];
                }
            }

            //note: takes off 'MR' on MR-id
            if(dataObj.MR_id){ 
                var mrID = dataObj.MR_id.substr(2)} 
                else{ var mrID = null }
            var returnObject = new MR_IdProductInfoObject(mrID, productInfoOptions)
            return returnObject

        })
    }


    //3) filter 'total set' with high/low MR_id's...add 
    //   images & product-info
    if(typeof totalSet !== 'undefined'){
        var modifiedDataSet = totalSet
            .filter(function(dataObj) {
                return parseInt(dataObj.MR_id) >= lowINDEX && parseInt(dataObj.MR_id) <= highINDEX;
            })
            //add properties to totalSet:
            //    the img-links will be added as propereties (ex: 'database_img_X')
            //    the `imageCount` will be added as a property (max: 8 images)
            .map(function(filteredItem) {
                //add images
                organizedMR_IDImagesArray.forEach(function(itemWithImages) {
                    if (itemWithImages.MR_id === filteredItem.MR_id) {
                        var imgCount;
                        itemWithImages.images.forEach(function(thumbnailImage, i) {
                            if (i + 1 <= 8) {
                                //thumbNailImage = 'http://www.metroretrofurniture.com/images/Buffet/ace82thomasvillebuffet06_t.jpg'
                                filteredItem["database_img_LINK_t_" + (i + 1)] = thumbnailImage;

                                if(thumbnailImage && thumbnailImage.indexOf('_t')>-1){
                                    var thumbNailLink = thumbnailImage;
                                    var locate_t = thumbNailLink.indexOf('_t');
                                    var fullSizeLink = thumbNailLink.slice(0,locate_t) + thumbNailLink.substr(locate_t+2)
                                    filteredItem["database_img_LINK_" + (i + 1)] = fullSizeLink;
                                }
                                
                            }
                            imgCount = i + 1
                        })
                        filteredItem['imageCount'] = imgCount
                    }
                })
                //add product-info
                organizedProductInfoArray.forEach(function(productInfo){
                    if (productInfo.MR_id === filteredItem.MR_id){
                     _.extend(filteredItem, productInfo) }
                })



                //convert categories to proper formats
                //convert price to a number & priceDollar to a comma-separated string
                delete filteredItem.categories;
                filteredItem.MR_id = parseInt(filteredItem.MR_id)
                filteredItem.price = parseInt(filteredItem.price);
                filteredItem.priceDollar = "$" + numberCommaSeparated(filteredItem.price);
                return filteredItem
            })
    }


    exports.dataArrayToUpload = modifiedDataSet;

    

    // $('body').html(JSON.stringify(modifiedDataSet))

})(typeof module === "object" ? module.exports : window);
