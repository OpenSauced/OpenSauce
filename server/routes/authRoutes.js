var bcrypt = require('bcrypt-nodejs');
var cookie = require('cookie');
const cookieParser = require('cookie-parser');
const db = require('./../db/db.js')

const auth = {}

auth.ensureAuthenticated = function(req, res, next) {
  db.userFunctions.findByUserName(req.cookies.user).then(function(userDB){
    if(req.cookies.session === userDB.session && req.cookies.session !== undefined && userDB.session !== undefined) {
      return next();
    } else {
      res.end('this route is locked, please log in')
    }
  })
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
    return db.userFunctions.findByUserName(user.username).then(function(userDB) {
        if (userDB !== null) {
            if (user !== [] && user.username === userDB.username) {
                if (bcrypt.compareSync(user.password, userDB.password)) {
                    var hash = bcrypt.hashSync(userDB.username + userDB.email, bcrypt.genSaltSync(7331));
                    return db.userFunctions.updateSession(user, hash).then(function(userDB) {
                      return [user, hash]
                    })
                } else {
                  console.log('returning null in login auth.js 1');
                  return null;
                }
            } else {
              console.log('returning null in login auth.js 2');
              return null;
            };
        } else {
          console.log('returning null in login auth.js 3');
          return null;
        }
    })
}
