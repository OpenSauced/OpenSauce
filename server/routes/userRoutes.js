var express = require('express')
const cookieParser = require('cookie-parser');
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
    }).catch(function(err) {
        res.send(err);
    })
})

router.get('/getUserCookie', function(req, res) {
    var cooks = req.cookies.user
    res.end(cooks)
})

//route to save a recipe to a user's saved recipes object
router.post('/save', function(req, res) {
    var recipeId = req.body.recipeId
    var userId = req.body.userId
    db.userFunctions.addRecipeToSavedRecipes(userId, recipeId).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })
})

router.post('/uploadImage/', authRoutes.ensureAuthenticated, upload.single('ProfilePicture'), (req, res) => {
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
});


router.post('/updateInfo/profilePicture', authRoutes.ensureAuthenticated, upload.single('profilePicture'), (req, res) => {
console.log(req.body);
    if (req.file !== undefined) {
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
  } else {
    res.end('no file specified')
  }
})

router.post('/updateInfo/:type', function(req, res) {
    // (user, public_url, secure_url, public_id, signature)
    var user = req.cookies.user
    var type = req.params.type
    if (type === 'password') {
        router.verifyPassword(user, req.body.password).then(function(verified) {
            if (verified) {
                db.userFunctions.updatePassword(user, req.body.newPassword).then(function(userDB) {
                    res.end('good')
                }).catch(function(err) {
                    console.log('err:', err);
                    res.end('bad')
                })
            } else {
                res.end('bad')
            }
        })
    } else if (type === 'username') {
        router.verifyPassword(user, req.body.password).then(function(verified) {
            if (verified) {
                db.userFunctions.updateUsername(user, req.newUsername).then(function(userDB) {
                    res.clearCookie('user').cookie('user', req.newUsername, {
                        maxAge: 9000000,
                        httpOnly: true
                    }).redirect('/')
                }).catch(function(err) {
                    console.log('err:', err);
                    res.end('bad')
                })
            } else {
                res.end('bad')
            }
        })

    } else if (type === 'email') {
        router.verifyPassword(user, req.body.password).then(function(verified) {
            if (verified) {
                db.userFunctions.updateEmail(user, req.body.newEmail).then(function(userDB) {
                    res.end('good')
                }).catch(function(err) {
                    console.log('err:', err);
                    res.end('bad')
                })
            } else {
                res.end('bad')
            }
        })
    } else if (type === 'bio') {
        db.userFunctions.updateBio(user, req.body.newBio).then(function(userDB) {
            res.end('good')
        }).catch(function(err) {
            console.log('err:', err);
            res.end('bad')
        })
    }
})

module.exports = router
