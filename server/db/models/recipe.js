const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	title: {type: String, required: true},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	description: {type: String, require: true},
	ingredients: {type: [String], required: true},
	directions: {type: String, required: true},
	// The recipe_images is plural but only accepts one image currently.
	// Will refactor to allow multiple images later
	recipe_images: {
		public_url: String,
		secure_url: String,
		public_id: String,
		signature: String,
		placeholder: {type: String, default: 'https://placehold.it/900x600'}
	},
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
	},
	url: String
})

RecipeSchema.index({title: 'text', descrption: 'text', directions: 'text'})

const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;


//good export!
