const userModel = require('../models/user.js')
const xPorts = {}

//returns a user object based on a username
xPorts.findByUserName = function(username) {
    return userModel.findOne({ username: username })
        .populate('my_recipes')
        .populate('saved_recipes')
        .exec((err, user) => {
            if (err) console.log("error in userFunctions 1: ", err);
        })
}

//returns the recipes created by specific user
xPorts.findUserRecipes = function(username) {
    xPorts.findByUserName(username)
        .then((user) => {
            return user.my_recipes
        })
}

//Adds a recipe id reference to the user's my_recipe object
xPorts.addRecipeToMyRecipes = function(userId, recipeId) {
    return userModel.findOneAndUpdate({ _id: userId }, {
            $push: {
                'my_recipes': recipeId
            }
        })
        .then((user) => {
        	return user
        })
        .catch((err) => {
            console.log("error in userFunctions 2", err)
        }) 
}

//Adds a recipe id reference to the user's saved recipe object
xPorts.addRecipeToSavedRecipes = function(userId, recipeId) {
    return userModel.findOneAndUpdate({ _id: userId }, {
            $push: {
                'saved_recipes': recipeId
            }
        })
        .then((oldUser) => {
            return userModel.findOne({ _id: oldUser._id })
        })
        .catch((err) => {
            console.log("error in userFunctions 3", err)
        })
}



module.exports = xPorts;
