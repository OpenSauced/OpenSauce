// current model names:
// photoModel
// recipeModel
// userModel


// usage:
const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findUserById = function(id) {
    return userModel.findOne({user_name: id})
}

xPorts.saveUser = function(user) {
  return userModel.save(user)
}

module.exports = xPorts;
