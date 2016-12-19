var express = require('express')
var router = express.Router()

// var dummyDB = require('../db/dummydata.js')
var db = require('../db/db.js')

// add middleware that is specific to this router here:

//route for users homepage
router.get('/', function(req, res) {
  res.send('You have reached /users/ ')
})

//route for a specific user profile /user_name/profile;
//also returns an array of references to user's recipes and saved recipes
router.get('/:userName/profile', function(req, res) {
  var username = req.params.userName
  db.userFunctions.findByUserName(username).then((user) => {
    res.send(user)
  })
   .catch(function(err) {
    res.send(err);
  })
})


module.exports = router