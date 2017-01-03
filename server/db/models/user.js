const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	profile: String,
	password: String,
	my_recipes:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	saved_recipes:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	user_image: {
		public_url: String,
		secure_url: String,
		public_id: String,
		signature: String,
		placeholder: {type: String, default: 'https://placehold.it/900x600'}
	},
	session: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	bio: String,
	location: {
		state: String,
		country: String,
		zip: String
	},
	favorite_food: String,
	secondary_signup_needed: Boolean,

})

const User = mongoose.model('user', UserSchema);

module.exports = User;
