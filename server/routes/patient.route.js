import express from 'express';
import Patient from '../models/patient.js';
const router = express.Router();

// REGISTER Patient
router.put('/register', (req, res, next) => {
  Patient.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

// READ Students
router.get('/read', (req, res) => {
  Patient.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// EDIT Patient
router.post('/edit', (req, res, next) => {
  Patient.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// DELETE Patient
router.delete('/delete', (req, res, next) => {
  Patient.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  })
})

export default router;