const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  age: {
    type: Number
  },
  city: {
    type: String
  },
  phone: {
    type: String
  }
}, {
    collection: 'patient'
});

module.exports = mongoose.model('patient', patientSchema);