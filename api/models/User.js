var bcrypt = require('bcrypt-nodejs');

module.exports = {
  attributes: {
    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    account: {
      collection: 'account',
      via: 'user'
    },
    pickups: {
      collection: 'pickup',
      via: 'user'
    }
  },

  beforeCreate: function (values, cb) {

    bcrypt.hash(values.password, null, null, function(err, hash){
      if(err) throw err;
      values.password = hash;
      cb();
    });
    
  },

  beforeUpdate: function (values, cb) {

    bcrypt.hash(values.password, null, null, function(err, hash){
      if(err) throw err;
      values.password = hash;
      cb();
    });
    
  }

}