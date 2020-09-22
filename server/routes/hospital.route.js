import express from 'express';
import {Hospital} from '../models/doctor.js';

const router = express.Router();

// READ Hospitals
router.get('/read', (req, res) => {
  Hospital.find().then(data => res.json(data), error => console.log(error));
});

export default router;