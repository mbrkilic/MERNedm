import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminGalleryPanel = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = 'https://your-backend.onrender.com'; // <- GÜNCELLE

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error('Görseller alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert('Lütfen bir dosya seçin.');

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      await axios.post(`${backendURL}/api/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Yükleme başarılı!');
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error('Yükleme hatası:', err);
      alert('Yükleme başarısız.');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Bu görseli silmek istediğinize emin misiniz?')) return;

    try {
      await axios.delete(`${backendURL}/api/gallery/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.error('Silme hatası:', err);
      alert('Silme işlemi başarısız.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Galeri Paneli</h1>

      <div className="flex items-center mb-6 space-x-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Yükleniyor...' : 'Yükle'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={`${backendURL}/uploads/${img.imageUrl}`}
              alt="gallery"
              className="w-full h-48 object-cover rounded shadow"
            />
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hidden group-hover:block"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGalleryPanel;
