// src/components/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001/api';

const handleResponse = (promise) => {
  return promise
    .then((response) => response.data)
    .catch((error) => {
      console.error('API call error:', error);
      throw error;
    });
};

export const registerUser = (userData) => handleResponse(axios.post(`${API_URL}/register`, userData));
export const loginUser = (userData) => handleResponse(axios.post(`${API_URL}/login`, userData));
export const saveProfile = (profileData) => handleResponse(axios.post(`${API_URL}/profile`, profileData));
export const saveEducation = (educationData) => handleResponse(axios.post(`${API_URL}/education`, educationData));
export const saveExperience = (experienceData) => handleResponse(axios.post(`${API_URL}/experience`, experienceData));
