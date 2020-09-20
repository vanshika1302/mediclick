import Mongoose from 'mongoose';
const {Schema, model} = Mongoose;

const patientSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
    collection: 'patient'
});

export default model('Patient', patientSchema);