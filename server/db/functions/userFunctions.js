// current model names:
// photoModel
// recipeModel
// userModel


// usage:
const xPorts = {
  findUserById: findUserById
  //somethingElse: somethingElseFn
}

function findUserById(req, res) {
    userModel.User.findOne({fb_id: req.user.id}).populate('groups').then((user) => {
        res.status(200).send(user);
    })
}

module.exports = xPorts;
