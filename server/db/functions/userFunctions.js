const userModel = require('../models/user.js')
const xPorts = {}

//returns a user object based on a username
xPorts.findUserByUserName = function(username) {
    return userModel.findOne({ username: username })
        .populate('my_recipes')
        .populate('saved_recipes')
        .exec((err, user) => {
            if (err) console.log("error in userFunctions 1: ", err);
        })
}

//returns the recipes created by specific user
xPorts.findUserRecipes = function(username) {
    xPorts.findUserByUserName(username)
        .then((user) => {
            return user.my_recipes
        })
}

//Adds a recipe id reference to the user's my_recipe object
xPorts.addRecipeToMyRecipes = function(userId, recipeId) {
    return userModel.findByIdAndUpdate(user.userId, {
        $push: {
            'my_recipes': {
                ref: recipeId
            }
        }
    })
}

//Adds a recipe id reference to the user's saved recipe object
xPorts.addRecipeToSavedRecipes = function(userId, recipeId) {
    return userModel.findByIdAndUpdate(user.userId, {
        $push: {
            'saved_recipes': {
                ref: recipeId
            }
        }
    })
}

module.exports = xPorts;
