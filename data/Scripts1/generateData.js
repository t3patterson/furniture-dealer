function MetroRetroTranslator(metroRetroDataArray) {

var MetroRetroItemObject = function(){
      this.MR_id= "",
      this.item= "",
      this.price= "",
      this.categories= "",
      this.inventoryStatus= ""

   }

   var arrayOfMetroRetroItems = []

   metroRetroDataArray.forEach(function(object){
      var relevantDataArray = object['Cell'].map(function(dataCell){
         return dataCell['Data']['#text']
      })

      var metroRetroItem = new MetroRetroItemObject()

      var i = 0

      for (var key in metroRetroItem ){

         metroRetroItem[key] = relevantDataArray[i]
         i++
      }

      arrayOfMetroRetroItems.push(metroRetroItem)
   })

return arrayOfMetroRetroItems
}

console.log(categoryMap)

var organizedData = MetroRetroTranslator(dataSet)

organizedData.forEach(function(dataObj){
    var catArray=dataObj.categories.split(",")
    catArray.pop();
    catArray.shift();

    var categoriesByName = []
    catArray.forEach(function(catIndex){
        if(!categoryMap[catIndex]){console.log(catIndex)}
        categoriesByName.push(categoryMap[catIndex])
    })

    dataObj.categoriesByNumber = catArray;
    dataObj.categoriesByName = categoriesByName
})

document.querySelector('body').innerHTML = JSON.stringify(organizedData)

