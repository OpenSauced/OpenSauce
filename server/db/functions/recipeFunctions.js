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
    console.log(recipe)
    return userFunctions.findByUserName(username)
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
                    forked_parent: recipe.forked_parent,
                    ingredients: [{
                        amount: recipe.ingredients.amount,
                        measurement: recipe.ingredients.measurement,
                        ingredient_name: recipe.ingredients.ingredient_name
                    }],
                    directions: recipe.directions,
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

// xPorts.forkRecipe = function(username, recipeId){
//     return xPorts.findRecipeById(recipeId)
//     .then((recipe)=>{
//         console.log("ID___________", recipe._id)
//         var forkedRecipe = {
//             title: recipe.title,
//             ingredients: recipe.ingredients,
//             directions: recipe.directions,
//             forked_parent: recipe._id
//         }
//         return xPorts.addNewRecipe(username, forkedRecipe)
//     })
//     .catch((err) => {
//         console.log("recipeFunctions 3 ", err)
//     })
// }

//takes a forked recipe from client and saves it to the DB
xPorts.saveForkedRecipe = function(username, recipe, parentId) {
    recipe.forked_parent = parentId
    return xPorts.addNewRecipe(username, recipe)
    .then((forkedRecipe)=>{
        xPorts.addChildRecipe(parentId, forkedRecipe._id)
        return forkedRecipe
    })
    .catch((err) => {
        console.log("recipeFunctions 3 ", err)
    })
}

//adds a child (forked) recipe to a parent recipe
//called when a forked recipe is saved to the DB
xPorts.addChildRecipe = function(parentId, childId){
        return recipeModel.findOneAndUpdate({ _id: parentId }, {
            $push: {
                'forked_children': childId
            }
        })
        .then((recipe) => {
            return recipe
        })
        .catch((err) => {
            console.log("error in userFunctions 2", err)
        }) 

}

module.exports = xPorts;
