import Mongoose from 'mongoose';
const {Schema, model} = Mongoose;

const sessionSchema = new Schema({
  cookie: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
}, {
    collection: 'session'
});

export default model('Session', sessionSchema);