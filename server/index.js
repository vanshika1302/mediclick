import express from 'express';
import mongoose from 'mongoose';
const {connect} = mongoose;
import cors from 'cors';
import BodyParser from 'body-parser';
const {json, urlencoded} = BodyParser;
const port = process.env.PORT || 4000;
//const cookieParser = require('cookie-parser');
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
//app.use(cookieParser());
app.use(urlencoded({
  extended: true
}));
app.use(cors());

// Routes
import patientRoute from './routes/patient.route.js';
app.use('/patient', patientRoute);

import doctorRoute from './routes/doctor.route.js';
app.use('/doctor', doctorRoute);

import appointmentRoute from './routes/appointment.route.js';
app.use('/appointment', appointmentRoute);

import Patient from './models/patient.js';
import Doctor from './models/doctor.js';
import Session from './models/session.js';

app.post('/login', async (req, res) => {
  const Model = req.body.userType === 'patient' ? Patient : Doctor;
  await Model.findOne({email: req.body.email}, async (error, data) => {
    if (!data) {
      res.json({success: false, message: 'User does not exist!'});
    } else if (data.password !== req.body.password) {
      res.json({success: false, message: 'Password incorrect'});
    } else {
      res.json({success: true, userType: req.body.userType, ...data.toJSON()});
      // let cookieValue = await bcrypt.hash("secretword",10);
      // Session.create({cookie: cookieValue, email: req.body.email, userType: req.body.userType}, (error, sessionData) => {
      //   if(error) {
      //     res.json({success: false, message: 'Unable to create session'});
      //   } else {
      //     res.cookie('remember', cookieValue).json({success: true, userType: req.body.userType, ...data});
      //   }
      // });
    }
  });
});

app.post('/logout', async (req, res) => {
  // res.clearCookie().send(200);
  // const cookies = req.headers.cookie.split(';');
  // let cookieValue = null;
  // cookies.forEach(element => {
  //   if (element.split('=')[0].trim() === 'remember') {
  //     cookieValue = decodeURIComponent(element.split('=')[1].trim());
  //   }
  // });
  // Session.deleteOne({cookie: cookieValue}, (error, date) => {
  //   if (error) {
  //     console.log('Error deleting cookies!');
  //   } else {
  //     console.log('Cookies have been cleared');
  //   }
  // });
});

// 404 Error
app.use((req, res, next) => {
  //console.log(req.body);
  //next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Listen app
const server = app.listen(port, () => {
  console.log('Started server on port ' + port);
});