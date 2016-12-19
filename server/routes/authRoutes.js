var bcrypt = require('bcrypt-nodejs');
var cookie = require('cookie');
const db = require('./../db/db.js')

const auth = {}

auth.ensureAuthenticated = function(req, res, next) {
    // if (req.isAuthenticated())
    return next();
    // else
    //   res.end('this route is locked, please log in')
}

module.exports = auth

auth.signUp = function(userData) {
    //hash gen
    var hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(7331));
    userData.password = hash
    //return promise
    return db.userFunctions.findOrCreateUser(userData)
}

auth.login = function(user) {
    return db.getUserByUserName(user.username).then(function(userDB) {
        if (userDB.password) {
            if (user !== [] && user.username === userDB.username) {
                if (bcrypt.compareSync(user.password, userDB.password)) {
                    var hash = bcrypt.hashSync(userDB.username + userDB.email, bcrypt.genSaltSync(7331));
                    return db.userFunctions.updateSession(user, hash).then(function(userDB) {
                      return [user, hash]
                    })
                } else {
                    var concat = ('worng user/pass combos, comparing ' + user.password + ' ' + userDB.password)
                    res.status(404).end(concat)
                }
            }
        } else {
            res.status(404).end('worng user/pass combos')
        }
    })
}
