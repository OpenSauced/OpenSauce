const auth = {}

auth.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.end('this route is locked, please log in')
}

module.exports = auth
