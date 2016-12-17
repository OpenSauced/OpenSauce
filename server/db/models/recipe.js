const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	title: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	ingredients: [{
		amount: Number,
		measurement: String,
		ingredient_name: String
	}],
	directions: String,
	likes: Number,
	recipe_images: [{
		image_data: Buffer,
		image_name: String,
		mimetype: String
	}],
	timestamps: { 
		createdAt: Date, 
		updatedAt: Date
	}
})

const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;


//good export!
