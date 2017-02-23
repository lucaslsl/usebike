module.exports = {
  attributes: {
    account: {
      model: 'account',
      required: true
    },
    type: {
      type: 'string',
      isIn: [
              'rental-charge', 'latefee-charge', 'insurance-charge', 
              'rental-refund', 'latefee-refund', 'insurance-refund'
            ],
      required: true
    },
    pickup: {
      model: 'pickup',
    },
    amount: {
      type: 'number',
      columnType: 'DOUBLE',
      required: true
    }
  }
}