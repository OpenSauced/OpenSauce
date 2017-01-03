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

router.get('/search', function(req, res){
  var term = req.query.term
  res.send(db.recipeFunctions.searchRecipes(term))

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
  return db.scraperFunctions.lookUpRecipeByUrl(url)
  .then((recipe) => {
    if (recipe === null){
      return db.scraperFunctions.scrapeRecipe(url)
      .then((recipe) => {
        recipe.url = url
        return db.recipeFunctions.addNewRecipe(username, recipe)
      })
      .catch((err) => {
        res.send(err);
      })
      .then((recipe) => {
        recipe.alreadyExists = false
        res.send(recipe)
      })
      .catch((err) => {
        res.send(err);
      })
    } else {
      recipe.alreadyExists = true
      res.send(recipe)
    }
  })
  .catch((err) => {
    res.send(err);
  })
})
   


// for previous Epicrious fn
  // return db.recipeFunctions.getRecipefromUrl(url)
  // .then((recipe) => {
  //   return db.recipeFunctions.addNewRecipe(username, recipe)
  // })
  // .then((recipe) => {
  //   res.send(recipe)
  // })
  // .catch((err) => {
  //   res.send(err);
  // })

// })

module.exports = router
