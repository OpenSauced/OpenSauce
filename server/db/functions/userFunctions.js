// current model names:
// photoModel
// recipeModel
// userModel


// usage:
const userModel = require('../models/user.js')
const xPorts = {}

//returns a user object based on a username
xPorts.findUserByUserName = function(username) {
	return userModel.findOne({username: username})
	.populate('my_recipes')
	.exec((err, user) => {
		if (err) console.log("error in userFunctions: ", err);
	})
}

//returns the recipes created by specific user
xPorts.findUserRecipes = function(username){
	xPorts.findUserByUserName(username)
	.then((user)=>{
		return user.my_recipes
	})
}

//
xPorts.addRecipeToMyRecipes = function(userId, recipeId){
	return userModel.findByIdAndUpdate(user.userId,
		{$push: {
			'my_recipes': {
				ref: recipeId
			}
		}
		})
}

module.exports = xPorts;
