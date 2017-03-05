module.exports = {
  attributes: {
    bin: {
      type: 'string',
      required: true,
      unique: true
    },    
    currentLocation: {
      model: 'location'
    }
  }
}