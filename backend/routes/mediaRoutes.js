const express = require('express');
const router = express.Router();
const { uploadMedia, getAllMedia, deleteMedia } = require('../controllers/mediaController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Admin only
router.post('/upload', protect, adminOnly, upload.single('image'), uploadMedia);
router.get('/', protect, adminOnly, getAllMedia);
router.delete('/:id', protect, adminOnly, deleteMedia);

module.exports = router;
