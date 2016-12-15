var express = require('express')
var router = express.Router()

var dummyDB = require('../db/dummydata.js')

// add middleware that is specific to this router here:

//route for users homepage
router.get('/', function(req,res) {
  res.send('You have reached /users/ ')
})

//route for a specific user profile /user_name/profile
router.get('/:user_name/profile', function(req, res) {
  console.log(req.params.user_name)
  dummyDB.getUser(req.params.user_name)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })
})

router.post('/:user_name/profile', function(req, res) {
  console.log(req.params.user_name)
  dummyDB.getUser(req.params.user_name)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })
})

module.exports = router