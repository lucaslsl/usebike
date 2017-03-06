module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    latitude: {
      type: 'number',
      columnType: 'DECIMAL(10,8)',
      required: true
    },
    longitude: {
      type: 'number',
      columnType: 'DECIMAL(11,8)',
      required: true
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    bikes: {
      collection: 'bike',
      via: 'currentLocation'
    }
  }
}