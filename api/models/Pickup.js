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
    dropoff: {
      collection: 'dropoff',
      via: 'pickup'
    }
  }
}