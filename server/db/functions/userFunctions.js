const userModel = require('../models/user.js')
const xPorts = {}

xPorts.findByUserName = function(name) {
    console.log('looking for user userFunctions.js', name);
    return userModel.findOne({username: name})
}

xPorts.updateSession = function(user, hash) {
  return xPorts.findByUserName(user.username).then(function(userDB) {
    userDB.session = hash
    userDB.update()
    userDB.save()
    console.log('saved hash to session userFunctions.js', userDB);
    return userDB
  })
}

xPorts.addBio = function (user, bio) {

}

xPorts.addLocation = function (user, location) {

}

xPorts.addPhotoUrl = function (user, url) {
  return xPorts.findByUserName(user).then(function(userDB){
    userDB.profilePicture = url
    userDB.update();
    user.save();
    return userDB
  })
}

xPorts.findOrCreateUser = function(userData) {
    return xPorts.findByUserName(userData.username).then(function(data) {
        if (!data) { //no data, user isnt in the db
            console.log('didnt find a user, creating one', userData);
            xPorts.saveUser({
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.email,
                session: 'null',
                username: userData.username,
                picture: 'null',
                password: userData.password
            })
            return false
        } else if (data) { //got data
            return true
        }
    })
}

xPorts.saveUser = function(user) {
    // console.log('saving a user', user)
    new userModel(user).save().then((data) => {
        console.log('saved a profile')
    }).catch((err) => {
        console.error('ERROR IN USER FUNCTIONS SAVING:', err);
    })
}

//returns a user object based on a username
xPorts.findByUserName = function(username) {
    return userModel.findOne({ username: username })
        .populate('my_recipes')
        .populate('saved_recipes')
        .exec((err, user) => {
            if (err) console.log("error in userFunctions 1: ", err);
        })
}

//returns the recipes created by specific user
xPorts.findUserRecipes = function(username) {
    xPorts.findByUserName(username)
        .then((user) => {
            return user.my_recipes
        })
}

//Adds a recipe id reference to the user's my_recipe object
xPorts.addRecipeToMyRecipes = function(userId, recipeId) {
    return userModel.findOneAndUpdate({ _id: userId }, {
            $push: {
                'my_recipes': recipeId
            }
        })
        .then((user) => {
        	return user
        })
        .catch((err) => {
            console.log("error in userFunctions 2", err)
        })
}

//Adds a recipe id reference to the user's saved recipe object
xPorts.addRecipeToSavedRecipes = function(userId, recipeId) {
    return userModel.findOneAndUpdate({ _id: userId }, {
            $push: {
                'saved_recipes': recipeId
            }
        })
        .then((oldUser) => {
            return userModel.findOne({ _id: oldUser._id })
        })
        .catch((err) => {
            console.log("error in userFunctions 3", err)
        })
}



module.exports = xPorts;
