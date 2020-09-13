const mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

// Patient Model
const patientSchema = require('../models/patient');

// REGISTER Patient
router.put('/register', (req, res, next) => {
  patientSchema.create(req.body, (error, data) => {
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
  patientSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// EDIT Patient
router.post('/edit', (req, res, next) => {
  patientSchema.findByIdAndUpdate(req.params.id, {
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
  patientSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  })
})

module.exports = router;