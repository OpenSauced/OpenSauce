//see user functions for example
const recipeModel = require('../models/recipe.js')

const xPorts = {
  findRecentRecipes: findRecentRecipes
}

//returns the most recent 10 recipes
function findRecentRecipes(req, res) {
    recipeModel.find().sort({createdAt: 'desc'}).limit(10).then((user) => {
        res.status(200).send(recipes);
    })
}

//returns the recipes created by specific user
function findUserRecipes(req, res){
	req.body.user.id 
}

module.exports = xPorts;

