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
Router.post('/:username/addrecipe', function(req, res) {
  var username = req.params.username
  db.recipeFunctions.addNewRecipe(username, req.body)
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

//route to save a recipe to a user's saved recipes object
Router.post('/save', function(req, res){
  var recipeId = req.body.recipe._id
  var userId = req.body.user._id
  db.userFunctions.addRecipeToSavedRecipes(userId, recipeId)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.send(err);
  })
}) 



module.exports = Router
