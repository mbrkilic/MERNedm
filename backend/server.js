const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const galleryRoutes = require('./routes/gallery');

const app = express();
app.use(express.json());

// CORS ayarı
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Statik görsellerin servisi
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route'lar
app.use('/api/gallery', galleryRoutes);

// Mongo bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
