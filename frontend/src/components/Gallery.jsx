import { useEffect, useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAdmin = localStorage.getItem('token');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]); // eslint-disable-line

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-40">
      <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div 
            key={image._id} 
            className="relative group break-inside-avoid mb-4"
          >
            <img
              src={`http://localhost:5000/${image.filePath}`}
              alt="Gallery"
              className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(image, index)}
            />
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image._id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl mx-auto px-4" onClick={e => e.stopPropagation()}>
            <img
              src={`http://localhost:5000/${selectedImage.filePath}`}
              alt="Selected"
              className="max-h-[90vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl"
            />
            
            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
              onClick={goToPrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
              onClick={goToNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
