import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, model} = Mongoose;

const SALT_ROUNDS = 10;

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

// Hash the password before it is persisted, so plaintext never reaches the
// database. Only re-hashes when the password field actually changed.
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (error) {
    next(error);
  }
});

export default model('Patient', patientSchema);