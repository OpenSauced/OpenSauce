// current model names:
// photoModel
// recipeModel
// userModel

// usage:
const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findByUserName = function(profile) {
    console.log('looking for user');
    return userModel.findOne({username: profile})
}

// xPorts.findById = function(id) {
//     return userModel.findOne({fb_id: .id})
// }

xPorts.updateSession = function(user, hash) {
  xPorts.findByUserName(user).then(function(userDB) {
    userDB.session.session = hash
    usersDB.session.user = user
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
                // fb_id: userData.id,
                username: userData.username,
                picture: 'null',
                password_hash: userData.password
                // username: (userData.displayName.split(" ")[0] + '_' + userData.displayName.split(" ")[1] ),
                // picture: 'https://graph.facebook.com/' + userData.id + '/picture?type=normal'
            })
            console.log('returning true');
            return false
        } else if (data) { //got data
            console.log('user exists, returning it')
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
