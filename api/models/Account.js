module.exports = {
  attributes: {
    address: {
      type: 'string'
    },
    addressPostalCode: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    creditCard: {
      type: 'string'
    },
    user: {
      model: 'user',
      required: true,
      unique: true
    }
  }
}