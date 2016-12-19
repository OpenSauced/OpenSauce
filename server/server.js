const path = require('path');
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');

const db = require('./db/db.js')
const config = require('./env/config')
const auth = require('./routes/authRoutes.js')

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

//example of a locked route:
app.get('/locked', auth.ensureAuthenticated, function(req, res) {
    res.send('you are logged in!')
})

app.get('/signup', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../app/public/signup.html'));
})
app.get('/login', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../app/public/login.html'));
})

app.post('/login', function(req, res) {
    auth.login(req.body).then(function(cook) {
        if (cook) {
          //cookie chaining!
          //sets user and session
          //very hard to verify / fake
          //we dont verify, we just check and see if the user
          //has that exact session. Not recreating it. Username is just for lookup
            res.cookie('session', cook[1], {
                maxAge: 9000000,
                httpOnly: true
            }).cookie('user', cook[0].username, {
                maxAge: 9000000,
                httpOnly: true
            }).redirect('/');
            console.log('cook', cook);
            //LOGGED!
            res.redirect('/')
        } else if (!cook) {
            res.end('wrong user and passsword combo')
        }
    })
})

app.post('/signup', function(req, res) {
    auth.signUp(req.body).then(function(exists) {
        console.log('.then')
        if (exists === true) {
            res.status(200).send('Erorr username taken, please choose another.');
        } else if (exists === false) {
            res.status(200).redirect('/login')
        }
    })
})
