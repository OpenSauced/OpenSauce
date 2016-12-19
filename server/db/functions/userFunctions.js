// current model names:
// photoModel
// recipeModel
// userModel

// usage:
const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findByUserName = function(name) {
    console.log('looking for user userFunctions.js', name);
    return userModel.findOne({username: name})
}

xPorts.updateSession = function(user, hash) {
  return xPorts.findByUserName(user.username).then(function(userDB) {
    userDB.session = hash
    userDB.update()
    userDB.save()
    console.log('saved hash to session userFunctions.js', userDB);
    return userDB
  })
}

xPorts.findOrCreateUser = function(userData) {
    return xPorts.findByUserName(userData.username).then(function(data) {
        if (!data) { //no data, user isnt in the db
            console.log('didnt find a user, creating one', userData);
            xPorts.saveUser({
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.email,
                session: 'null',
                username: userData.username,
                picture: 'null',
                password: userData.password
            })
            return false
        } else if (data) { //got data
            return true
        }
    })
}

xPorts.saveUser = function(user) {
    // console.log('saving a user', user)
    new userModel(user).save().then((data) => {
        console.log('saved a profile')
    }).catch((err) => {
        console.error('ERROR IN USER FUNCTIONS SAVING:', err);
    })
}

module.exports = xPorts;
