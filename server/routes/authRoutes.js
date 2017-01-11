const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require('multer'); // Node.js middleware for handling `multipart/form-data
const bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const db = require('./../db/db.js')
const config = require('../env/config.js')
const axios = require('axios')


//takes a user, and a plain password text, returns true or false.
//thx bCrypt
//this is promise based
// EXAMPLE -----------------------
// router.verifyPassword(user, password).then(function(verified) {
//     if (verified) {
//         do stuff
//     } else {
//         dont do stuff
//     }
// })
router.verifyPassword = function(user, plainPass) {
    return db.userFunctions.findByUserName(user).then(function(userDB) {
        if (user !== null && userDB !== null && userDB !== []) {
            return bcrypt.compareSync(plainPass, userDB.password) //resolves as bool
        } else {
            return false
        }
    })
}

// MIDDLEWARE that checks authentication of google recaptcha
router.authRecaptcha = function (req, res, next) {

    // construct url to send and verify
    let captchaRes = req.body['g-recaptcha-response'];
    let secret = config.recaptcha.secret;
    let verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret='
        + secret + '&response='+ captchaRes + '&remoteip=' + req.connection.remoteAddress;
    console.log('verify captcha url',verificationURL);
    axios.post( verificationURL )
    .then((resObj) => { // google verification obj returned ---> https://developers.google.com/recaptcha/docs/verify
        if (resObj.data.success === true){
            return next()
        } else {
            throw new Error('There was a problem with your recaptcha response, please try again')
        }
    })
    .catch((err)=>{
        console.log('error in captcha post to google servers', err)
        res.status(500).send(err.message)
        // handle this route better
        // res.redirect('/handlefailedrecaptcha')
    })
}

router.ensureAuthenticated = function(req, res, next) {
    if (req.url === '/login' || req.url === '/signup') {
        return next();
    } else {
        db.userFunctions.findByUserName(req.cookies.user).then(function(userDB) {
            if (userDB == null) {
                res.redirect('/auth/logout')
            } else if (userDB !== null) {
                if (req.cookies.session === userDB.session && req.cookies.session !== undefined && userDB.session !== undefined) {
                    return next();
                } else {
                    res.redirect('/auth/logout')
                }
            } else {
                res.redirect('/auth/logout')
            }
        })
    }
}

//actual sign up function
router.signUp = function(userData) {
    var hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(7331));
    userData.password = hash
    return db.userFunctions.findOrCreateUser(userData)
}

//actial login function
router.login = function(user) {
    return router.verifyPassword(user.username, user.password).then(function(verified) {
        if (verified) {
            //cool you got verified, now lets give you a session
            //this could be its own function... whatever...
            return db.userFunctions.findByUserName(user.username).then(function(userDB) {
                //not really a hash. whatever. bcrypt was too slow.
                var hash = Math.floor(Math.random() * 100000000000)
                return db.userFunctions.updateSession(user, hash).then(function(userDB) {
                    return [userDB, hash]
                })
            })
        } else {
            return null
        }
    })
}


router.get('/getUserCookie', function(req, res) {
    var cooks = req.cookies.user
    res.end(cooks)
})

router.post('/login', function(req, res) {
    router.login(req.body).then(function(cook) {
        if (cook) {
            //got a cookie?
            //yum, better save it
            res.cookie('session', cook[1], {
                maxAge: 9000000,
                httpOnly: true
            }).cookie('user', cook[0].username, {
                maxAge: 9000000,
                httpOnly: true
            }).redirect('/');
            console.log('cook', cook);
            //LOGGED!
            res.redirect('/')
        } else if (!cook) {
            res.end('wrong user and passsword combo')
        }
    }).catch(function(err) {
        res.end('wrong user and pass combo')
    })
})

router.get('/logout', function(req, res) {
    console.log('loaded logout');
    res.clearCookie("user");
    res.clearCookie("session");
    // res.end('LOG')
    res.redirect('/login');
})

// router.secondarySignupCheck
router.post('/signup', router.authRecaptcha, function(req, res) {
    router.signUp(req.body).then(function(exists) {
        console.log('.then')
        if (exists === true) {
            res.status(200).send('Erorr username taken, please choose another.');
        } else if (exists === false) {
            res.status(200).redirect('/login')
        }
    })
})

module.exports = router
