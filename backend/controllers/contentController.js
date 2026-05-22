const Content = require('../models/Content');

// @desc    Get all pages
// @route   GET /api/content
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Content.find().select('pageSlug pageTitle status updatedAt').sort({ updatedAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single page by slug
// @route   GET /api/content/:slug
exports.getPage = async (req, res) => {
  try {
    const page = await Content.findOne({ pageSlug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update page content (Admin)
// @route   PUT /api/content/:slug
exports.upsertPage = async (req, res) => {
  try {
    const { pageTitle, sections, status } = req.body;

    const page = await Content.findOneAndUpdate(
      { pageSlug: req.params.slug },
      {
        pageSlug: req.params.slug,
        pageTitle,
        sections,
        status,
        lastEditedBy: req.user._id,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete page (Admin)
// @route   DELETE /api/content/:slug
exports.deletePage = async (req, res) => {
  try {
    const page = await Content.findOneAndDelete({ pageSlug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
