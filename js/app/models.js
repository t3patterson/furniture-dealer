;(function(exports) {

    Parse.FurnitureItem = Parse.Object.extend({
            className: "mrInventory",

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
    
    exports.Parse.FurnitureItem = Parse.FurnitureItem
    exports.Parse.FurnitureItemGroup = Parse.FurnitureItemGroup 
    exports.Parse.FurnitureItemSandbox = Parse.FurnitureItemSandbox
    exports.Parse.TemporaryPhotosForEdit = Parse.TemporaryPhotosForEdit

})(typeof module === "object" ? module.exports : window);

