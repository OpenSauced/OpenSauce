//empty photo model
// this should do stuff!

//this is all fake!!!!
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  photoData: {},
  userData: {}
})

const Photo = mongoose.model('photo', PhotoSchema);

module.exports = Photo;
