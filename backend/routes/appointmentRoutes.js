const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect, adminOnly } = require('../middleware/auth');

// Public - anyone can book (optionally authenticated)
router.post('/', createAppointment);

// Protected - patient's own appointments
router.get('/my', protect, getMyAppointments);

// Admin - get all, update status
router.get('/', protect, adminOnly, getAppointments);
router.put('/:id', protect, adminOnly, updateAppointment);

module.exports = router;
