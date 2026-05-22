const mongoose = require('../config/mockMongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  treatment: {
    type: String,
    required: [true, 'Treatment type is required'],
    enum: ['Hair Restoration', 'Skin Rejuvenation', 'Laser Therapy', 'Advanced Aesthetics', 'General Consultation'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
