import express from 'express';
import mongoose from 'mongoose';
const {connect} = mongoose;
import cors from 'cors';
import BodyParser from 'body-parser';
const {json, urlencoded} = BodyParser;
const port = process.env.PORT || 4000;
const mongoURL = 'mongodb://localhost:27017/mediclick';

// Connecting mongoDB Database
connect(mongoURL, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database successfully connected!');
},
  error => {
    console.log('Could not connect to database: ' + error);
  }
)

const app = express();
app.use(json());
app.use(urlencoded({
  extended: true
}));
app.use(cors());

// Routes
import patientRoute from './routes/patient.route.js';
app.use('/patient', patientRoute);

import doctorRoute from './routes/doctor.route.js';
app.use('/doctor', doctorRoute);

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Listen app
const server = app.listen(port, () => {
  console.log('Started server on port ' + port);
})