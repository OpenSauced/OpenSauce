// current model names:
// photoModel
// recipeModel
// userModel


// usage:
const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findByUserName = function(profile) {
    return userModel.findOne({ username: (profile.displayName.split(" ")[0] + '_' + profile.displayName.split(" ")[1]) })
}

xPorts.findById = function(profile) {
    return userModel.findOne({ fb_id: profile.id })
}

xPorts.createOrFindUser = function(profile) {
  return xPorts.findById(profile).then(function(data) {
    if (!data) {  //no data, user isnt in the db
      console.log('didnt find a user, creating one', profile);
      xPorts.saveUser({
          email: profile.email,
          fb_id: profile.id,
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          // username: (profile.displayName.split(" ")[0] + '_' + profile.displayName.split(" ")[1] ),
          picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=normal' })
    } else if (data) { //got data
      console.log('user exists, returning it')
      return data
    }
  })
}

xPorts.saveUser = function(user) {
  // console.log('saving a user', user)
  new userModel(user).save().then((data) => { console.log('saved a profile') }).catch((err) => {
      console.error('ERROR IN USER FUNCTIONS SAVING:', err);
  })
}

module.exports = xPorts;
