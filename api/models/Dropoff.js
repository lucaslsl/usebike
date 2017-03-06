module.exports = {
  attributes: {
    pickup: {
      model: 'pickup',
      required: true,
      unique: true
    },
    location: {
      model: 'location',
      required: true
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
  }
}