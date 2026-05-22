const mongoose = require('../config/mockMongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  format: String,
  width: Number,
  height: Number,
  bytes: Number,
  folder: {
    type: String,
    default: 'careone',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
