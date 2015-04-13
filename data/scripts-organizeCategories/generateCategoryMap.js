
var categoryMap = MRCategoryMap;
var 

function returnCategoryTree(value, categoryMap){
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

	return categoryTree.reverse();
}


totalSet.forEach(function(listing){
	listing.categoryTreeByNumber = [];
	listing.categoryTreeByName = []

	
	listing.categoriesByNumber.forEach(function(category){
		var categoryTree = returnCategoryTree(category,MRCategories)
		categoryTree.forEach(function(catNumber){
			listing.categoryTreeByNumber.push(catNumber)
			listing.categoryTreeByName.push(categoryMap[catNumber])
		})
		
	})
})

console.log(totalSet)

$('body').html(JSON.stringify(totalSet))

//console.log(totalSet)
