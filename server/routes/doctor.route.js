import express from 'express';
import Doctor from '../models/doctor.js';

const router = express.Router();

// REGISTER Doctor
router.put('/register', (req, res, next) => {
  Doctor.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Doctors
router.get('/read', (req, res) => {
  Doctor.find().populate('hospital').populate('specialty')
  .then(data => res.json(data), error => next(error));
});

// EDIT Doctor
router.post('/edit', (req, res, next) => {
  Doctor.updateOne({email: req.body.email}, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// DELETE Doctor
router.delete('/delete', (req, res, next) => {
  Doctor.deleteOne(req.body, (error, data) => {
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