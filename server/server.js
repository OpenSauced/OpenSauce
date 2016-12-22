const path = require('path');
const express = require('express');
const session = require('express-session');
const recipeRoutes = require('./routes/recipeRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js')

const db = require('./db/db.js')
const config = require('./env/config')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uploadRoutes = require('./routes/uploadRoutes.js')

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

app.use('/api/users', authRoutes.ensureAuthenticated, userRoutes);
app.use('/api/recipes', authRoutes.ensureAuthenticated, recipeRoutes);
app.use('/auth/', authRoutes.ensureAuthenticated, authRoutes)
app.use('/upload/', authRoutes.ensureAuthenticated, uploadRoutes)

app.use(authRoutes.ensureAuthenticated, express.static(path.join(__dirname, '/../app/public')));

app.use('/dist', express.static(path.join(__dirname, '/../app/public/dist')));

// app.get('/', authRoutes.ensureAuthenticated, function(req, res) {
//   res.end('wow')
// })
// This will catch ANY other routes that did not come before this and serve index.html
// app.use('/*', authRoutes.ensureAuthenticated, express.static(path.join(__dirname, '/../app/public/index.html')));

app.get('*', authRoutes.ensureAuthenticated, express.static(path.join(__dirname, '/../app/public/index.html')));

app.use(session({secret: 'git baked', resave: true, saveUninitialized: true}));

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

app.get('/locked', authRoutes.ensureAuthenticated, function(req, res) {
    res.send('you are logged in!')
})
