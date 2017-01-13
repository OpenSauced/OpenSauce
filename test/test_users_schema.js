const assert = require('assert');
const db = require('../server/db/db.js');

const User = require('../server/db/models/user.js');
const recipeFunctions = require('../server/db/functions/recipeFunctions.js')
const userFunctions = require('../server/db/functions/userFunctions.js')

const axios = require('axios')

var test = true;

describe('passing a test', () => {
    it('should return true', (done) => {
        assert(test);
        done();
    })
})

// describe('Creating records', () => {
//     it('saves a user', (done) => {
//         const henry = new User({ first_name: 'Henreh', last_name: 'Hedges' });
//         henry.save()
//             .then(() => {
//                 assert(!henry.isNew);
//                 done();
//             })
//     });
// })

describe('Creating recipes', () => {
    it('saves a recipe', (done) => {
        const recipe = {
            title: 'Cherry Pie',
            description: 'cheerrrrrrrry pie, woo!',
            ingredients: ['1 can cherries', '1 cup sugar', '16 oz pie dough'],
            directions: 'Mix sugar and cherries together. Roll out pie dough and place in pie pan. Add cherries to pie and cover with remaining dough. Bake for 45 minutes at 400 degrees'
        }
        var cherryPie = recipeFunctions.addNewRecipe('bjorn', recipe)
            .then((recipe) => {
                assert(!cherryPie.isNew);
                done()
            })
    })
})

describe('adding a recipe to a users saved recipes', () => {
    it('saves a recipe', (done) => {

    	const recipe = {
            title: 'Banana Pie',
            description: 'This banana pie is banana bomb.',
            ingredients: ['1 banana', '1 pie dough', '16 oz vanilla cream'],
            directions: 'Roll out pie dough and place in pie pan. Bake for 15 minutes at 400 degrees. Cool. Add cream and bananas. Enjoy'
        }
        recipeFunctions.addNewRecipe('been', recipe)
            .then((recipe) => {
                return recipe
            })
            .then((recipe) => {
                return userFunctions.addRecipeToSavedRecipes(recipe.creator, recipe._id)
            })
            .then((user) => {
                assert(user.saved_recipes.length);
                done();
            })
            .catch((err) => {
            })
    })
})

describe('forking a recipe from an existing recipe', ()=>{
    it('should fork a recipe and return a new recipe object', (done) =>{
            const recipe = {
            title: 'chocolate cake',
            description: 'The most delicious chocolate cake ever',
            ingredients: ['1 box cake mix', '1 container chocolate frosting', '1 oz sprinkles'],
            directions: 'Bake cake. Frost cake. Add sprinkles over top.',
        }
        recipeFunctions.addNewRecipe('been', recipe)
            .then((recipe) => {
                  var forkedRecipe = {
                        title: recipe.title,
                        ingredients: recipe.ingredients,
                        directions: recipe.directions,
                    }
                return recipeFunctions.saveForkedRecipe('bjorn', forkedRecipe, recipe._id)
            })
        .then((forkedRecipe) => {
                assert(!forkedRecipe.isNew);
                done()
        })
        .catch((err) => {
            })
    })
})

describe('getting the html from a link', () => {
    it('should return the html from a link', (done) => {
        recipeFunctions.getRecipefromUrl('http://www.epicurious.com/recipes/food/views/key-lime-pie-108125')
        .then((recipe) => {
        })
    })
})
