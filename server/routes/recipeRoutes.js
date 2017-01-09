const express = require('express');
const multer = require('multer'); // Node.js middleware for handling `multipart/form-data`
const upload = multer({ dest: 'TempUpload/' }); // set temp location of new files
const cloudinary = require('cloudinary');
const authRoutes = require('./authRoutes.js');
const path = require('path');
const fs = require('fs');
const config = require('../env/config');
const router = express.Router();
const db = require('../db/db.js');

cloudinary.config(config.cloudConfig);

//route for homepage which returns recent recipes
router.get('/', function(req, res) {
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
router.post('/:_id/addrecipe', authRoutes.ensureAuthenticated, upload.single('images'), function(req, res) {
    var userId = req.params._id
    var response = null

    try {
        if(req.body.title === null || req.body.title === undefined || req.body.title === ''){
            throw new Error('Please enter a title for the recipe')
        }
        if(req.body.description === null || req.body.description === undefined || req.body.description ===  ''){
            throw new Error('Please enter a description for the recipe')
        }
        if(req.body.directions === null || req.body.directions === undefined || req.body.directions === ''){
            throw new Error('Please enter a directions for the recipe')        
        }
        if(req.body.ingredients === null || req.body.ingredients === undefined){
            throw new Error('Please enter at least one ingredient for the recipe')
        }
        if(userId === null || userId === undefined){
            throw new Error('Sorry. We encountered a problem trying to add your recipe because we couldn\'t find your username. Please try again later.')
        }
    }
    catch(err){
        console.log("here", err)
        res.status(500).send(err.message)
    }

    db.recipeFunctions.addNewRecipe(userId, req.body)
        .then((recipe) => {
            response = recipe
            return db.userFunctions.addRecipeToMyRecipes(userId, recipe._id)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
        .then((user) => {
        // checks to see if req.file is empty
          if (req.file !== undefined) {
            // upload to cloudinary
            cloudinary.uploader.upload(req.file.path, (result) => {
              fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.error('Error on image delete:', err);
                } else {
                  // adds the photo to the recipe in the database
                  db.recipeFunctions.addPhotoUrl(response._id, result)
                  .then(function(recipeDB) {
                    res.send(recipeDB)
                  })
                }
              });
            });
          } else {
            res.send(response);
          }
        })
        .catch((err) => {
            res.status(500).send(err)
        })

})

router.post('/:_id/editrecipe/', authRoutes.ensureAuthenticated, function(req, res) {
  var recipeId = req.params._id
  console.log('recipeId: ', recipeId)
  console.log('req.body', req.body)
  db.recipeFunctions.editRecipe(recipeId, req.body)
  .then((recipe) => {
    console.log('recipe in recipe routes:', recipe)
    res.send(recipe)
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
})

//route to return a single recipe
router.get('/:recipeId', function(req, res) {
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
router.post('/:username/saveforkedrecipe', function(req, res) {
    var username = req.params.username
    db.recipeFunctions.saveForkedRecipe(username, req.body.recipe, req.body.parentId)
        .then((recipe) => {
            res.send(recipe);
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })
})

//go grab a recipe from a url 
//save it to the DB
//send recipe object back to client
//if invalid website or no recipe is scraped
//it sends back and error
router.post('/scraperecipe', function(req, res) {
    var url = req.body.url
    var userId = req.body.userId
    recipeResponse = null
    db.scraperFunctions.lookUpRecipeByUrl(url)
        .then((recipe) => {
            if (recipe === null) {
                db.scraperFunctions.scrapeRecipe(url)
                    .catch((err) => {
                        throw new Error(err)
                    })
                    .then((scrapedRecipe) => {
                        scrapedRecipe.url = url
                        return db.recipeFunctions.addNewRecipe(userId, scrapedRecipe)
                            .catch((err) => {
                                res.status(500).send(err.message)
                            })
                            .then((recipeObj) => {
                                recipeResponse = recipeObj
                                return db.userFunctions.addRecipeToMyRecipes(userId, recipeObj._id)
                            })
                            .then((user) => {
                                res.send(200, recipeResponse._id)
                            })
                    })
                    .catch((err) => {
                        res.status(500).send(err.message)
                    })
            } else if (recipe !== null) {
                var statusObj = {
                    recipeId: recipe._id,
                    saved: true
                }
                console.log('bold assumption', recipe)
                res.status(200).send(statusObj)
            }
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })
})

module.exports = router
