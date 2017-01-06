var express = require('express')
const multer = require('multer'); // Node.js middleware for handling `multipart/form-data`
const upload = multer({ dest: 'TempUpload/' }); // set temp location of new files
const cloudinary = require('cloudinary');
const authRoutes = require('./authRoutes.js')
const path = require('path');
const fs = require('fs')
var router = express.Router()
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
    var skip = req.query.skip
    var limit = req.query.limit
    console.log('  query_skip:  ', skip, 'query_limit ', limit)
    db.recipeFunctions.findRecentRecipes(limit)
    .then((recipes) => {
      res.send(recipes)
    })
    .catch((err) => {
      res.send(err)
    })
  }
})

router.get('/:username/userrecipes', function(req, res) {
  var username = req.params.username
   db.recipeFunctions.findRecipesByUserName(username)
  .then((recipes) => {
    res.send(recipes);
  })
  .catch((err) => {
    res.send(err);
  })
})


//saves a recipe to the DB
router.post('/:username/addrecipe', authRoutes.ensureAuthenticated, upload.single('images'), function(req, res) {
  var username = req.params.username
  // console.log('Body: ', req.body);
  // console.log('Files: ', req.file);
  db.recipeFunctions.addNewRecipe(username, req.body, req.file)
  .catch((err) => {
    console.log("THE ERROR. DUN DUN DUUUUUN ", err)
    res.send(500, err);
  })
  .then((recipe) => {
    // checks to see if req.file is empty
    if (req.file !== undefined) {
      // upload to cloudinary
      cloudinary.uploader.upload(req.file.path, (result) => {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error on image delete:', err);
          } else {
            // adds the photo to the recipe in the database
            db.recipeFunctions.addPhotoUrl(recipe._id, result)
            .then(function(recipeDB) {
              // dont do anything? getting current data?
            })
          }
        });
      });
    }
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
  db.scraperFunctions.lookUpRecipeByUrl(url)
  .then((recipe) => {
    if (recipe === null) {
      db.scraperFunctions.scrapeRecipe(url)
      .catch((err) => {
        throw new Error(err)
      })
      .then((scrapedRecipe) => {
        scrapedRecipe.url = url
        return db.recipeFunctions.addNewRecipe(username, scrapedRecipe)
        .catch((err) => {
          res.send(500, 'something went very wrong in the save recipe route');
        })
        .then((recipeObj) => {
          res.send(200, recipeObj._id)
        })
      })
      .catch((err) => {
    res.send(500, err)
  })
    } else if (recipe !== null) {
      res.status(200).send(recipe._id)
    }
  })
  .catch((err) => {
    res.send(500, err)
  })
})

module.exports = router
