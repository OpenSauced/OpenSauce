var express = require('express')
var Router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')


// add middleware that is specific to this router here:


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

Router.get('/save', function(req, res){
  var recipeId = req.data.recipe._id
  var userId = req.data.user._id
  db.recipeFunctions.saveRecipe(userId, recipeId)
  .then((recipe) => {
    res.send(recipe);
  })
  .catch((err) => {
    res.send(err);
  })
})

//takes a boolean (true=liked, false=unliked)
//increases or decreases a recipe's like count
// route.put('api/:userName/like', function(req, res){

// })

module.exports = Router
