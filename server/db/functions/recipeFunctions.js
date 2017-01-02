//see user functions for example
const recipeModel = require('../models/recipe.js')
const userFunctions = require('./userFunctions.js')
const axios = require('axios')
const xPorts = {}

//returns the most recent 10 recipes
xPorts.findRecentRecipes = function() {
    return recipeModel.find()
    .sort( [['_id', -1]] )
}

//adds a new recipe to the DB
//calls addRecipeToMyRecipes to update 'my_recipes' in user document
xPorts.addNewRecipe = function(username, recipe) {
    return userFunctions.findByUserName(username)
        .then((userObj) => {
            return userObj
        })
        .catch((err) => {
            console.log("recipeFunctions 1 ", err)

        })
        .then((user) => {
            recipe.creator = user._id
            return new recipeModel(recipe)
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
xPorts.findRecipeById = function(recipeId) {
    return recipeModel.findOne({ _id: recipeId })
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
        .then((forkedRecipe) => {
            xPorts.addChildRecipe(parentId, forkedRecipe._id)
            return forkedRecipe
        })
        .catch((err) => {
            console.log("recipeFunctions 3 ", err)
        })
}

//adds a child (forked) recipe to a parent recipe
//called when a forked recipe is saved to the DB
xPorts.addChildRecipe = function(parentId, childId) {
    return recipeModel.findOneAndUpdate({ _id: parentId }, {
            $push: {
                'forked_children': childId
            }
        })
        .then((recipe) => {
            return recipe
        })
        .catch((err) => {
            console.log("error in recipeFunctions 4", err)
        })

}

//return a recipe object from a url
xPorts.getRecipefromUrl = function(url) {
    return xPorts.fetchHtml(url)
        .then((html) => {
            if (url.indexOf('epicurious') !== -1) {
                return xPorts.parseEpicurious(html)
            } else {
                throw err;
            }
        })
        .catch((err) => {
            console.log("error in recipeFunctions 5", err)
        })
}

//takes a url supplied by the client and returns the html for the page
xPorts.fetchHtml = function(url) {
    return axios.get(url)
}

//parse the html and return a recipe object
// that is returned from a get request to epicurious
xPorts.parseEpicurious = function(html) {
    newHtml = html.data.replace(/(\r\n|\n|\r)/gm, "");

    var recipe = {}

    var pullTitle = newHtml.match(/<h1 itemprop="name">(.*?)\</g);
    var titleArray = []
    pullTitle.forEach(function(title) {
        titleArray.push(title.match(/<h1 itemprop="name">(.*?)\</).pop())
    })
    recipe.title = titleArray[0]

    var pullDescription = newHtml.match(/itemprop="description"><p>(.*?)\</g);
    var descriptionArray = []
    pullDescription.forEach(function(description) {
        descriptionArray.push(description.match(/itemprop="description"><p>(.*?)\</).pop())
    })
    recipe.description = descriptionArray[0]

    var ingredients = newHtml.match(/\<li class="ingredient" itemprop="ingredients">(.*?)\</g);
    var ingredientsArray = []
    ingredients.forEach(function(ingredient) {
        ingredientsArray.push(ingredient.match(/\<li class="ingredient" itemprop="ingredients">(.*?)\</).pop())
    })
    recipe.ingredients = ingredientsArray

    var pullDirections = newHtml.match(/\<li class="preparation-step">(.*?)\</g);
    var directionsArray = []
    pullDirections.forEach(function(direction) {
        directionsArray.push(direction.match(/\<li class="preparation-step">(.*?)\</).pop())
    })
    recipe.directions = directionsArray.join(' ')

    return recipe
}


module.exports = xPorts;
