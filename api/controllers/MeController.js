'use strict';
var moment = require('moment');
var reqlib = require('app-root-path').require;
var wrap = reqlib('api/util/generatorFnToMiddlewareFnWrapper');

module.exports = {

  details: wrap(function* (req, res) {
    var user = yield User.findOne({id: req.session.userId});
    return res.status(200).json(_.omit(user, 'password'));
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

  retrieveAccountTransactions: wrap(function* (req, res) {
    var limit = parseInt(req.query.limit || 30);
    var skip = parseInt(req.query.skip || 0);

    var acc = yield Account.findOne({user: req.session.userId});

    var transactions = yield Transaction.find({ account: acc.id })
      .populate('pickup').limit(limit).skip(skip);

    return res.status(200).json(transactions);
  }),

  createPickup: wrap(function* (req, res) {
    var acc = yield Account.findOne({user: req.session.userId});
    if(!acc.creditCardValidated){
      return res.status(400).json({ error: 'invalid_account' });
    }

    var attrs = req.body;

    var bikeAvailable = yield Bike.findOne({ currentLocation: attrs.location });

    if(!bikeAvailable){
      return res.status(400).json({ error: 'unavailable_bikes' });
    }

    var pickup = yield Pickup.create({
      user: req.session.userId,
      location: attrs.location,
      bike: bikeAvailable.id,
      duration: attrs.duration
    }).meta({ fetch: true });

    yield Bike.update({ id: bikeAvailable.id }, { currentLocation: null });

    return res.status(201).json(pickup);

  }),

  retrievePickups: wrap(function* (req, res) {

    var limit = parseInt(req.query.limit || 30);
    var skip = parseInt(req.query.skip || 0);

    // var pickups = yield Pickup.find({user: req.session.userId}).populate('dropoff').populate('location');
    var pickups = yield Pickup.find({user: req.session.userId})
      .populate('location').limit(limit).skip(skip);

    // var dropoffsIds = [];

    // pickups = _.map(pickups, (p)=>{
    //   p.dropoff = p.dropoff[0] || null;
    //   if(p.dropoff){
    //     dropoffsIds.push(p.dropoff.id);
    //   }
    //   return p;
    // });

    // // Populate location of dropoff of all pickups
    // if(dropoffsIds.length>0){
    //   var dropoffs = yield Dropoff.find({id: dropoffsIds }).populate('location');
    //   pickups = _.map(pickups, p=>{
    //     var drop = _.find(dropoffs, d=>{
    //       return d.pickup==p.id;
    //     });
    //     p.dropoff = drop || null;
    //     return p;
    //   });
    // }

    return res.status(200).json(pickups);

  }),

  retrievePickup: wrap(function* (req, res) {

    var pickup = yield Pickup.findOne({
      user: req.session.userId,
      id: parseInt(req.param('pickupId'))
    }).populate('dropoff').populate('location').populate('transactions');

    if(!pickup){
      return res.status(404).json({ error: 'not_found' });
    }

    pickup.dropoff = pickup.dropoff[0] || null;

    // Populate location of dropoff
    if(pickup.dropoff){
      var location = yield Location.findOne({id: pickup.dropoff.location });
      pickup.dropoff.location = location;
    }

    return res.status(200).json(pickup);

  }),

  createDropoff: wrap(function* (req, res) {
    var acc = yield Account.findOne({user: req.session.userId});
    if(!acc.creditCardValidated){
      return res.status(400).json({ error: 'invalid_account' });
    }

    var attrs = req.body;

    var pickup = yield Pickup.findOne({ id: attrs.pickup });

    if(!pickup){
      return res.status(422).json({ error: 'invalid_pickup' });
    }

    var dropoffExists = yield Dropoff.findOne({ pickup: pickup.id });

    if(dropoffExists){
      return res.status(422).json({ error: 'invalid_pickup' });
    }

    var dropoff = yield Dropoff.create({
      pickup: pickup.id,
      location: attrs.location
    }).meta({ fetch: true });

    yield Bike.update({ id: pickup.bike }, { currentLocation: attrs.location });

    var receivedAt = moment(pickup.createdAt);
    var returnedAt = moment(dropoff.createdAt);

    if( returnedAt.isAfter( receivedAt.add(pickup.duration, 'minutes')) ){
      var exceeded = returnedAt.diff(receivedAt, 'minutes');
      yield Transaction.create({
        account: acc.id,
        pickup: pickup.id,
        type: 'latefee-charge',
        amount: exceeded * 0.25
      });
    }

    return res.status(201).json(dropoff);

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

  logout: wrap(function* (req, res) {
    req.session.destroy(function(err){
      res.status(204).end();
    });
  }),
  
}