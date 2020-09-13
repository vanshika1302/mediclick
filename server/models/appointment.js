import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  time: String
});

export default model('Appointment', appointmentSchema);