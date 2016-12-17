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


//route for a specific user profile /user_name/profile
// router.get('/:userName', function(req, res) {
//   console.log(req.params.userName);
//   dummyDB.getRecipes(req.params.userName)
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.send(err);
//   })
// })

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

//takes a boolean (true=liked, false=unliked)
//increases or decreases a recipe's like count
// route.put('api/:userName/like', function(req, res){

// })

module.exports = Router
