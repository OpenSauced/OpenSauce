const express = require('express')
var db = require('../db/db.js')
const cloudinary = require('cloudinary');
const router = express.Router()
const config = require('../env/config')
const multer = require('multer'); // Node.js middleware for handling `multipart/form-data`
const upload = multer({ dest: 'temp/' }); // set temp location of new files
const authRoutes = require('./authRoutes.js')
const path = require('path');
const fs = require('fs')


cloudinary.config(config.cloudConfig);


router.get('/completeRegistration', authRoutes.ensureAuthenticated, function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../app/public/signup2.html'));
})

router.post('/completeRegistration/', authRoutes.ensureAuthenticated, upload.single('ProfilePicture'), (req, res) => {
  if (req.file !== undefined) {
    // send spot photo to cloudinary
    cloudinary.uploader.upload(req.file.path, (result) => {
      // delete file from server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error on image delete:', err);
        } else {
          const postObj = req.body;
          postObj.img_url = result.secure_url;
          console.log('asfsad', postObj.img_url)
          db.userFunctions.addPhotoUrl(req.cookies.user, result.secure_url).then(function(userDB) {
            console.log('user:', userDB)
            res.end('result.secure_url ' + res.secure_url)
          })
          // db.users.post(req.body)
          //   .then((resolve) => {
          //     console.log('sending', resolve);
          //     res.status(201).send(resolve);
          //   })
          //   .catch((reject) => {
          //     console.log('rejecting with', reject);
          //     res.status(500).send(reject);
          //   });
        }
      });
    });
  } else {
    res.status(400).send('Spots require images');
  }
});


router.post('/test/image', function(req, res) {
  cloudinary.uploader.upload("my_picture.jpg", function(result) {
    console.log(result)
  });
  res.end(200)
})

module.exports = router
