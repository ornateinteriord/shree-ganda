import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PreWelcome.css';
import jsondata from '../Userprofile/profile/eduction/jsondata/data.json';

const PreWelcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    lookingFor: '',
    age: '',
    caste: '',
    mobileNumber: '',
    email: ''
  });

  const casteList = jsondata[0].casteValues || [];
  const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18); // Generates ages 18 to 100

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lookingFor || !formData.age || !formData.caste || !formData.mobileNumber || !formData.email) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/webenquire`, formData);
      
      if (response.data.success) {
        // Show our themed success dialog instead of just a toast
        setShowSuccessDialog(true);
        // Clear the form fields
        setFormData({
          lookingFor: '',
          age: '',
          caste: '',
          mobileNumber: '',
          email: ''
        });
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pre-welcome-container">
      {/* Success Dialog Overlay */}
      {showSuccessDialog && (
        <div className="custom-dialog-overlay">
          <div className="custom-dialog-box">
            <h2 className="dialog-title">Thank You!</h2>
            <p className="dialog-text">
              We appreciate your interest in Shreeganda Matrimony. Our dedicated team will review your details and communicate with you shortly.
            </p>
            <button 
              className="dialog-btn" 
              onClick={() => navigate('/home')}
            >
              Continue to Website
            </button>
          </div>
        </div>
      )}

      <button 
        className="top-register-btn" 
        onClick={() => navigate('/home')}
      >
        Register
      </button>

      <div className="pre-welcome-headings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/ShreeLogo.png" alt="Shreeganda Matrimony Logo" style={{ height: "100px", width: "auto", borderRadius: '8px', marginBottom: '10px' }} />
        <p className="tagline">Uniting Hearts, Creating Bonds</p>
      </div>

      <div className="search-widget-wrapper">
        <div className="search-widget-inner">
          <h2 className="search-title">
            <span className="dots">···</span> Find Your Perfect Match <span className="dots">···</span>
          </h2>
          
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-inputs-row-top">
              <select className="custom-select" name="lookingFor" value={formData.lookingFor} onChange={handleChange} required>
                <option value="" disabled hidden>I'm Looking For</option>
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
              </select>

              <select className="custom-select" name="age" value={formData.age} onChange={handleChange} required>
                <option value="" disabled hidden>Age</option>
                {ageOptions.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>

              <select className="custom-select" name="caste" value={formData.caste} onChange={handleChange} required>
                <option value="" disabled hidden>Caste</option>
                {casteList.map((caste, index) => (
                  <option key={index} value={caste}>{caste}</option>
                ))}
              </select>
            </div>
            
            <div className="form-inputs-row-bottom">
              <input 
                className="custom-input"
                type="tel" 
                name="mobileNumber" 
                placeholder="Mobile Number" 
                value={formData.mobileNumber} 
                onChange={handleChange} 
                required
              />

              <input 
                className="custom-input"
                type="email" 
                name="email" 
                placeholder="Email ID" 
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-action-row">
              <button type="submit" className="search-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Search Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreWelcome;
