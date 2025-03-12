import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './editor.css';

const Editor = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    organizations: '',
    certificates: '',
    languages: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Save the data (You can use local storage, API call, etc.)
    localStorage.setItem('resumeData', JSON.stringify(formData));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Full Name: ${formData.fullName}`, 10, 10);
    doc.text(`Address: ${formData.address}`, 10, 20);
    doc.text(`Email: ${formData.email}`, 10, 30);
    doc.text(`Phone: ${formData.phone}`, 10, 40);
    doc.text(`Education: ${formData.education}`, 10, 50);
    doc.text(`Experience: ${formData.experience}`, 10, 60);
    doc.text(`Skills: ${formData.skills}`, 10, 70);
    doc.text(`Projects: ${formData.projects}`, 10, 80);
    doc.text(`Organizations: ${formData.organizations}`, 10, 90);
    doc.text(`Certificates: ${formData.certificates}`, 10, 100);
    doc.text(`Languages: ${formData.languages}`, 10, 110);
    doc.text(`Interests: ${formData.interests}`, 10, 120);
    doc.save('resume.pdf');
  };

  return (
    <div className="editor">
      <h1>Edit Template {id}</h1>
      <form className="editor-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="projects">Projects</label>
          <input type="text" id="projects" name="projects" value={formData.projects} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="organizations">Organizations</label>
          <input type="text" id="organizations" name="organizations" value={formData.organizations} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="certificates">Certificates</label>
          <input type="text" id="certificates" name="certificates" value={formData.certificates} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="languages">Languages</label>
          <input type="text" id="languages" name="languages" value={formData.languages} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="interests">Interests</label>
          <input type="text" id="interests" name="interests" value={formData.interests} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
        <button type="button" onClick={handleDownload} className="btn btn-success">Download as PDF</button>
      </form>
    </div>
  );
};

export default Editor;
