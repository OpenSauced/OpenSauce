var express = require('express')
var router = express.Router()

var dummyDB = require('../db/dummydata.js')

// add middleware that is specific to this router here:

//route for users homepage
router.get('/', function(req, res) {
  res.send('You have reached /users/ ')
})

//route for a specific user profile /user_name/profile
router.get('/:userName/profile', function(req, res) {
  console.log(req.params.userName)
  dummyDB.getUser(req.params.userName)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })
})

router.post('/:userName/profile', function(req, res) {
  
  dummyDB.getUser(req.params.userName)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })
})

module.exports = router