import React from 'react';
import './template2.css';

const Template2 = ({ profileData, educationData, experienceData, certificatesData, awardsData, skillsData, interestsData, projectsData }) => {
  return (
    <div className="template2">
      <div className="header">
        <div className="profile-left">
          {profileData.profilePicture && (
            <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
          )}
        </div>
        <div className="profile-right">
          <h1 className="profile-name">{profileData.name}</h1>
          <p>{profileData.email}</p>
          <p>{profileData.phone}</p>
          <p>{profileData.address}</p>
        </div>
      </div>
      <div className="objective">
        <h2>Objective</h2>
        <p>{profileData.objective}</p>
      </div>
      <div className="section">
        <h2>Education</h2>
        {educationData.map((education, index) => (
          <div key={index}>
            <h3>{education.course}</h3>
            <p>{education.school}</p>
            <p>{education.grade}</p>
            <p>{new Date(education.year).getFullYear()}</p> {/* Format year */}
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Experience</h2>
        {experienceData.map((experience, index) => (
          <div key={index}>
            <h3>{experience.title}</h3>
            <p>{experience.company}</p>
            <p>{new Date(experience.startDate).toLocaleDateString()} - {new Date(experience.endDate).toLocaleDateString()}</p> {/* Format dates */}
            <p>{experience.details}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Skills</h2>
        {skillsData.map((skill, index) => (
          <div key={index}>
            <p>{skill}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Area of Interest</h2>
        {interestsData.map((interest, index) => (
          <div key={index}>
            <p>{interest}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Projects</h2>
        {projectsData.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Certificates</h2>
        {certificatesData.map((certificate, index) => (
          <div key={index}>
            <h3>{certificate.name}</h3>
            <p>{certificate.issuingOrganization}</p>
            <p>{new Date(certificate.date).toLocaleDateString()}</p> {/* Format date */}
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Awards</h2>
        {awardsData.map((award, index) => (
          <div key={index}>
            <h3>{award.title}</h3>
            <p>{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template2;
