var express = require('express')
var router = express.Router()

var dummyDB = require('../db/dummydata.js')

// add middleware that is specific to this router here:


//route for messages homepage
router.get('/', function(req,res) {
  res.send('You have reached /recipies/ ')
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

router.post('/:userName', function(req, res) {
  
})

module.exports = router
