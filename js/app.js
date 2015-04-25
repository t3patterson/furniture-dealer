window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // uncomment the following line to cache CSS/JS files loaded by loader in localStorage
    // NOTE: you may need to turn this off while developing
    // loader.textInjection = true;

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/lodash.min.js"},

        // when using just Backbone, use this line
        // {url: "./bower_components/backbone/backbone.js"},
        // when using Parse, comment out the above line and uncomment the line below
        {url: "./bower_components/parse-js-sdk/lib/parse.min.js"},

        // when using React (and the plugin JSnoX), uncomment the following two lines
        // {url: "./bower_components/react/react.min.js"},
        // {url: "./bower_components/jsnox/jsnox.js"},

        // other stuff
        // -------------
        // bootstrap carousel
        {url: "./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js"},
        {url: "./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js"},

        {url: "./bower_components/pace/pace.min.js"},
        {url: "./js/TemplateView.js"}

        //my app
        //
        ,{url: "./js/utility/utilityFunctions.js"}

        ,{url: "./js/app/models.js"}

        ,{url: "./js/app/adminView.js"}
        ,{url: "./js/app/categoriesView.js"}
        ,{url: "./js/app/cartView.js"}
        ,{url: "./js/app/employeeViews.js"}
        ,{url: "./js/app/homeView.js"}
        ,{url: "./js/app/miscViews.js"}
        ,{url: "./js/app/multiView.js"}
        ,{url: "./js/app/pageLayoutElements.js"}
        ,{url: "./js/app/singleView.js"}



        ,{url: "./js/Client.js"}
        
        //DATA SCRIPTS
        // ,{url: "./data/INPUT-totalSet.js"}
        // ,{url: "./data/INPUT-jpegData.js"}
        // ,{url: "./data/INPUT-productInfo.js"}
        // ,{url: "./data/EXECUTE-GenerateParseData.js"}
        ,{url: "./js/db/databaseFunctions.js"}

        ,{url: "./data/scripts-organizeCategories/categoryMap2.js"}
        ,{url: "./data/scripts-organizeCategories/allCategories.js"}


    ).then(function(){
        // if turning on JSnoX, uncommment the following line
        // window.d = jsnox(React);
        // if turning on React, uncomment the following line
        // React.initializeTouchEvents(true);
        document.querySelector("html").style.opacity = 1;

        // start app?
        Parse.initialize('8cefZxGY6FiSAhEw5YCwN9mBjgoiUgGcdJnTZgdy','RWjs5EKsDkBlZ1L05crkUetjonIG1DGNiaM664OY');

        // console.log(dataArrayToUpload)
        // dbManagement.uploadInventoryToParse(dataArrayToUpload)
        // dbManagement.editArrayData(4999,8000,dbManagement._queryEditAndSaveKeyWords)
        // dbManagement.editArrayData(8000,14405,dbManagement._queryEditAndSaveInventoryQuantity)

        // 
        //----------------
        // Start App
        //---------------
        var beginApp = new PageRouter();
    })

}