'use strict';
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var validator = require('validator');
var reqlib = require('app-root-path').require;
var wrap = reqlib('api/util/generatorFnToMiddlewareFnWrapper');

module.exports = {

  available: wrap(function* (req, res) {
    var email = String(req.query.email);
    if(!validator.isEmail(email)){
      return res.status(422).json({ error: 'invalid_email' });
    }

    var user = yield User.findOne({ email: email });
    var available = user ? false : true;
    return res.status(200).json({ available: available }); 
  }),

  signup: wrap(function* (req, res) {

    var attrs = req.body;
    attrs.isAdmin = false;

    var newUser = yield User.create(attrs).meta({fetch: true});

    return res.status(201).json(_.omit(newUser, 'password'));

  }),

  login: wrap(function* (req, res) {

    var attrs = req.body;

    var user = yield User.findOne({email: attrs.email});

    if(!user){
      return res.status(404).json({ error: 'user_not_found' });
    }

    var passwordMatch = yield bcrypt.compareAsync(attrs.password, user.password);

    if(!passwordMatch){
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    req.session.userId = user.id;
    req.session.authenticated = true;
    req.session.isAdmin = user.isAdmin;

    return res.status(204).end();

  }),

  createAdmin: wrap(function* (req, res) {

    var attrs = req.body;
    attrs.isAdmin = true;

    var newUser = yield User.create(attrs).meta({fetch: true});

    return res.status(201).json(_.omit(newUser, 'password'));

  }), 


  
}