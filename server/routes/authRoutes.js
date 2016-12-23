var express = require('express')
var router = express.Router()
const path = require('path');
var bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const db = require('./../db/db.js')

//takes a user, and a plain password text, returns true or false.
//thx bCrypt
router.verifyPassword = function(user, plainPass) {
    return db.userFunctions.findByUserName(user).then(function(userDB) {
        if (user !== null && userDB !== null && userDB !== []) {
          return bcrypt.compareSync(plainPass, userDB.password) //resolves as bool
        } else {
          return false
        }
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

router.signUp = function(userData) {
    var hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(7331));
    userData.password = hash
    return db.userFunctions.findOrCreateUser(userData)
}

router.login = function(user) {
    return db.userFunctions.findByUserName(user.username).then(function(userDB) {
        if (userDB !== null) {
            if (user !== [] && user.username === userDB.username) {
                if (bcrypt.compareSync(user.password, userDB.password)) {
                    var hash = bcrypt.hashSync(userDB.username + userDB.email, bcrypt.genSaltSync(7331));
                    return db.userFunctions.updateSession(user, hash).then(function(userDB) {
                        return [user, hash]
                    })
                } else {
                    console.log('returning null in login router.js 1');
                    return null;
                }
            } else {
                console.log('returning null in login router.js 2');
                return null;
            };
        } else {
            console.log('returning null in login router.js 3');
            return null;
        }
    })
}

router.get('/signup', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../app/public/signup.html'));
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
    })
})

router.get('/logout', function(req, res) {
    console.log('loaded logout');
    res.clearCookie("user");
    res.clearCookie("session");
    // res.end('LOG')
    res.redirect('/login');
})

router.secondarySignupCheck

router.post('/signup', function(req, res) {
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
