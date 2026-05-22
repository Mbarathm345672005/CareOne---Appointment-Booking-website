const cloudinary = require('../config/cloudinary');
const Media = require('../models/Media');
const { Readable } = require('stream');

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

// @desc    Upload image to Cloudinary
// @route   POST /api/media/upload
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'careone',
      resource_type: 'image',
    });

    const media = await Media.create({
      filename: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      folder: 'careone',
      uploadedBy: req.user._id,
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all media
// @route   GET /api/media
exports.getAllMedia = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const media = await Media.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Media.countDocuments();

    res.json({
      media,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete media from Cloudinary and DB
// @route   DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    await cloudinary.uploader.destroy(media.publicId);
    await Media.findByIdAndDelete(req.params.id);

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
