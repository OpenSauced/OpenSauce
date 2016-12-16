const assert = require('assert');
const db = require('../server/db/db.js');

const User = require('../server/db/models/user.js');
const recipeFunctions = require('../server/db/functions/recipeFunctions.js')

var test = true;

describe('passing a test', () => {
	it('should return true', (done) =>{
		assert(test);
		done();
	})
})

describe('Creating records', () => {
	it('saves a user', (done) => {
		const henry = new User({ first_name:'Henreh', last_name:'Hedges' });
		henry.save()
			.then(() => {
				assert(!henry.isNew);
				done();
			})
	});
});

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
		var cherryPie = recipeFunctions.addNewRecipe('Bennett_Staley', recipe)
		.then((recipe) => {
			console.log(recipe)
			assert(!cherryPie.isNew);
			done()
		})
	})
})