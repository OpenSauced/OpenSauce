var bcrypt = require('bcrypt-nodejs');
var cookie = require('cookie');

const auth = {}

auth.ensureAuthenticated = function(req, res, next) {
  // if (req.isAuthenticated())
    return next();
  // else
  //   res.end('this route is locked, please log in')
}

module.exports = auth


auth.signUp = function(req, res) {
    var userData = req.body
    var salt = bcrypt.genSaltSync(1337);
    var hash = bcrypt.hashSync(userData.password, salt);
    userData.passwordHash = hash
    db.postUser(userData, function(err, user) {
        if (err) {
            res.status(200).send('Erorr username ' + req.body.username + ' is taken, please choose another.');
        } else {
          res.redirect('/login')
        }
        // console.log('user', user)
    })
}

auth.login = function(req, res) {
    db.getUserByUserName(req.body.username, function(err, returnData) {
      if (err) {
        res.status(404).end('worng user/pass combos')
      } else if (returnData.passwordHash) {
            if (returnData !== [] && req.body.username === returnData.username) {
                if (bcrypt.compareSync(req.body.password, returnData.passwordHash)) {
                    createSession(returnData, res)
                } else {
                  var concat = ('worng user/pass combos, comparing ' + req.body.password + ' ' + returnData.passwordHash)
                  res.status(404).end(concat)
                }
            }
        } else {
          res.status(404).end('worng user/pass combos')
        }
    })

    function createSession(userData, res) {
        var salt = bcrypt.genSaltSync(1337);
        var hash = bcrypt.hashSync(userData.username + userData._id, salt)
        db.postSession({userId: userData._id, session: hash}, userData._id, function(err, sessionData) {
            res.cookie('userId', userData._id)
            res.cookie('session', sessionData.session)
            console.log('rezzing')
            res.redirect('/')
        })
    }

}
