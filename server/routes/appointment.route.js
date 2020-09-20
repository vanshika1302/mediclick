import express from 'express';
import Appointment from '../models/appointment.js';
const router = express.Router();

// CREATE new appointment
router.put('/create', (req, res, next) => {
  Appointment.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// GET appointments
router.get('/read', (req, res) => {
  Appointment.find(req.body)
  .populate({path: 'doctor', populate: {path: 'hospital'}})
  .populate('patient')
  .then(data => res.json(data), error => next(error));
});

// DELETE appointment
router.delete('/delete', (req, res, next) => {
  Appointment.deleteOne(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

export default router;