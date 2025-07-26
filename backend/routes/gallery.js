const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const upload = require('../middleware/multer');
const fs = require('fs');
const path = require('path');

// GET: Tüm görseller
router.get('/', async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
});

// POST: Yeni görsel yükleme
router.post('/', upload.single('image'), async (req, res) => {
  const newImage = new Gallery({ imageUrl: req.file.filename });
  await newImage.save();
  res.status(201).json(newImage);
});

// DELETE: Görsel sil
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Not found' });

    const filePath = path.join(__dirname, '../uploads', image.imageUrl);
    fs.unlinkSync(filePath);
    await image.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
