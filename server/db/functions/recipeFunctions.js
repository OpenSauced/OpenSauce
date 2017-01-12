//see user functions for example
const recipeModel = require('../models/recipe.js')
const userModel = require('../models/user.js')
const userFunctions = require('./userFunctions.js')
const scraperFunctions = require('./scraperFunctions.js')
const axios = require('axios')
const scrapeIt = require('scrape-it')
const xPorts = {}


//returns the most recent 10 recipes
xPorts.findRecentRecipes = function(offset) {
  if (!offset) {
    let offset = 0;
  }
  //find the last id of the most recent recipe and
  return recipeModel.find({
      title: { $ne: null },
      description: { $ne: null },
      ingredients: { $ne: null },
      creator: { $ne: null }
    })
    .sort([
      ['_id', -1]
    ])
    .skip(parseInt(offset))
    .limit(6)
    .populate('creator', 'username')
}

xPorts.editRecipe = function(recipeId, recipe){
   // console.log('editrecipe function --- recipe', recipe )
    return recipeModel.findOneAndUpdate({ _id: recipeId },
      {
        $set: {
          'title': recipe.title,
          'description': recipe.description,
          'ingredients': recipe.ingredients,
          'directions': recipe.directions
        }
      },
      {
        new: true
      }
    )
}

//adds a new recipe to the DB
xPorts.addNewRecipe = (userId, recipe) => {
    recipe.creator = userId
    if (typeof recipe.ingredients === 'string') {
        recipe.ingredients = JSON.parse(recipe.ingredients);
    }
    try {
        if(recipe.title === null || recipe.title === undefined || recipe.title === ''){
            throw new Error('Please enter a title for the recipe')
        }
        if(recipe.directions === null || recipe.directions === undefined || recipe.directions === ''){
            throw new Error('Please enter a directions for the recipe')
        }
        if(recipe.ingredients === null || recipe.ingredients === undefined){
            throw new Error('Please enter at least one ingredient for the recipe')
        }
        if(userId === null || userId === undefined){
            throw new Error('Sorry. We encountered a problem trying to add your recipe because we couldn\'t find your username. Please try again later.')
        }
    }
    catch(err){
        return Promise.reject(err)
    }
    return recipeModel.findOneAndUpdate(
                        {
                          title: recipe.title, 
                          creator: recipe.creator
                        }, 
                        recipe, 
                        {upsert: true, new: true}
                      )
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
    .populate('forked_children')
    .exec((err, recipe) => {
      if (err) console.log("recipeFunctions.findRecipeById ", err);
    })
}

//adds a child (forked) recipe to a parent recipe
//called when a forked recipe is saved to the DB
xPorts.addChildRecipe = function(parentId, childId) {
  return recipeModel.findOneAndUpdate({ _id: parentId }, {
    $push: {
      'forked_children': childId
    }})
}

//SEARCH RECIPES TODO POPULATE USER INFO
xPorts.searchRecipes = function(term, offset) {
  if (!offset) {
    let offset = 0;
  }
  return recipeModel
    .find(
      {
        title: { $ne: null },
        description: { $ne: null },
        ingredients: { $ne: null },
        creator: { $ne: null },
        $text: { $search: term }
      },
      { score: { $meta: "textScore" } }
    )
    .skip(parseInt(offset))
    .limit(6)
    .populate('creator', 'username')
    .sort(
      { score: { $meta: "textScore"} }
    )
}

//GET RECIPES PER USER
xPorts.findRecipesByUserName = function(username, offset) {
  if(!offset) {
    let offset = 0;
  }
  return userModel
    .findOne({username: username})
    .populate({path: 'my_recipes', options: {skip: parseInt(offset), sort: {_id: -1}, limit: 6}})
    .populate({
      path: 'saved_recipes',
      populate: {
        path: 'creator',
        select: 'username'
        }
    })
}

//takes in a string "dec" or "inc" to determine wether you should decrement or increment the like count!
//READ THE COMMENT ^
xPorts.decOrIncLikes = function(recipeId, decOrInc) {
  return xPorts.findRecipeById(recipeId).then(function(recipeDB) {
    if (recipeDB.likes === undefined || recipeDB.likes === null) {
      recipeDB.likes = 0
      recipeDB.save()
      return recipeDB
    }
    if (decOrInc === 'dec') {
      //check for greater than 0, redundancy check. DB spam maybe? dont want negative values.
      if (recipeDB.likes > 0) {
        recipeDB.likes = (recipeDB.likes - 1)
        recipeDB.save()
      }
    } else if (decOrInc === 'inc') {
      recipeDB.likes = (recipeDB.likes + 1)
      recipeDB.save()
    } else {
      throw new Error("you must specify a decrement or increment, use string values 'dec' or 'inc'!!!")
    }
  })
}

xPorts.findRecipesByUserId = function(userId) {
  return userModel
    .findOne({_id: userId}).populate('my_recipes saved_recipes')
}

module.exports = xPorts;
