const mongoose = require('mongoose');
const specialitySchema = require('./speciality');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
  speciality: {
      type: specialitySchema
  },
  city: {
    type: String
  },
  phone: {
    type: String
  },
  days: {
      type: [String]
  },
  time

}, {
    collection: 'doctor'
});

module.exports = mongoose.model('doctor', doctorSchema);