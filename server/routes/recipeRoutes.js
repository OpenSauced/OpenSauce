var express = require('express')
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

//route for homepage which returns recent recipes
router.get('/', function(req,res) {
  db.recipeFunctions.findRecentRecipes()
  .then((recipes) => {
    res.send(recipes)
  })
  .catch((err) => {
    res.send(err)
  })
})

//saves a recipe to the DB
router.post('/:username/addrecipe', function(req, res) {
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
router.get('/:recipeId', function(req, res){
  var recipeId = req.params.recipeId
 db.recipeFunctions.findRecipeById(recipeId)
 .then((recipe) => {
    res.send(recipe);
  })
  .catch((err) => {
    res.send(err);
  })
})

//save a forked recipe
router.post('/:username/saveforkedrecipe', function(req, res){
var username = req.params.username
  db.recipeFunctions.saveForkedRecipe(username, req.body.recipe, req.body.parentId)
  .then((recipe) => {
    res.send(recipe);
  })
  .catch((err) => {
    res.send(err);
  })
})

//go grab a recipe from a url (only works for epicurious currently) 
//save it to the DB
//send recipe object back to client
router.post('/scraperecipe', function(req, res){
  var url = req.body.url
  var username = req.body.username
  return db.recipeFunctions.getRecipefromUrl(url)
  .then((recipe) => {
    return db.recipeFunctions.addNewRecipe(username, recipe)
  })
  .then((recipe) => {
    res.send(recipe)
  })
  .catch((err) => {
    res.send(err);
  })
})

module.exports = router
