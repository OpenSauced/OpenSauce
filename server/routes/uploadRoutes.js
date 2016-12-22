const express = require('express')
var db = require('../db/db.js')
const cloudinary = require('cloudinary');
const router = express.Router()
const config = require('../env/config')
const multer = require('multer'); // Node.js middleware for handling `multipart/form-data`
const upload = multer({ dest: 'TempUpload/' }); // set temp location of new files
const authRoutes = require('./authRoutes.js')
const path = require('path');
const fs = require('fs')


cloudinary.config(config.cloudConfig);


router.get('/completeRegistration', authRoutes.ensureAuthenticated, function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../app/public/signup2.html'));
})

router.post('/completeRegistration/', authRoutes.ensureAuthenticated, upload.single('ProfilePicture'), (req, res) => {
  if (req.file !== undefined) {
    db.userFunctions.updateInfoBatch(req.cookies.user, req.body).then(function(userDB) {
      cloudinary.uploader.upload(req.file.path, (result) => {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error on image delete:', err);
          } else {
            db.userFunctions.addPhotoUrl(req.cookies.user, result).then(function(userDB) {
              res.send(userDB)
            })
          }
        });
      });
    })
  } else {
    db.userFunctions.updateInfoBatch(req.cookies.user, req.body).then(function(userDB) {
      res.redirect('/')
    })
  }
});

module.exports = router
