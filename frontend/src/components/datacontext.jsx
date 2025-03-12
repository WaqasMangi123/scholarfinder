import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    objective: '',
    profilePicture: '' // Ensure profilePicture is initialized
  });

  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [awardsData, setAwardsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [interestsData, setInterestsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  // New progress state to track completion percentage
  const [progress, setProgress] = useState(0);

  // Function to update progress
  const updateProgress = (value) => setProgress(value);

  // Update `profileData` in a way that ensures it is reflected in all components
  const updateProfileData = (newData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...newData
    }));
  };

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData: updateProfileData, // Update profileData through this function
        educationData,
        setEducationData,
        experienceData,
        setExperienceData,
        certificatesData,
        setCertificatesData,
        awardsData,
        setAwardsData,
        skillsData,
        setSkillsData,
        interestsData,
        setInterestsData,
        projectsData,
        setProjectsData,
        progress,
        updateProgress // Added progress state and update function
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
