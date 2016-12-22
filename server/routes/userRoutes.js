var express = require('express')
const cookieParser = require('cookie-parser');
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

// add middleware that is specific to this router here:

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

////
/// GET A cookie from client (need username specifically)
///
router.get('/getCookie/', function(req, res){
})

//route to save a recipe to a user's saved recipes object
router.post('/save', function(req, res){
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


module.exports = router
