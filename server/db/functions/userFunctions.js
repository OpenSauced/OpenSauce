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



xPorts.createOrFindUser = function(profile) {
  return xPorts.findByUserName(profile).then(function(data) {
    console.log('data inside user functions', data)
    if (!data) {  //no data, user isnt in the db
      xPorts.saveUser({ first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          username: (profile.displayName.split(" ")[0] + '_' + profile.displayName.split(" ")[1] ),
          fb_id: profile.id,
          picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=normal' })
    } else if (data) { //got data
      console.log('user exists, returning it', data)
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
