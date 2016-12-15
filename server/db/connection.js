const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongodbUri = 'mongodb://'+require('../env/config.js').mLabObj.username+':'+require('../env/config.js').mLabObj.password+'@ds133328.mlab.com:33328/heroku_vjlpd3gp';
mongoose.connect(mongodbUri);

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('open', function (){
	console.log('Mongdb connection open');
})

module.exports = connection;
