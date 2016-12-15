// current model names:
// photoModel
// recipeModel
// userModel


// usage:
const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findUserById = function(req, res) {
    userModel.findOne({user_name: req})
    .then((user) => {
        res.status(200).send(user);
    })
}

module.exports = xPorts;
