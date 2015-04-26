    ;(function(exports) {

    Parse.Router = Parse.Router.extend({


        employee_loadEmployeeLogin: function() {pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.clearFooter();
            window.scrollTo(0,0)
            this.userLoginView.render();
        },

      
        employeeView_loadEnterNewItemForm: function() {

            console.log
            var data = {
                categoryLabels: MRCategoryLabels,
                categoryMap: MRCategoryMap
            }
            this.newItemFormView.collection = data
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0,0);
            this.newItemFormView.render()

        },

        employeeView_loadSearchItem:function(){
            this.pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0,0);
            this.searchItemView.render();
        },

        employeeView_loadEditExistingItemForm: function(mrId) {pageLayout_checkNavBar();
            this.pageLayout_clearBreadCrumb();
            this.pageLayout_clearPagination();
            this.pageLayout_clearFooter();
            window.scrollTo(0,0);

            var pQuery = new Parse.Query(Parse.FurnitureItem);
            pQuery.equalTo('MR_id',parseInt(mrId))
            
            pQuery.find().then(function(model){
                var retrievedModel = model[0]
                 self.editItemView.model = retrievedModel
                 self.editItemView.render();
            })           
        },

        employeeView_loadReorganizeImgs: function(){
            this.reorganizeImagesView.collection = {
                imageArray: [],
                imageTnArray: []
            }
            this.reorganizeImagesView.render();
        },

     })
    

    Parse.EmployeeLoginView = Parse.TemplateView.extend({
        view: 'user-login',
        el: '.wrapper'
    })

    Parse.EmployeeDashboardView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'employee-dashboard'
    })
    Parse.EmployeeEnterNewItemFormView = Parse.TemplateView.extend({
        view: 'enter-new-item',
        el: '.wrapper',
        events: {
            'click .generate-MR': 'queryDBForNewMR_id',
            'submit .new-item-form': 'submitItemToDB',
            'blur .top-level-category': 'handleTopLevelSelection',
            'blur .sub-category-1': 'handleSubCategory_1_Selection',
            'click .add-item-category': 'handleAddItemCategory'

        },

        handleAddItemCategory: function(evt){
            evt.preventDefault();
            var topLevelVal = $('.top-level-category').val(),
            subCat1Val = $('.sub-category-1').val(),
            subCat2Val = $('.sub-category-2').val()


            var newRow = $('<tr>')
            var newCell = $('<td>')


            var cell1 = $('<td>').addClass('top-level-entry active').text(MRCategoryLabels[topLevelVal]).attr('data-labelNum',topLevelVal),
            cell2 = $('<td>').addClass('sub-cat1-entry').text(MRCategoryLabels[subCat1Val]).attr('data-labelNum',subCat1Val),
            cell3 = $('<td>').addClass('sub-cat2-entry').text(MRCategoryLabels[subCat2Val]).attr('data-labelNum',subCat2Val)
            cell4 = $('<td>').addClass('remove-category').html('<i class="fa fa-times fa-2x"></i>')

            newRow.addClass('single-entry')
            newRow.append(cell1)
            newRow.append(cell2)
            newRow.append(cell3)
            newRow.append(cell4)

            console.log(newRow)
            $('.category-entries').append(newRow)

            $('.top-level-category').val('')
            $('.sub-category-1').val('')
            $('.sub-category-2').val('')
        },


        handleTopLevelSelection: function(evt){
            console.log(evt)
            var self = this;
            $('.sub-category-1').prop('disabled',false)//
            $('option.sub-category1-value').remove()
            $('.disabled-subcat1-option').prop('selected', true);

            var firstLevelCategory = $('.top-level-category').val()

            var subCategories = this.collection.categoryMap[firstLevelCategory];

            if(!subCategories){
                console.log('noSubCategories')
                $('.disabled-subcat1-option').text("--No subcategories for this option--")
                $('.sub-category-1').prop('disabled',true);

            } else {subCategories.forEach(function(subCategoryNum){
                $('.disabled-subcat1-option').text("--Select Sub-Category--")

                var subCategoryHTMLOptionEl = $('<option>');
                    subCategoryHTMLOptionEl
                        .val(subCategoryNum)
                        .addClass('sub-category1-value')
                        .text(self.collection.categoryLabels[subCategoryNum]+" - ("+subCategoryNum+")")
                    $('select.sub-category-1').append(subCategoryHTMLOptionEl)

                })
            }
        },

        handleSubCategory_1_Selection:function(evt){
            var self = this;
            console.log('<select> sub-cat-1 blurred')
            $('select.sub-category-2').prop('disabled',false)//
            $('option.sub-category2-value').remove()
            $('option.disabled-subcat2-option').prop('selected', true)

            var selectedSubCategory = $('select.sub-category-1').val();

            var subCategories = this.collection.categoryMap[selectedSubCategory];

            if(!subCategories){
                console.log('noSubCategories-2')
                $('.disabled-subcat2-option').text("--No subcategories for this option--");
                $('.sub-category-2').prop('disabled',true);
            
            } else {
                subCategories.forEach(function(subCategoryNum){
                
                $('.disabled-subcat2-option').text("--Select Sub-Category--")

                    var subCategoryHTMLOptionEl = $('<option>');

                    subCategoryHTMLOptionEl
                        .val(subCategoryNum)
                        .addClass('sub-category2-value')
                        .text(self.collection.categoryLabels[subCategoryNum]+" - ("+subCategoryNum+")")

                    $('select.sub-category-2').append(subCategoryHTMLOptionEl);
                    
                })
            }
        },

        queryDBForNewMR_id: function(evt) {
            evt.preventDefault()
            var self = this

            if (!this.queryMade) {
                console.log('input clicked..')
                var queryAllMRs = new Parse.Query(Parse.FurnitureItem);
                queryAllMRs.descending("MR_id");
                queryAllMRs.limit(5)
                queryAllMRs.find().then(function(results) {
                    console.log(results)
                    var highestID = results[0].get('MR_id');
                    var newItemMR_id = highestID + 1;
                    document.querySelector('.MR-ID-display').innerHTML = newItemMR_id
                })
            }
        },

        submitItemToDB: function(evt) {
            evt.preventDefault()

                var $newMrId = $('.MR-ID-display'),
                    $newItemName = $('.new-item-name'),
                    $newItemPrice = ($('.new-item-price')),
                    $newItemDesc = $('.new-item-desc'),
                    $newItemCondition = $('.new-item-condition'),
                    $newItemDesigner = $('.new-item-designer'),
                    $newItemDimensions = $('.new-item-dimensions'),
                    $newItemManufacturer = $('.new-item-manufacturer'),
                    $topLevelCategory = $('.top-level-category'),
                    $subCategory_1 = $('.sub-category-1'),
                    $subCategory_2 = $('.sub-category-2'),
                    $newImgFile = $('.selected-img-file')

                //
                
                var categoryTreeByNumber= []
                if($topLevelCategory.find('option:selected').val()) { categoryTreeByNumber.push($topLevelCategory.find('option:selected').val()) }
                if($subCategory_1.find('option:selected').val()) {categoryTreeByNumber.push($subCategory_1.find('option:selected').val())}
                if($subCategory_2.find('option:selected').val()) {categoryTreeByNumber.push($subCategory_2.find('option:selected').val())}


                console.log(categoryTreeByNumber)
                var treeByName = categoryTreeByNumber.map(function(categoryNum){
                    return MRCategoryLabels[categoryNum]
                })

                var newFurnitureItemModel = new Parse.FurnitureItem({
                    MR_id: parseInt($newMrId.text()),
                    item: $newItemName.val(),
                    price: parseInt($newItemPrice.val()),
                    priceDollar: "$"+ utility_numberCommaSeparated( parseInt($newItemPrice.val()) ),
                    condition: $newItemCondition.val(),
                    description: $newItemDesc.val(),
                    designer: $newItemDesigner.val(),
                    dimensions: $newItemDimensions.val(),
                    manufacturer: $newItemManufacturer.val(),
                    categoryTreeByNumber: categoryTreeByNumber || "",
                    categoriesByNumber: [categoryTreeByNumber[categoryTreeByNumber.length-1]] || "",
                    categoryTreeByName: treeByName || "",
                    categoriesByName: [treeByName[treeByName.length-1]]|| "",
                    inventoryStatus: "1"
                })

                //Create a Parse.File and put the file from the DOM onto it
                var uploadedFiles = $newImgFile[0].files

                var counter = 1;
                var filesGroupArray = [];

                //iterate over all the properties of the uploaded files
                for (var file in uploadedFiles) {
                    //filter the iteration for over those properties that have their own 'size' property
                    //i.e. (only the files, not .length or other stuff on the prototype)
                    if (uploadedFiles[file].hasOwnProperty('size')) {
                        //put the files on a sub-array and then push them to a grouped array
                        var fileWithFileNameArray = []
                        fileWithFileNameArray.push($newMrId.text() + "-" + "photo" + counter); //push name
                        fileWithFileNameArray.push(uploadedFiles[file]); //push uploaded file
                        filesGroupArray.push(fileWithFileNameArray);
                        counter++;
                    }
                }

                //create load function that iterates over img-files and saves them to parse server
                var loadFiles = function(filesGroup, itemModel) {
                    console.log('loading files....')
                    var totalFiles = filesGroup.length;
                    
                    filesGroup.forEach(function(imgFile, filesIndex) {
                        var parseImgFile = new Parse.File(imgFile[0], imgFile[1]);
                        console.log(parseImgFile)
                    
                        parseImgFile.save()
                            .then(function(parseFile) {
                                console.log(parseFile)
                                var imgNameInDB = ("database_img_FILE_" + (filesIndex + 1))
                                itemModel.set(imgNameInDB, parseFile);
                                
                                if (filesIndex + 1 === filesGroup.length) {
                                    console.log(itemModel)
                                    itemModel.set("imageCount", filesGroup.length)
                                
                                    itemModel.save().then(function(result) {
                                        console.log(result)
                                    }).fail(function(error) {
                                        console.log(error)
                                    });
                                }
                            })

                    })
                }

                loadFiles(filesGroupArray, newFurnitureItemModel)




                //Clear out the form inputs

                $newMrId.text("");
                $newItemName.val("");
                $newItemDesc.val("");
                $newItemPrice.val("");
                $newItemCondition.val("");
                $newItemDesigner.val("");
                $newItemDimensions.val("");
                $newItemManufacturer.val("")


                //For Categories: Clear out the <option> in <select> top-level category and sub-category
                console.log($('option.sub-category1-value'));
                $('option.sub-category1-value').remove();
                $('option.sub-category2-value').remove();
                //For Categories: Select first 'disabled' default options
                $topLevelCategory.find('.disabled-top-level-option').text('--Select Category--').prop('selected',true);
                $subCategory_1.find('.disabled-subcat1-option').text('--Must Select Top-Level Category--').prop('selected',true).prop('disabled',true);
                $subCategory_2.find('.disabled-subcat2-option').text('--Must Select Sub-Category--').prop('selected',true).prop('disabled',true);

                //For ImageFiles: Clear the files stored in <input type="file" multiple>
                this._resetField($newImgFile)

                //remove styles
                $('.form-group').each(function() {
                    $(this).removeClass('has-success has-error')

                })
            // }
        },

        _resetField: function(el) {
            el.wrap('<form>').parent('form').trigger('reset');
            el.unwrap();
        },


        _validateFormUI: function() {
            var testFields = []

            var $newMrId = $('.MR-ID-display')
            var $newItemName = $('.new-item-name');
            var $newItemPrice = $('.new-item-price');
            var $newItemDesc = $('.new-item-desc');
            var $newImgFile = $('.selected-img-file');

            //check to see if MR-ID field has a value
            if (!$newMrId.text()) {
                $newMrId.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newMrId.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
            }

            //check to see if New Item field has a name
            if (!$newItemName.val()) {
                $newItemName.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newItemName.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

            }


            //Check to see if new item price 
            if (!$newItemPrice.val() || $newItemPrice.val().match(/[a-z]/i)) {
                console.log('price is not a number')
                $newItemPrice.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                console.log('price is a number')
                testFields.push(true)
                $newItemPrice.closest('.form-group').addClass('has-success').removeClass('has-error')
            }


            //Check to see if new item category has value
            // if (!$newItemCategory.val()) {
            //     $newItemCategory.closest('.form-group').addClass('has-error')
            //     testFields.push(false)

            // } else {
            //     $newItemCategory.closest('.form-group').addClass('has-success').removeClass('has-error')
            //     testFields.push(true)

            // }

            //check to see if new item cagegory has value
            if (!$newItemDesc.val()) {
                $newItemDesc.closest('.form-group').addClass('has-error')
                testFields.push(false)
            } else {
                $newItemDesc.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)

            }

            if ($newImgFile[0].files.length < 1) {
                console.log('there is no image file')
                $newImgFile.closest('.form-group').addClass('has-error');
                testFields.push(false);
            } else {
                console.log($newImgFile)
                console.log('it says there is an image file')
                $newImgFile.closest('.form-group').addClass('has-success').removeClass('has-error')
                testFields.push(true)
            }


            var validFormTest;
            testFields.indexOf(false) === -1 ? validFormTest = true : validFormTest = false

            return validFormTest
        }
    })
    
    Parse.EmployeeSearchExistingItemView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'search-existing-item',

        events: {
            "click .search-MR": "queryMRDatabase"
        },

        queryMRDatabase: function(evt){
            evt.preventDefault();
            var inputMR = parseInt($('.mr-search-input').val())

            window.location.hash = "/employee/edit-item/"+inputMR;
        }
    })

    Parse.EmployeeEditExistingItemView = Parse.TemplateView.extend({
        el: '.wrapper',
        view: 'edit-existing-item',

        initialize: function(){
            var query = new Parse.Query(Parse.TemporaryPhotosForEdit);
            query.find().then(function(data){
                var promises = []
                data.forEach(function(model){
                    promises.push(model.destroy())
                })
                return Parse.Promise.when(promises)
            })
        },

        events: {
            'change .selected-img-file': 'checkFile'
        },



        checkFile: function(e){
            console.log(e)
            if(e.target.files.length > 0){


                var theFile = e.target.files[0];
                var targetEl = $(e.target);
                var targetInput = $(e.target)
                var currntImgIndex = targetEl.attr('data-index');
                var parseFile = new Parse.File("tmpphoto", theFile)
                var imgReference = "temp_img_"+ currntImgIndex


                //check to see if there is an image the parse database, 
                //    if yes, then delete
                
                var savetheTempFilesAndChangeTheImage = function(){
                    parseFile.save().then(function(){
                        var tempImg = new Parse.TemporaryPhotosForEdit();
                        

                        tempImg.set("imageIndex", imgReference)
                        tempImg.set(imgReference, parseFile)

                        tempImg.save().then(function(data){
                            console.log(data)
                            var pQuery = new Parse.Query(Parse.TemporaryPhotosForEdit)
                            pQuery.equalTo('imageIndex',imgReference)
                            pQuery.find().then(function(file){
                                console.log(file)
                                var imgSrc = file[0].get('temp_img_'+currntImgIndex)._url
                                $('.sample-img-'+currntImgIndex).attr({'src':imgSrc, 'data-parsetemp':'true'})
                                
                                })

                            })

                    })
                }

                
                if($('.sample-img-'+currntImgIndex).attr('data-parsetemp')==='true' ) {
                    var parseQuery = new Parse.Query(Parse.TemporaryPhotosForEdit);
                    parseQuery.find()
                        .then(function(results){

                            var promises = []
                            results.forEach(function(model){
                                promises.push(model.destroy())
                            })
                            return Parse.Promise.when(promises)
                        
                        }).then(function(){
                        savetheTempFilesAndChangeTheImage()
                        })
                } else {
                    savetheTempFilesAndChangeTheImage();
                }

                //save the file & image to the database
               
            }
        }
    })

    Parse.EmployeeReorganizeImagesView = Parse.TemplateView.extend({
        view: 'fix-images',
        el: '.wrapper',

        events:{
            'click .get-mr-imgs': 'getImagesFromDB',
            'click .upload-imgs': 'saveImagesToDB',
            'click .select-image': 'handleSelected',
        },

        imgTotal: 0,
        imgCounter: 0,
        currentMR: null,



        getImagesFromDB:function(evt){
            var self = this
            evt.preventDefault();

            var mrValue = parseInt($('.mr-input').val());
            this.currentMR = mrValue;

            var pQuery = new Parse.Query(Parse.FurnitureItem)

            pQuery.equalTo('MR_id', mrValue)

            pQuery.find().then(function(data){
                console.log(data)
                var data = self.revisedModel = data[0]
                
                var imageArray = []
                var imageTnArray = []
                for (var key in data.attributes){
                    if(key.match(/database_img_LINK_[0-9]/)) {
                        imageArray.push(data.attributes[key])
                    }
                    if(key.match(/database_img_LINK_t_[0-9]/)) {
                        imageTnArray.push(data.attributes[key])
                    }
                }


                self.collection = {
                    imageTnArray: imageTnArray,
                    imageArray: imageArray
                }

                console.log(self)


                self.imgTotal = imageArray.length
                
                self.render()
                $('h3').html('MR-'+mrValue).attr('data-id',mrValue)
                })
            console.log('get clicked');
        },

        handleSelected: function(evt){
            console.log(evt.target)
            var imageSourceTN = $(evt.target).attr('src');
            var imageSourceREG = $(evt.target).attr('data-imgSrc')
            $(evt.target).parent().remove();

            this.imgCounter++

            $('.img-input-'+this.imgCounter).find('img').attr('src',imageSourceTN)
            $('.img-input-'+this.imgCounter).find('p').text(imageSourceREG)
            
            console.log(this.imgCounter + " | " + this.imgTotal)

            if(this.imgCounter > 0){
                console.log('image counter = image total')
                $('a.upload-imgs').removeAttr('disabled')
            }
        },

        saveImagesToDB: function(evt){
            evt.preventDefault();
            console.log('saved clicked');

            console.log(this.imgCounter)
            console.log(this.revisedModel)
            
            var i
            
            var uploadImages = {}
            var uploadThumbnails = {}
            
            for (i = 0; i < this.imgTotal; i++){
                var imgString = $('.img-input-'+(i+1)).find('p').text()
                console.log(imgString)

                var thumbnailImgString = (imgString) ? imgString.slice(0,imgString.indexOf('.jpg')) + '_t.jpg': "";
                console.log(thumbnailImgString)

                uploadImages['database_img_LINK_'+(i+1)] = imgString
                uploadThumbnails['database_img_LINK_t_'+(i+1)] = thumbnailImgString
               
            }

            console.log(uploadImages);
            console.log(uploadThumbnails);

            console.log(this.revisedModel)

         


            $.when(
                this.revisedModel.set(uploadImages),
                this.revisedModel.set(uploadThumbnails) )
                .then(function(model){
                    for (var key in model.attributes){
                        if(key.match(/database_img_LINK_[0-9]/)) {
                            if(!model.attributes[key]){
                                model.unset(key);
                                model.set('imageCount', model.get('imageCount')-1)
                            }

                        }

                        if(key.match(/database_img_LINK_t_[0-9]/)) {
                           if(!model.attributes[key]){model.unset(key)}
                        }

                    model.save()
                }


            })

            //Clear fields
            $('.listing-id').text('MR')
            $('.info-container').html('')
            $('.upload-imgs').attr('disabled',true)
            this.imgCounter = 0;
            this.imgTotal = 0;
            this.currentMR++
            $('input.mr-input').val(this.currentMR)

        }
    })
   

    exports.Parse.Router = Parse.Router
    exports.Parse.EmployeeEditExistingItemView =  Parse.EmployeeEditExistingItemView
    exports.Parse.EmployeeDashboardView = Parse.EmployeeDashboardView
    exports.Parse.EmployeeEnterNewItemFormView = Parse.EmployeeEnterNewItemFormView
    exports.Parse.EmployeeSearchExistingItemView = Parse.EmployeeSearchExistingItemView
    exports.Parse.EmployeeReorganizeImagesView = Parse.EmployeeReorganizeImagesView

})(typeof module === "object" ? module.exports : window);

