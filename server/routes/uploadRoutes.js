var express = require('express')
var cloudinary = require('cloudinary');
var router = express.Router()
const config = require('../env/config')

cloudinary.config(config.cloudConfig);

router.post('/test/image', function(req, res) {
  cloudinary.uploader.upload("my_picture.jpg", function(result) {
    console.log(result)
  });
  res.end(200)
})

module.exports = router
