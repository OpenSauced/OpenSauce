//see user functions for example
const recipeModel = require('../models/recipe.js')
const userFunctions = require('./userFunctions.js')
const scraperFunctions = require('./scraperFunctions.js')
const axios = require('axios')
const scrapeIt = require('scrape-it')
const xPorts = {}

//returns the most recent 10 recipes
xPorts.findRecentRecipes = function() {
    return recipeModel.find()
    .sort( [['_id', -1]] )
}

//adds a new recipe to the DB
//calls addRecipeToMyRecipes to update 'my_recipes' in user document
xPorts.addNewRecipe = function(username, recipe) {
    console.log("in add new recipe function")
    return userFunctions.findByUserName(username)
        .then((userObj) => {
            return userObj
        })
        .catch((err) => {
            console.log("recipeFunctions 1 ", err)

        })
        .then((user) => {
            recipe.creator = user._id
            return new recipeModel(recipe)
                .save()
                .then((recipe) => {
                    userFunctions.addRecipeToMyRecipes(user._id, recipe._id)
                    return recipe;
                })
                .catch((err) => {
                    console.log("recipeFunctions 2 ", err)
                })
        })

}

//finds and returns one recipe based on recipe ID
xPorts.findRecipeById = function(recipeId) {
    return recipeModel.findOne({ _id: recipeId })
        .populate('creator')
        .exec((err, recipe) => {
            if (err) console.log("recipeFunctions 3: ", err);
        })

}


//takes a forked recipe from client and saves it to the DB
xPorts.saveForkedRecipe = function(username, recipe, parentId) {
    recipe.forked_parent = parentId
    return xPorts.addNewRecipe(username, recipe)
        .then((forkedRecipe) => {
            xPorts.addChildRecipe(parentId, forkedRecipe._id)
            return forkedRecipe
        })
        .catch((err) => {
            console.log("recipeFunctions 3 ", err)
        })
}

//adds a child (forked) recipe to a parent recipe
//called when a forked recipe is saved to the DB
xPorts.addChildRecipe = function(parentId, childId) {
    return recipeModel.findOneAndUpdate({ _id: parentId }, {
            $push: {
                'forked_children': childId
            }
        })
        .then((recipe) => {
            return recipe
        })
        .catch((err) => {
            console.log("error in recipeFunctions 4", err)
        })

}


module.exports = xPorts;


// xPorts.forkRecipe = function(username, recipeId){
//     return xPorts.findRecipeById(recipeId)
//     .then((recipe)=>{
//         console.log("ID___________", recipe._id)
//         var forkedRecipe = {
//             title: recipe.title,
//             ingredients: recipe.ingredients,
//             directions: recipe.directions,
//             forked_parent: recipe._id
//         }
//         return xPorts.addNewRecipe(username, forkedRecipe)
//     })
//     .catch((err) => {
//         console.log("recipeFunctions 3 ", err)
//     })
// }

//return a recipe object from a url
// xPorts.getRecipefromUrl = function(url) {
//     // CAN delete once scraper fns are implemeneted
//     return xPorts.fetchHtml(url)
//         .then((html) => {
//             if (url.indexOf('epicurious') !== -1) {
//                 return xPorts.parseEpicurious(html)
//             } else {
//                 throw err;
//             }
//         })
//         .catch((err) => {
//             console.log("error in recipeFunctions 5", err)
//         })
// }
// }
