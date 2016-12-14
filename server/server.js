const path = require('path');
const express = require('express');
const session = require('express-session');
const router = require('./router/router.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Use express and export it
const app = express();
module.exports.app = app;

// Check to see if there is a port environment variable or just use port 4040 instead
module.exports.NODEPORT = process.env.PORT || 4040;

//app.use(morgan);

// Use body-parser for parsing JSON and URLencoded body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// User cookie-parser to parse cookies we get from Facebook
app.use(cookieParser());

// Serve the static client HTML files
app.use(express.static(path.join(__dirname, '/../app/public')));
// Serve the static client React files
app.use('/dist', express.static(path.join(__dirname, '/../app/public/dist')));
// Serve the node modules
app.use('/lib', express.static(path.join(__dirname, '/../node_modules')));

// Start the actual server listening on the port variable
app.listen(module.exports.NODEPORT, function (err) {
  // If there is an error log it
  if (err) { console.error(err); }
  // If there is not an error console log what port the server is running on
  else { console.log('Server running on port %s', module.exports.NODEPORT) }
})
