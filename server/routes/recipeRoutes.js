var express = require('express')
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

//route for homepage which returns recent recipes
router.get('/', function(req,res) {
  var term = req.query.term
  if (req.query.term) {
    db.recipeFunctions.searchRecipes(term)
    .then((recipes) => {
      res.send(recipes)
    })
    .catch((err) => {
      res.send(err)
    })
  } else {
    db.recipeFunctions.findRecentRecipes()
    .then((recipes) => {
      res.send(recipes)
    })
    .catch((err) => {
      res.send(err)
    })
  }
})

//saves a recipe to the DB
router.post('/:username/addrecipe', function(req, res) {
  var username = req.params.username

  db.recipeFunctions.addNewRecipe(username, req.body)
  .catch((err) => {
    console.log("THE ERROR. DUN DUN DUUUUUN ", err)
    res.send(500, err);
  })
  .then((recipe) => {
  	res.send(recipe);
  })
})

//route to return a single recipe
router.get('/:recipeId', function(req, res){
  var recipeId = req.params.recipeId
 db.recipeFunctions.findRecipeById(recipeId)
   .catch((err) => {
    res.send(err);
  })
 .then((recipe) => {
    res.send(recipe);
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
    res.send(500, err);
  })
})

//go grab a recipe from a url 
  //save it to the DB
  //send recipe object back to client
//if invalid website or no recipe is scraped
  //it sends back and error
router.post('/scraperecipe', function(req, res){
  var url = req.body.url
  var username = req.body.username
  return db.scraperFunctions.lookUpRecipeByUrl(url)
  .then((recipe) => {
    if (recipe === null){
      if(db.scraperFunctions.scrapeRecipe(url) === 'getting current data?') {
          res.sendStatus(500)
        }
      return db.scraperFunctions.scrapeRecipe(url)
      .then((recipe) => {
        recipe.url = url
        return db.recipeFunctions.addNewRecipe(username, recipe)
      })
      .catch((err) => {
        res.send(500, err);
      })
      .then((recipe) => {
        if(recipe.message === 'recipes validation failed'){
          res.send(500)
        } else {
        recipe.alreadyExists = false
        res.send(recipe)
      }
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
  res.send(500);
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
