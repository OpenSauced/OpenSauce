//see user functions for example
const recipeModel = require('../models/recipe.js')
const userModel = require('../models/user.js')
const userFunctions = require('./userFunctions.js')
const scraperFunctions = require('./scraperFunctions.js')
const axios = require('axios')
const scrapeIt = require('scrape-it')
const xPorts = {}


//returns the most recent 10 recipes
xPorts.findRecentRecipes = function(currentLimit) {
  //find the last id of the most recent recipe and 
  return recipeModel.find()
    .sort([
      ['_id', -1]
    ])
    .populate('creator', 'username')
}

//adds a new recipe to the DB

xPorts.addNewRecipe = (userId, recipe) => {
    recipe.creator = userId
    if (typeof recipe.ingredients === 'string') {
        recipe.ingredients = JSON.parse(recipe.ingredients);
    }
    return recipeModel.findOneAndUpdate({title: recipe.title, creator: recipe.creator}, recipe, {upsert: true, new: true})
}

// Adds a single photo to the recipe that the user has uploaded
xPorts.addPhotoUrl = function(id, result) {
  //console.log('finding a recipe by id for image add: ', id);
  return xPorts.findRecipeById(id).then(function(recipeDB) {
    // console.log('Recipe from DB: ', recipeDB.recipe_images)
    // console.log(result)
    recipeDB.recipe_images.public_url = result.url
    recipeDB.recipe_images.secure_url = result.secure_url
    recipeDB.recipe_images.public_id = result.public_id
    recipeDB.recipe_images.signature = result.signature
    recipeDB.update();
    recipeDB.save();
    return recipeDB
  })
}

//finds and returns one recipe based on recipe ID
xPorts.findRecipeById = function(recipeId) {
  return recipeModel.findOne({ _id: recipeId })
    .populate('creator', 'username')
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
    }})
    .then((recipe) => {
      return recipe
    })
    .catch((err) => {
      console.log("error in recipeFunctions 4", err)
    })
}

//SEARCH RECIPES TODO POPULATE USER INFO
xPorts.searchRecipes = function(term) {
  return recipeModel
    .find(
      { $text: { $search: term } },
      { score: { $meta: "textScore" } }
    )
    .populate('creator', 'username')
    .sort( 
      { score: { $meta: "textScore"} }
    )
}

//GET RECIPES PER USER
xPorts.findRecipesByUserName = function(username) {
  return userModel.findOne({username: username}).populate('my_recipes').populate('saved_recipes')
}

module.exports = xPorts;
