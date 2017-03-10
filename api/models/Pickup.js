module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    location: {
      model: 'location',
      required: true
    },
    bike: {
      model: 'bike',
      required: true
    },
    duration: {
      type: 'number',
      columnType: 'INT',
      required: true
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    dropoff: {
      collection: 'dropoff',
      via: 'pickup'
    },
    transactions: {
      collection: 'transaction',
      via: 'pickup'
    }
  },

  afterCreate: function afterCreate(newPickup, cb) {
    Account.findOne({ user: newPickup.user }).then(acc=>{
      Transaction.createEach([
        {
          account: acc.id,
          pickup: newPickup.id,
          amount: newPickup.duration * 0.25,
          type: 'rental-charge'
        },
        {
          account: acc.id,
          pickup: newPickup.id,
          amount: 100,
          type: 'insurance-charge'
        }
      ]).then(()=>{
        cb();
      });
    });
  }
}