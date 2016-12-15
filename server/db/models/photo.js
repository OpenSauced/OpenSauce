//empty photo model
// this should do stuff!

//this is all fake!!!!
const Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  photoData: {},
  userData: {}
})

const Photo = mongoose.model('photo', PhotoSchema);

module.exports = Photo;
