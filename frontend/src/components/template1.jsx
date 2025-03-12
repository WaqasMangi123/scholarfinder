import React from 'react';
import './template1.css';

const Template1 = ({
  profileData,
  educationData,
  experienceData,
  certificatesData,
  awardsData,
  skillsData,
  interestsData,
  projectsData
}) => {
  return (
    <div className="template1">
      <div className="left-section">
        {profileData.profilePicture && (
          <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
        )}
        <h1>{profileData.name}</h1>
        <p>{profileData.email}</p>
        <p>{profileData.phone}</p>
        <p>{profileData.address}</p>
        <div className="section">
          <h2>Skills</h2>
          {Array.isArray(skillsData) && skillsData.length > 0 ? (
            skillsData.map((skill, index) => <p key={index}>{skill}</p>)
          ) : (
            <p>No skills available.</p>
          )}
        </div>
        <div className="section">
          <h2>Certificates</h2>
          {Array.isArray(certificatesData) && certificatesData.length > 0 ? (
            certificatesData.map((certificate, index) => (
              <div key={index}>
                <h3>{certificate.name}</h3>
                <p>{certificate.issuingOrganization}</p>
                <p>{new Date(certificate.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No certificates available.</p>
          )}
        </div>
      </div>

      <div className="right-section">
        <div className="section">
          <h2>Objective</h2>
          <p>{profileData.objective}</p>
        </div>
        <div className="section">
          <h2>Education</h2>
          {Array.isArray(educationData) && educationData.length > 0 ? (
            educationData.map((education, index) => (
              <div key={index}>
                <h3>{education.course}</h3>
                <p>{education.school}</p>
                <p>{education.grade}</p>
                <p>{new Date(education.year).getFullYear()}</p>
              </div>
            ))
          ) : (
            <p>No education data available.</p>
          )}
        </div>
        <div className="section">
          <h2>Experience</h2>
          {Array.isArray(experienceData) && experienceData.length > 0 ? (
            experienceData.map((experience, index) => (
              <div key={index}>
                <h3>{experience.title}</h3>
                <p>{experience.company}</p>
                <p>
                  {new Date(experience.startDate).toLocaleDateString()} -{' '}
                  {new Date(experience.endDate).toLocaleDateString()}
                </p>
                <p>{experience.details}</p>
              </div>
            ))
          ) : (
            <p>No experience data available.</p>
          )}
        </div>
        <div className="section">
          <h2>Projects</h2>
          {Array.isArray(projectsData) && projectsData.length > 0 ? (
            projectsData.map((project, index) => (
              <div key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
        <div className="section">
          <h2>Awards</h2>
          {Array.isArray(awardsData) && awardsData.length > 0 ? (
            awardsData.map((award, index) => (
              <div key={index}>
                <h3>{award.title}</h3>
                <p>{award.description}</p>
              </div>
            ))
          ) : (
            <p>No awards available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
