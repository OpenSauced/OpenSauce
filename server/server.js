const path = require('path');
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const db = require('./db/db.js')
const config = require('./env/config')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
// Use express and export it
const app = express();
module.exports.app = app;
// Check to see if there is a port environment variable or just use port 4040 instead
module.exports.NODEPORT = process.env.PORT || 4040;
// Use body-parser for parsing JSON and URLencoded body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// User cookie-parser to parse cookies we get from Facebook
app.use(cookieParser());

db.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.connection.on('open', function (){
	console.log('Mongdb connection open');
})

app.use('/users', userRoutes);

app.use('/recipes', recipeRoutes);

// Serve the static client HTML files
app.use(express.static(path.join(__dirname, '/../app/public')));
// Serve the static client React files
app.use('/dist', express.static(path.join(__dirname, '/../app/public/dist')));


//passport app strategy
passport.use(new Strategy({ //fill these in!!
    clientID: config.fbObj.appId, //config?
    clientSecret: config.fbObj.appSecret, //wt?ha
    callbackURL: config.fbObj.callbackURL //missing this 2
},
//facebook sends back tokens and profile
function(accessToken, refreshToken, profile, done) {
  //in the DB?
    db.User.findOne({fb_id: profile.id}).exec().then((data) => {
        //console.log(data);
        if (!data) { //did we get data back? no;
            console.log('profile', profile)
            new db.User({
                userName: profile.displayName,
                fb_id: profile.id,
                picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=normal'
            }).save().then((data) => {}).catch((err) => {
                console.error(err);
            })
        }
    })
    return done(null, profile);
}));

//Serialize and deserialize users out of the session.
passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('facebook'));
app.get('/facebook/oauth', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
    let cookie = {
        session: req.sessionID,
        userID: req.user.id
    }
    res.cookie('fr-session', cookie, {
        maxAge: 9000000,
        httpOnly: true
    }).redirect('/');
});

// Start the actual server listening on the port variable
app.listen(module.exports.NODEPORT, function (err) {
  // If there is an error log it
  if (err) { console.error(err); }
  // If there is not an error console log what port the server is running on
  else { console.log('Server running on port %s', module.exports.NODEPORT) }
})
