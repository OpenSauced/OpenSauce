const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	title: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	ingredients: [{
		amount: Number,
		measurement: String,
		ingredient_name: String
	}],
	directions: String,
	likes: Number,
	tags: [String],
	recipe_images: [{
		image_data: Buffer,
		image_name: String,
		mimetype: String
	}],
	created_at: {
		type: Date,
		default: Date.now
	}
})

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;


//good export!
