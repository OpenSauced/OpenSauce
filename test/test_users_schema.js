const assert = require('assert');

const User = require('../db/models/user.js');

describe('Creating records', function() {
	it('saves a user', function(done){
		const henry = new User({ first_name:'Henreh', last_name:'Hedges' });
		henry.save()
			.then(function(){
				assert(!henry.isNew);
				done();
			})
	});
});