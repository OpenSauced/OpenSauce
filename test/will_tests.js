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
                console.log(recipe)
                assert(!cherryPie.isNew);
                done()
            })
    })
})