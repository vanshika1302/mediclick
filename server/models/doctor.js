import Mongoose from 'mongoose';
const {Schema, model} = Mongoose;

const hospitalSchema  = new Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
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
});
const Hospital = model('Hospital', hospitalSchema);

const specialitySchema = new Schema({
  code: {
      type: String,
      unique: true,
      required: true
  },
  name: {
      type: String,
      required: true
  }
});
const Speciality = model('Speciality', specialitySchema);

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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: 'Speciality',
    required: true
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: Hospital,
    required: true
  },
  phone: {
    type: String
  },
  availability: {
    type: availabilitySchema,
    required: true
  }
}, {
    collection: 'doctor'
});

export default model('Doctor', doctorSchema);