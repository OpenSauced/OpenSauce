const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	title: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	description: String,
	ingredients: [String],
	directions: String,
	recipe_images: [{
		image_data: {type: Buffer, default: null},
		image_name: {type: String, default: null},
		mimetype: {type: String, default: null},
		placeholder: {type: String, default: 'https://placehold.it/900x600'}
	}],
	forked_parent:{
		type: Schema.Types.ObjectId,
		ref: 'recipes',
		default: null
	},
	forked_children:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	timestamps: { 
		createdAt: Date, 
		updatedAt: Date
	}
})

const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;


//good export!
