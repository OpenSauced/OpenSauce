const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	my_recipes:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	saved_recipes:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	user_image: {
		image_data: Buffer,
		image_name: String,
		mimetype: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
