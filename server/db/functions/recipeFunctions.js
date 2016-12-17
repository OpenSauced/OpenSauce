//see user functions for example
const recipeModel = require('../models/recipe.js')
const userFunctions = require('./userFunctions.js')
const xPorts = {}

//returns the most recent 10 recipes
xPorts.findRecentRecipes = function() {
    return recipeModel.find().sort({ createdAt: 'desc' }).limit(10)
}

//adds a new recipe to the DB
//calls addRecipeToMyRecipes to update 'my_recipes' in user document
xPorts.addNewRecipe = function(username, recipe) {
    return userFunctions.findUserByUserName(username)
        .then((userObj) => {
            return userObj
        })
        .catch((err) => {
            console.log("recipeFunctions 1 ", err)

        })
        .then((user) => {
            return new recipeModel({
                    title: recipe.title,
                    creator: user._id,
                    ingredients: [{
                        amount: recipe.ingredients.amount,
                        measurement: recipe.ingredients.measurement,
                        ingredient_name: recipe.ingredients.ingredient_name
                    }],
                    directions: recipe.directions,
                    likes: recipe.likes,
                    recipe_images: [{
                        image_data: 'null',
                        image_name: 'null',
                        mimetype: 'null'
                    }]
                })
                .save()
                .then((recipe) => {
                    userFunctions.addRecipeToMyRecipes(user._id, recipe._id)
                    return recipe;
                })
                .catch((err) => {
                    console.log("recipeFunctions 2 ", err)
                })
        })

}

//finds and returns one recipe based on recipe ID
xPorts.findRecipeById = function(recipeId){
	return recipeModel.findOne({_id: recipeId})
	.populate('creator')
	.exec((err, recipe) => {
		if (err) console.log("error in recipeFunctions: ", err);
	})

}

// xPorts.increaseLikes = function(recipe){
// 	likes = likes + 1
// }


module.exports = xPorts;
