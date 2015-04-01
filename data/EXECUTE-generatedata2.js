;
(function(exports) {
    "use strict";

    //Create new Object with MRID & Images

    var highINDEX = 14402,
        lowINDEX = 12501


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




    var filteredArray = jpegDataArray
        .filter(function(dataObj) {
            return parseInt(dataObj.MR_id) >= lowINDEX && parseInt(dataObj.MR_id) <= highINDEX;
        })
        .map(function(dataObj) {
            return [dataObj['MR_id'], dataObj['images-src']];
        })

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

    var MR_IDWithImagesArray = []

    testArray.forEach(function(mr_id) {
        var images = [];
        filteredArray.forEach(function(elements) {
            if (elements[0] === mr_id) {
                images.push(elements[1])
            }
        });

        var newDataObj = new NewDataObject(mr_id, images);

        MR_IDWithImagesArray.push(newDataObj);
    })


    //Add images to MR_id

    var filteredDataSetWithImages = totalSet
        .filter(function(dataObj) {
            return parseInt(dataObj.MR_id) >= lowINDEX && parseInt(dataObj.MR_id) <= highINDEX;
        })
        .map(function(filteredItem) {
            MR_IDWithImagesArray.forEach(function(itemWithImages) {
                if (itemWithImages.MR_id === filteredItem.MR_id) {
                    var imgCount;
                    itemWithImages.images.forEach(function(theImage, i) {
                        if (i + 1 <= 8) {
                            filteredItem["database_img_" + (i + 1)] = theImage;
                        }
                        imgCount = i + 1
                    })
                    filteredItem['imageCount'] = imgCount
                }
            })
            return filteredItem
        })

    filteredDataSetWithImages.forEach(function(dataObj) {
        dataObj.price = parseInt(dataObj.price);
        dataObj.priceDollar = "$" + numberCommaSeparated(dataObj.price);
    })

    var modifiedDataSet = filteredDataSetWithImages



    exports.dataArrayToUpload = modifiedDataSet

})(typeof module === "object" ? module.exports : window);
