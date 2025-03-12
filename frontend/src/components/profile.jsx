import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './datacontext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';
import { useAuthContext } from '../../hooks/UseAuthContext';
import FloatingProgressMeter from './progressmeter';

const Profile = () => {
  const { profileData, setProfileData, updateProgress, progress } = useContext(DataContext);
  const [formData, setFormData] = useState(profileData || {});
  const { user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.data) {
          setFormData(response.data);
          setProfileData(response.data); // Update context with fetched data
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [user.token, setProfileData]);

  // Calculate and update completion percentage
  const calculateCompletion = () => {
    const totalFields = 4;
    const filledFields = ['name', 'address', 'phone', 'objective'].reduce(
      (count, field) => count + (formData[field] ? 1 : 0),
      0
    );
    const completion = (filledFields / totalFields) * 100;
    updateProgress(completion); // Update progress in DataContext
    return completion;
  };

  useEffect(() => {
    calculateCompletion();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check for word count in the objective field
    if (name === "objective") {
      const wordCount = value.trim().split(/\s+/).length; // Count words
      if (wordCount > 70) {
        setErrorMessage("Objective cannot exceed 70 words.");
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 4 * 1024 * 1024;

    if (file && !allowedTypes.includes(file.type)) {
      setErrorMessage('Only JPEG, JPG, and PNG formats are allowed.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (file && file.size > maxSize) {
      setErrorMessage('File size should be less than 4MB.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePicture: reader.result,
      });
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: reader.result,
      })); // Update profilePicture in context
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const { name, address, phone, objective } = formData;
    if (!name || !address || !phone || !objective) {
      setErrorMessage('All fields are required. Please fill out all fields.');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }
    return true;
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    try {
      await axios.post('http://127.0.0.1:3001/api/profile', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSuccessMessage('Profile saved successfully!');
      setProfileData(formData); // Update context with saved data
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleSave = async () => {
    await saveProfile();
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!successMessage) {
      const confirmSave = window.confirm(
        'You have not saved your profile yet. Would you like to save it before proceeding to the next step?'
      );

      if (confirmSave) {
        saveProfile().then(() => {
          if (validateForm()) {
            navigate('/education'); // Navigate to the next page if saving is successful
          }
        });
      }
    } else {
      navigate('/education'); // Navigate to the next page if already saved
    }
  };

  return (
    <div className="profile-page">
      <FloatingProgressMeter
        profileCompletion={progress} // Use the stored progress
        educationCompletion={0}
        experienceCompletion={0}
      />

      <div className="instruction-box">
        <p>
          Note: Please do not leave any fields empty. If you lack experience or have not set any objectives,
          consider filling with terms like "Not yet determined" or "In progress". This will ensure your profile
          is complete, and you won’t miss any scholarship opportunities.
        </p>
        <p>
          Note: There is a progress meter on the bottom left of the page. You can check how much of your profile is complete.
        </p>
        <p>
          Note: There is a Scholorbot Chat on the downside left of the page. If you cant understand anything so ask to ScholarBot.
        </p>
      </div>

      <div className="overlay">Complete your profile</div>
      <div className="container">
        <h1>Profile {user.userName}</h1>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Full Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Address"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={user.email || ''}
            placeholder="Email"
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-control"
          />
        </div>
        <div className="form-group">
        <p className="form-text" style={{ color: '#007bff' }}>
            Note: objective words should not exceed 70 words
          </p>
          <textarea
            name="objective"
            value={formData.objective || ''}
            onChange={handleChange}
            placeholder="Objective"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <p className="form-text" style={{ color: '#007bff' }}>
           Note: Upload a JPEG, JPG, or PNG image not larger than 4MB.
          </p>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            accept=".jpeg, .jpg, .png"
            className="form-control-file"
          />
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile Preview"
              className="profile-preview"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
        </div>

        <div className="form-buttons">
          <button onClick={handleSave} className="btn btn-save">
            Save
          </button>
          <button className="btn btn-next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
