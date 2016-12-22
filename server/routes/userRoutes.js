var express = require('express')
const cookieParser = require('cookie-parser');
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

//route for users homepage
router.get('/', function(req, res) {
  res.send('You have reached /api/users/ ')
})

//route for a specific user profile /user_name/profile;
//also returns an array of references to user's recipes and saved recipes

router.get('/:userName/profile', function(req, res) {
  var username = req.params.userName
  req.params.password = null;
  req.params.location = null;
  db.userFunctions.findByUserName(username).then((user) => {
    user.password = null;
    user.location = null;
    user.session = null;
    res.send(user)
  })
   .catch(function(err) {
    res.send(err);
  })
})

router.get('/getUserCookie', function(req, res) {
    var cooks = req.cookies.user
    res.end(cooks)
})

//route to save a recipe to a user's saved recipes object
router.post('/save', function(req, res){
  var recipeId = req.body.recipeId
  var userId = req.body.userId
  db.userFunctions.addRecipeToSavedRecipes(userId, recipeId)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.send(err);
  })
})


module.exports = router