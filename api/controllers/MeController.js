'use strict';
var reqlib = require('app-root-path').require;
var wrap = reqlib('api/util/generatorFnToMiddlewareFnWrapper');

module.exports = {

  details: wrap(function* (req, res) {
    var user = yield User.findOne({id: req.session.userId});
    return res.status(200).json(_.omit(user, 'password'));
  }),

  retrievePickups: wrap(function* (req, res) {

    var pickups = yield Pickup.find({user: req.session.userId}).populate('dropoff').populate('location');

    var dropoffsIds = [];

    pickups = _.map(pickups, (p)=>{
      p.dropoff = p.dropoff[0] || null;
      if(p.dropoff){
        dropoffsIds.push(p.dropoff.id);
      }
      return p;
    });

    // Populate location of dropoff of all pickups
    if(dropoffsIds.length>0){
      var dropoffs = yield Dropoff.find({id: dropoffsIds }).populate('location');
      pickups = _.map(pickups, p=>{
        var drop = _.find(dropoffs, d=>{
          return d.pickup==p.id;
        });
        p.dropoff = drop;
        return p;
      });
    }

    return res.status(200).json(pickups);

  }),

  retrieveAccount: wrap(function* (req, res) {
    var acc = yield Account.findOne({user: req.session.userId});
    return res.status(200).json(acc);
  }),

  updateAccount: wrap(function* (req, res) {
    var attrs = req.body;
    attrs.user = req.session.userId;

    var acc = yield Account.findOne({user: req.session.userId});
    var accUpdated = yield Account.update(acc.id, attrs).meta({fetch: true});

    return res.status(200).json(accUpdated);

  }),

  all: wrap(function* (req, res) {
    var user = yield User.findOne({id: req.session.userId})
        .populate('account');

    user.account = user.account[0] || null;

    var userPickups = yield Pickup.find({user: user.id}).populate('dropoff').populate('location');

    var dropoffsIds = [];

    userPickups = _.map(userPickups, (p)=>{
      p.dropoff = p.dropoff[0] || null;
      if(p.dropoff){
        dropoffsIds.push(p.dropoff.id);
      }
      return p;
    });

    user.pickups = userPickups;

    // Populate location of dropoff of all pickups
    if(dropoffsIds.length>0){
      var dropoffs = yield Dropoff.find({id: dropoffsIds }).populate('location');
      user.pickups = _.map(user.pickups, p=>{
        var drop = _.find(dropoffs, d=>{
          return d.pickup==p.id;
        });
        p.dropoff = drop;
        return p;
      });
    }

    return res.status(200).json(_.omit(user, 'password'));
  }),
  
}