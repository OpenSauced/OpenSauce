const recipeModel = require('../models/recipe.js');
const userFunctions = require('./userFunctions.js');
const axios = require('axios');
const scrapeIt = require('scrape-it');

const xPorts = {};

xPorts.lookUpRecipeByUrl = function(url) {
    console.log("in look lookUpRecipeByUrl")
    return recipeModel.findOne({ url: url })
        .populate('creator')
        .then((recipe) => {
            return recipe
        })
}

///////////////////////////////////////////////////////////
/////                                                 /////
/////     supported site scraping functions           /////
/////                                                 /////
///////////////////////////////////////////////////////////

xPorts.scrapeRecipe = function(url) {
    console.log("in scrape function ", url)
    if (!url.includes('epicurious') && !url.includes('foodnetwork') && !url.includes('allrecipes')) {
        return Promise.reject("Sorry! We don't support that site")
    } else if (url.includes('epicurious') && url.includes('/recipes/')) {
        return xPorts.scrapeEpicurious(url)
    } else if (url.indexOf('foodnetwork') !== -1) {
        return xPorts.scrapeFoodNetwork(url)
    } else if (url.includes('allrecipes') && url.includes('/recipe/')) {
        return xPorts.scrapeAllRecipes(url)
    } 
    else {
        return Promise.reject('There wasn\'t a recipe for us to scrape on that link. Try a different link.')
    }

}

//parse the html and return a recipe object
// that is returned from a get request to epicurious

xPorts.scrapeEpicurious = function(url) {
    console.log("in scrape epic ", url)
    return scrapeIt(url, {
            title: 'div.title-source h1',
            ingredients: {
                listItem: 'li.ingredient'
            },
            directions: {
                listItem: 'li.preparation-step'
            },
            description: 'div.dek p',
             
            recipe_images: {
                selector:'picture.photo-wrap source',
                attr: 'srcset'
            }
        })
        .catch((err) => {
            throw new Error('Sorry, we experienced an error trying to get you that recipe. Please try a different link.')
        })
        .then(recipeObj => {
            var directions = recipeObj.directions.join(' ');
            recipeObj.directions = directions;
            recipeObj.recipe_images = {public_url: recipeObj.recipe_images}
            recipeObj.credit = 'Epicurious'
            return recipeObj
        })
        
}

//////////////////////////////
///   Food Network Parser  ///
//////////////////////////////
xPorts.scrapeFoodNetwork = function(url) {
    return scrapeIt(url, {
            title: "head title",
            ingredients: {
                listItem: 'div.ingredients ul li'
            },
            directions: {
                listItem: 'ul.recipe-directions-list li'
            },
            recipe_images: {
                selector:'section.single-photo-recipe a img',
                attr: 'src'
            }
        })
        .catch((err) => {
            throw new Error('Sorry, we experienced an error trying to get you that recipe. Please try a different link.')
        })
        .then(recipeObj => {
            if (recipeObj.ingredients.length < 1){
                return Promise.reject('There wasn\'t a recipe for us to scrape on that link. Try a different link.')
            } else {
            console.log(recipeObj)
            let directions = recipeObj.directions.join(' ');
            let title = recipeObj.title
            recipeObj.directions = directions
            recipeObj.title = xPorts.parseFoodNetworkTitle(title)
            recipeObj.recipe_images = {public_url: recipeObj.recipe_images}
            recipeObj.credit = 'Food Network'
            return recipeObj
        }
    })
};

//foodNetwork scraper produces a title like this : 
     // 'Buffalo Wings Recipe : Alton Brown : Food Network'
// funciton parses out 'Recipe' and 'Food Network' and adds author if there is one 
xPorts.parseFoodNetworkTitle = (titleString) => {
  // remove colons and spaces around colons
  let newTitleArray = titleString.split(' : ').slice(0,-1)
  // remove 'Recipe from title'
  let titleMinusRecipe = newTitleArray[0].slice(0,newTitleArray[0].indexOf(' Recipe'))
  
  //this is the final recipe title
  let newTitle = ''
  // ['title','author','Food NetWork']
  newTitleArray.length > 1
    // ----------------  'title'  + ' by ' + 'author' 
    ? newTitle = titleMinusRecipe + ' by ' + newTitleArray[1]
    //  or just 'title'
    : newTitle = titleMinusRecipe
  
  return newTitle
}

/////////////////////////////////
///  AllRecipes.com Scraper  ////
///// ///////////////////////////
xPorts.scrapeAllRecipes = function(url) {
    return scrapeIt(url, {
            title: 'h1.recipe-summary__h1',
            ingredients: {
                listItem: 'span.recipe-ingred_txt'
            },
            directions: {
                listItem: 'span.recipe-directions__list--item'
            },
            description: 'div.submitter__description',
            recipe_images: {
                selector:'span.hero-photo__image img',
                attr: 'src'
            }
        })
        .catch((err) => {
            throw new Error('Sorry, we experienced an error trying to get you that recipe. Please try a different link.')
        })
        .then(recipeObj => {
            for (var i = 0; i < recipeObj.ingredients.length; i++) {
                if (recipeObj.ingredients[i] === 'Add all ingredients to list') {
                    var ingredients = []
                    ingredients = recipeObj.ingredients.slice(0, i)
                    recipeObj.ingredients = ingredients;
                    recipeObj.credit = 'All Recipes'

                    break
                }
            }

            for (var i = 0; i < recipeObj.directions.length; i++) {
                if (typeof recipeObj.directions[i] === 'object') {
                    var directions = []
                    directions = recipeObj.directions.slice(0, i)
                    recipeObj.directions = directions.join(' ');
                    break
                }
            }
            recipeObj.recipe_images = {public_url: recipeObj.recipe_images}
            console.log(recipeObj)
            return recipeObj;

        })
}

module.exports = xPorts;

// DON't DELETE -
//  - Todo: work on dynamic way to match domain name with function name
//    Example: getSiteName(https://www.google.com) 
//        ==> return google 
//        ==> getFunctionName(google) 
//        ==> calls scrapeGoogle()

//  xPorts.parseSiteNameFromUrl = function (url) {
//    // if statement to see if there is anything before the sitename
//    // http://www OR https://www OR www will all be followed by
//    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^\/:]+)/i);
//    if ( match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
//     return match[2];
//    }
//    else {
//        return null;
//    }

//  }