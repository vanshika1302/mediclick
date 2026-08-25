import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, model} = Mongoose;

const SALT_ROUNDS = 10;

const hospitalSchema  = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, {collection: 'hospital'});
export const Hospital = model('Hospital', hospitalSchema);

const specialtySchema = new Schema({
  name: {
      type: String,
      required: true
  }
}, {collection: 'specialty'});
export const Specialty = model('Specialty', specialtySchema);

const availabilitySchema = new Schema({
  days: {
    type: [String],
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  }
});

const doctorSchema = new Schema({
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
  phone: {
    type: String
  },
  availability: {
    type: availabilitySchema,
    required: false
  },
  hospitalId: {
    type: "String",
    required: true
  },
  specialtyId: {
    type: String,
    required: true
  }
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    collection: 'doctor'
});

doctorSchema.virtual('specialty', {
  ref: 'Specialty',
  localField: 'specialtyId',
  foreignField: 'id',
  justOne: true
});

doctorSchema.virtual('hospital', {
  ref: 'Hospital',
  localField: 'hospitalId',
  foreignField: 'id',
  justOne: true
});

// Hash the password before it is persisted, so plaintext never reaches the
// database. Only re-hashes when the password field actually changed.
doctorSchema.pre('save', async function (next) {
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

export default model('Doctor', doctorSchema);