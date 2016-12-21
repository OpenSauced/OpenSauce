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
		ref: 'Recipe'
	}],
	saved_recipes:[{
		type: Schema.Types.ObjectId,
		ref: 'Recipe'
	}],
	user_image: {
		image_data: Buffer,
		image_name: String,
		mimetype: String
	},
	session: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	bio: String,
	location: {
		State: String,
		Country: String,
		Zip: String
	},
	favorite_food: String,
	secondary_signup_needed: String,

})

const User = mongoose.model('user', UserSchema);

module.exports = User;
