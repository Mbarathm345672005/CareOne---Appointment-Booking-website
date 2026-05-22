const mongoose = require('../config/mockMongoose');

const contentSchema = new mongoose.Schema({
  pageSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
  sections: [{
    sectionId: String,
    title: String,
    subtitle: String,
    body: String,
    imageUrl: String,
    order: Number,
  }],
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
