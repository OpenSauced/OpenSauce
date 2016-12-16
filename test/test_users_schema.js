const assert = require('assert');
const db = require('../server/db/db.js');

const User = require('../server/db/models/user.js');
const recipeFunctions = require('../server/db/functions/recipeFunctions.js')
const userFunctions = require('../server/db/functions/userFunctions.js')

var test = true;

describe('passing a test', () => {
    it('should return true', (done) => {
        assert(test);
        done();
    })
})

describe('Creating records', () => {
    it('saves a user', (done) => {
        const henry = new User({ first_name: 'Henreh', last_name: 'Hedges' });
        henry.save()
            .then(() => {
                assert(!henry.isNew);
                done();
            })
    });
})

describe('Creating recipes', () => {
    it('saves a recipe', (done) => {
        const recipe = {
            title: 'Cherry Pie',
            ingredients: [{
                amount: 1,
                measurement: 'can',
                ingredient_name: 'cherries'
            }, {
                amount: 1,
                measurement: 'cup',
                ingredient_name: 'sugar'
            }, {
                amount: 16,
                measurement: 'oz',
                ingredient_name: 'pie dough'
            }],
            directions: 'Mix sugar and cherries together. Roll out pie dough and place in pie pan. Add cherries to pie and cover with remaining dough. Bake for 45 minutes at 400 degrees',
            likes: 0
        }
        var cherryPie = recipeFunctions.addNewRecipe('been', recipe)
            .then((recipe) => {
                console.log(recipe)
                assert(!cherryPie.isNew);
                done()
            })
    })
})

describe('adding a recipe to a users saved recipes', () => {
    it('saves a recipe', (done) => {

        const recipe = {
            title: 'Banana Pie',
            ingredients: [{
                amount: 1,
                measurement: 'can',
                ingredient_name: 'cherries'
            }, {
                amount: 1,
                measurement: 'cup',
                ingredient_name: 'sugar'
            }, {
                amount: 16,
                measurement: 'oz',
                ingredient_name: 'pie dough'
            }],
            directions: 'Mix sugar and cherries together. Roll out pie dough and place in pie pan. Add cherries to pie and cover with remaining dough. Bake for 45 minutes at 400 degrees',
            likes: 0
        }
        recipeFunctions.addNewRecipe('been', recipe)
            .then((recipe) => {
                return recipe
            })
            .then((recipe) => {
                console.log("creator: ", typeof recipe.creator)
                console.log("id: ", typeof recipe._id)
                return userFunctions.addRecipeToSavedRecipes(recipe.creator, recipe._id)
            })
            .then((user) => {
                console.log("USER&^%%*%#*^$) ", user)
                console.log(user.saved_recipes)
                assert(user.saved_recipes.length);
                done();
            })
            .catch((err) => {
                console.log("test error ", err)
            })
    })
})