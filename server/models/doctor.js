import Mongoose from 'mongoose';
const {Schema, model} = Mongoose;

const hospitalSchema  = new Schema({
  id: {
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
}, {collection: 'hospital'});
const Hospital = model('Hospital', hospitalSchema);

const specialtySchema = new Schema({
  id: {
      type: String,
      unique: true,
      required: true
  },
  name: {
      type: String,
      required: true
  }
}, {collection: 'specialty'});
const Specialty = model('Specialty', specialtySchema);

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
    required: true
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

export default model('Doctor', doctorSchema);