const mongoose = require('mongoose');
const config = require('../env/config.js')

//define models BEFORE functions
const userModel = require('./models/user.js')
const recipeModel = require('./models/Recipe.js')
const photoModel = require('./models/photo.js')

//functions should be able to access the models because they are defined BEFORE
const commentFunctions = require('./functions/commentFunctions.js')
const photoFunctions = require('./functions/photoFunctions.js')
const recipeFunctions = require('./functions/recipeFunctions.js')
const userFunctions = require('./functions/userFunctions.js')

mongoose.Promise = global.Promise;
const mongodbUri = 'mongodb://'+ config.mLabObj.username + ':' + config.mLabObj.password + '@ds133328.mlab.com:33328/heroku_vjlpd3gp';
mongoose.connect(mongodbUri);
const connection = mongoose.connection;

//DEFINE EXPORTS LASTSSSSS
const xPorts = {
  commentFunctions: commentFunctions,
  photoFunctions: photoFunctions,
  recipeFunctions: recipeFunctions,
  userFunctions: userFunctions,
  photoModel: photoModel,
  recipeModel: recipeModel,
  userModel: userModel,
  mongoose: mongoose,
  connection: connection,
  mongodbUri: mongodbUri
}

module.exports = xPorts;
