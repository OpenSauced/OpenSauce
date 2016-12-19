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
    userModel.findOne({_id: userId })
        .then((user) => {
        	console.log("USER*********** ", user)
        })
        .catch((err) => {
            console.log("test userFunctions  ", err)
        }) // return userModel.findOneAndUpdate({ _id: userId }, {
        //     $push: {
        //         'my_recipes': recipeId
        //     }
        // })
}

//NEEDS TEST
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
            console.log("test userFunctions  ", err)
        })
}



module.exports = xPorts;
