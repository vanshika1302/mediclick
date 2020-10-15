import Mongoose from 'mongoose';
const {Schema, model} = Mongoose;

const appointmentSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
  collection: 'appointment'
});

appointmentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

appointmentSchema.virtual('doctor', {
  ref: 'Doctor',
  localField: 'doctorEmail',
  foreignField: 'email',
  justOne: true
});

appointmentSchema.virtual('patient', {
  ref: 'Patient',
  localField: 'patientEmail',
  foreignField: 'email',
  justOne: true
});

export default model('Appointment', appointmentSchema);