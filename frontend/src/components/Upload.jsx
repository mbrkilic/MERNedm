import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.warning('Please select files to upload');
      return;
    }

    setLoading(true);
    setProgress(0);
    let successCount = 0;

    try {
      const token = localStorage.getItem('token');
      
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('image', files[i]);

        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          successCount++;
        }

        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      }

      if (successCount === files.length) {
        toast.success('All images uploaded successfully');
        navigate('/gallery');
      } else {
        toast.info(`${successCount} out of ${files.length} images uploaded successfully`);
      }
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Images</h2>
        <form onSubmit={handleUpload}>
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {files.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {files.length} file(s) selected
              </div>
            )}
          </div>

          {loading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-1">
                {Math.round(progress)}%
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={files.length === 0 || loading}
            className={`w-full ${
              loading || files.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-2 rounded transition duration-200`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <div className="grid grid-cols-2 gap-2">
              {Array.from(files).map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = Array.from(files);
                      newFiles.splice(index, 1);
                      setFiles(newFiles);
                      if (newFiles.length === 0) {
                        toast.info('All files removed');
                      }
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;