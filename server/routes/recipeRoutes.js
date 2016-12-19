var express = require('express')
var Router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

//route for homepage which returns recent recipes
Router.get('/', function(req,res) {
  db.recipeFunctions.findRecentRecipes()
  .then((recipes) => {
    console.log(recipes)
    res.send(recipes)
  })
  .catch((err) => {
    res.send(err)
  })
})



//route to add a new recipe to the DB
Router.post(':userName/add_recipe', function(req, res) {
  var username = req.params.userName
  db.recipeFunctions.addNewRecipe(username, req.recipe)
  .then((recipe) => {
  	res.send(recipe);
  })
  .catch((err) => {
  	res.send(err);
  })
})

//route to return a single recipe
Router.get('/:recipeId/recipe', function(req, res){
  var recipeId = req.params.recipeId
 db.recipeFunctions.findRecipeById(recipeId)
 .then((recipe) => {
    res.send(recipe);
  })
  .catch((err) => {
    res.send(err);
  })
})

//NEEDS TEST
//route to save a recipe to a user's saved recipes object
Router.get('/save', function(req, res){
  var recipeId = req.data.recipe._id
  var userId = req.data.user._id
  db.userFunctions.saveRecipe(userId, recipeId)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.send(err);
  })
}) 



module.exports = Router
