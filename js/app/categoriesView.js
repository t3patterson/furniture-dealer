;(function(exports) {

    Parse.Router = Parse.Router.extend({
        categoriesView_loadCategoriesPage: function(){
            this.pageLayout_checkNavBar()
            window.scrollTo(0,0)

            var data = {
                categoryLabels: MRCategoryLabels,
                categoryMap: MRCategoryMap
            }

            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();

            this.categoriesView.collection = data
            this.categoriesView.render()
        },

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
    
    exports.Parse.Router = Parse.Router
    exports.Parse.CategoriesView = Parse.CategoriesView


})(typeof module === "object" ? module.exports : window);

