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
        .sort([
            ['_id', -1]
        ])
}

//adds a new recipe to the DB
//calls addRecipeToMyRecipes to update 'my_recipes' in user document
xPorts.addNewRecipe = function(username, recipe) {
    console.log("in add new recipe")
    return userFunctions.findByUserName(username)
        .then((userObj) => {
            return xPorts.checkRecipeTitleRepeats(userObj, recipe.title)
        })
        .catch((err) => {
            console.log("recipeFunctions 1 ", err)
            throw err
        })
        .then((user) => {
            console.log("int the ekjehgsdb;then")
            recipe.creator = user._id
            return new recipeModel(recipe)
                .save()
                .then((recipe) => {
                    userFunctions.addRecipeToMyRecipes(user._id, recipe._id)
                    return recipe;
                })
                .catch((err) => {
                    console.log("recipeFunctions 1.1 ", err)
                    return err
                })
        })
        .catch((err) => {
            console.log("recipeFunctions 1.2 ", err)
            throw err
        })

}

//finds and returns one recipe based on recipe ID
xPorts.findRecipeById = function(recipeId) {
    return recipeModel.findOne({ _id: recipeId })
        .populate('creator')
        .exec((err, recipe) => {
            if (err) console.log("recipeFunctions 2: ", err);
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

//SEARCH RECIPES STUFF!!
xPorts.searchRecipes = function(term) {
  return recipeModel
    .find(
      { $text: { $search: term } },
      { score: { $meta: "textScore" } }
    )
    .sort( 
      { score: { $meta: "textScore"} }
    )
}

xPorts.checkRecipeTitleRepeats = function(user, recipeTitle) {
    console.log("checkRecipeTitleRepeats", recipeTitle)
    for (var i = 0; i < user.my_recipes.length; i++) {
        if (user.my_recipes[i].title === recipeTitle) {
            throw new Error()
        } 
    }
    return user
}

module.exports = xPorts;
