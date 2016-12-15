const assert = require('assert');
const db = require('../server/db/connection.js');

const User = require('../server/db/models/user.js');

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