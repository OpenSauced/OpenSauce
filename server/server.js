const path = require('path');
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const authRoutes = require('./routes/authRoutes.js')

const db = require('./db/db.js')
const config = require('./env/config')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
module.exports.app = app;
module.exports.NODEPORT = process.env.PORT || 4040;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.connection.on('open', function() {
    console.log('Mongdb connection open');
})

app.use('/users', userRoutes);

app.use('/recipes', recipeRoutes);
app.use('/auth/', authRoutes)

app.use(express.static(path.join(__dirname, '/../app/public')));

app.use('/dist', express.static(path.join(__dirname, '/../app/public/dist')));

app.use(session({secret: 'git baked', resave: true, saveUninitialized: true}));

// app.get('/facebook/oauth', passport.authenticate('facebook', {scope: ['email'], failureRedirect: '/login'}), (req, res) => {
//     let cookie = {
//         session: req.sessionID,
//         userID: req.user.id
//     }
//     res.cookie('fr-session', cookie, {
//         maxAge: 9000000,
//         httpOnly: true
//     }).redirect('/');
// });

// Start the actual server listening on the port variable
app.listen(module.exports.NODEPORT, function(err) {
    // If there is an error log it
    if (err) {
        console.error(err // If there is not an error console log what port the server is running on
        );
    } else {
        console.log('Server running on port %s', module.exports.NODEPORT)
    }
})

const ensureAuthenticated = function(req, res, next) {
  db.userFunctions.findByUserName(req.cookies.user).then(function(userDB){
    if(req.cookies.session === userDB.session && req.cookies.session !== undefined && userDB.session !== undefined) {
      return next();
    } else {
      res.end('this route is locked, please log in')
    }
  })
}

app.get('/locked', ensureAuthenticated, function(req, res) {
    res.send('you are logged in!')
})
