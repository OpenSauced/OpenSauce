var express = require('express')
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')


// add middleware that is specific to this router here:


//route for messages homepage
router.get('/', function(req,res) {
  res.send('You have reached /recipes/ ')
})

//route for a specific user profile /user_name/profile
router.get('/:userName', function(req, res) {
  console.log(req.params.userName);
  dummyDB.getRecipes(req.params.userName)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err);
  })
})

//route to add a new recipe to the DB
router.post(':userName/add_recipe', function(req, res) {
  var username = req.params.userName
  db.recipeFunctions.addNewRecipe(username, req.recipe)
  .then((recipe) => {
  	res.send(recipe);
  })
  .catch((err) => {
  	res.send(err);
  })
})

module.exports = router
