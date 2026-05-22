const express = require('express');
const router = express.Router();
const { getAllPages, getPage, upsertPage, deletePage } = require('../controllers/contentController');
const { protect, adminOnly } = require('../middleware/auth');

// Public - read content
router.get('/', getAllPages);
router.get('/:slug', getPage);

// Admin - create/update/delete
router.put('/:slug', protect, adminOnly, upsertPage);
router.delete('/:slug', protect, adminOnly, deletePage);

module.exports = router;
