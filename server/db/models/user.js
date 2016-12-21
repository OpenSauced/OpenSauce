const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	picture: String,
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
		image_data: {type: Buffer, default: null},
		image_name: {type: String, default: null},
		mimetype: {type: String, default: null},
		placeholder: {type: String, default: 'https://placehold.it/900x600'}
	},
	session: String,
	created_at: {
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
