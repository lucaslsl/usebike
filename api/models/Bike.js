module.exports = {
  attributes: {
    bin: {
      type: 'string',
      required: true,
      unique: true
    },    
    currentLocation: {
      model: 'location'
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
  }
}