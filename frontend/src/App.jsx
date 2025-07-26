import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import { Footer } from './components/Footer';
import AdminGalleryPanel from './pages/AdminGalleryPanel';


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      
        <Navbar />
        <div className=" mx-auto px-4 py-8">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route path="/admin" element={<AdminGalleryPanel />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <ToastContainer />
      <Footer />
        </div>
      
    </Router>
  );
};

export default App;