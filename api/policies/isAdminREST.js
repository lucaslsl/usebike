module.exports = function isAdminREST(req, res, next) {

  if(req.session.isAdmin){
    return next();
  }

  return res.status(403).json({error: 'forbidden'});

}