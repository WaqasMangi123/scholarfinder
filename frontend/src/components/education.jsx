import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './datacontext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './education.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/UseAuthContext';
import FloatingProgressMeter from './progressmeter';

const Education = () => {
  const {
    profileCompletion, // Access profile completion from DataContext
    educationData, setEducationData,
    certificatesData, setCertificatesData,
    awardsData, setAwardsData
  } = useContext(DataContext);
  const { user } = useAuthContext();

  const [educations, setEducations] = useState(educationData.length ? educationData : [{ course: '', school: '', grade: '', year: new Date() }]);
  const [certificates, setCertificates] = useState(certificatesData.length ? certificatesData : [{ name: '', issuingOrganization: '', date: new Date() }]);
  const [awards, setAwards] = useState(awardsData.length ? awardsData : [{ title: '', description: '' }]);
  const [degreeLevel, setDegreeLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const degreeLevels = ["Intermediate", "Undergraduate", "Master", "PhD"];

  const validateFields = () => {
    for (const edu of educations) {
      if (!edu.course || !edu.school || !edu.grade || !edu.year) {
        setErrorMessage('All education fields must be filled.');
        return false;
      }
      if (isNaN(edu.grade)) {
        setErrorMessage('Grade must be numeric.');
        return false;
      }
      if (edu.year > new Date()) {
        setErrorMessage('Year cannot be in the future.');
        return false;
      }
    }

    for (const cert of certificates) {
      if (!cert.name || !cert.issuingOrganization || !cert.date) {
        setErrorMessage('All certificate fields must be filled.');
        return false;
      }
      if (cert.date > new Date()) {
        setErrorMessage('Certificate date cannot be in the future.');
        return false;
      }
    }

    for (const award of awards) {
      if (!award.title || !award.description) {
        setErrorMessage('All award fields must be filled.');
        return false;
      }
    }

    setErrorMessage('');
    return true;
  };

  const handleEducationChange = (index, event) => {
    const newEducations = educations.map((education, i) => {
      if (index === i) {
        return { ...education, [event.target.name]: event.target.value };
      }
      return education;
    });
    setEducations(newEducations);
  };

  const handleEducationDateChange = (index, date) => {
    if (date > new Date()) {
      alert('Year cannot be in the future.');
      return;
    }
    const newEducations = educations.map((education, i) => {
      if (index === i) {
        return { ...education, year: date };
      }
      return education;
    });
    setEducations(newEducations);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { course: '', school: '', grade: '', year: new Date() }]);
  };

  const handleDeleteEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleCertificateChange = (index, event) => {
    const newCertificates = certificates.map((certificate, i) => {
      if (index === i) {
        return { ...certificate, [event.target.name]: event.target.value };
      }
      return certificate;
    });
    setCertificates(newCertificates);
  };

  const handleCertificateDateChange = (index, date) => {
    if (date > new Date()) {
      alert('Date cannot be in the future.');
      return;
    }
    const newCertificates = certificates.map((certificate, i) => {
      if (index === i) {
        return { ...certificate, date: date };
      }
      return certificate;
    });
    setCertificates(newCertificates);
  };

  const handleAddCertificate = () => {
    setCertificates([...certificates, { name: '', issuingOrganization: '', date: new Date() }]);
  };

  const handleDeleteCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleAwardChange = (index, event) => {
    const newAwards = awards.map((award, i) => {
      if (index === i) {
        return { ...award, [event.target.name]: event.target.value };
      }
      return award;
    });
    setAwards(newAwards);
  };

  const handleAddAward = () => {
    setAwards([...awards, { title: '', description: '' }]);
  };

  const handleDeleteAward = (index) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    setEducationData(educations);
    setCertificatesData(certificates);
    setAwardsData(awards);

    const educationData = { degreeLevel, educations, certificates, awards };

    try {
      await axios.post('http://127.0.0.1:3001/api/education', educationData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Education data saved successfully!');
    } catch (error) {
      console.error('Error saving education data:', error);
      alert('Failed to save education data.');
    }
  };

  // Calculate completion percentages for the progress meter
  const calculateCompletion = () => {
    const educationCompletion = educations.reduce(
      (acc, edu) => acc + (edu.course && edu.school && edu.grade && edu.year ? 1 : 0),
      0
    ) / educations.length;

    const certificateCompletion = certificates.reduce(
      (acc, cert) => acc + (cert.name && cert.issuingOrganization && cert.date ? 1 : 0),
      0
    ) / certificates.length;

    const awardCompletion = awards.reduce(
      (acc, award) => acc + (award.title && award.description ? 1 : 0),
      0
    ) / awards.length;

    const educationProgress = ((educationCompletion + certificateCompletion + awardCompletion) / 3) * 100;
    return educationProgress;
  };

  const educationProgress = calculateCompletion();
  const totalProgress = (profileCompletion + educationProgress) / 2;

  return (
    <div className="education-page">
      <FloatingProgressMeter
        profileCompletion={profileCompletion}
        educationCompletion={educationProgress}
        experienceCompletion={0} // Placeholder for experience
        totalCompletion={totalProgress} // Updated total progress
      />

      <div className="header-container animated fadeInDown">
        <h1>Education</h1>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Note for education field */}
      <div className="alert alert-info">
        <p>
          Note: If you are currently pursuing an education and will complete it in one to two months, 
          you can write today's date as the year, and there will be no issue.
        </p>
      </div>

      {/* Degree Level */}
      <div className="form-group">
        <label>Highest Level of Degree</label>
        <select
          value={degreeLevel}
          onChange={(e) => setDegreeLevel(e.target.value)}
          className="form-control"
        >
          <option value="">Select Level</option>
          {degreeLevels.map((level, i) => (
            <option key={i} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Education Entries */}
      {educations.map((education, index) => (
        <div key={index} className="education-entry animated fadeIn">
          <h2>Education {index + 1}</h2>
          <div className="form-group">
            <label>Course / Degree</label>
            <input
              type="text"
              name="course"
              value={education.course}
              onChange={(e) => handleEducationChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>School / University</label>
            <input
              type="text"
              name="school"
              value={education.school}
              onChange={(e) => handleEducationChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
          <p className="form-text" style={{ color: '#ffffff' }}>
            Note:if you are choosing your higher level of degree as Intermediate so put percentage in numbers like 80 otherwise put CGPA
          </p>
            <label>Grade (Numeric Only)</label>
            <input
              type="number"
              name="grade"
              value={education.grade}
              onChange={(e) => handleEducationChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <DatePicker
              selected={education.year}
              onChange={(date) => handleEducationDateChange(index, date)}
              dateFormat="yyyy"
              showYearPicker
              className="date-picker form-control"
            />
          </div>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteEducation(index)}>
            Delete
          </button>
        </div>
      ))}

      {/* Certificates Section */}
      <div className="header-container animated fadeInDown">
        <h1>Certificates</h1>
      </div>
      <div className="alert alert-info">
        <p>
          Note: If you currently don't have any certifications, please fill the fields with "In future I will avail". 
          You can also delete this section if not required; deletion won't affect your data saving.
        </p>
      </div>

      {certificates.map((certificate, index) => (
        <div key={index} className="certificate-entry animated fadeIn">
          <h2>Certificate {index + 1}</h2>
          <div className="form-group">
            <label>Certificate Name</label>
            <input
              type="text"
              name="name"
              value={certificate.name}
              onChange={(e) => handleCertificateChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Issuing Organization</label>
            <input
              type="text"
              name="issuingOrganization"
              value={certificate.issuingOrganization}
              onChange={(e) => handleCertificateChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <DatePicker
              selected={certificate.date}
              onChange={(date) => handleCertificateDateChange(index, date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker form-control"
            />
          </div>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteCertificate(index)}>
            Delete
          </button>
        </div>
      ))}

      {/* Awards Section */}
      <div className="header-container animated fadeInDown">
        <h1>Awards</h1>
      </div>
      <div className="alert alert-info">
        <p>
          Note: If you don't have any awards, please fill the fields with "In future I will avail". 
          You can also delete this section if not required; deletion won't affect your data saving.
        </p>
      </div>

      {awards.map((award, index) => (
        <div key={index} className="award-entry animated fadeIn">
          <h2>Award {index + 1}</h2>
          <div className="form-group">
            <label>Award Title</label>
            <input
              type="text"
              name="title"
              value={award.title}
              onChange={(e) => handleAwardChange(index, e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={award.description}
              onChange={(e) => handleAwardChange(index, e)}
              className="form-control"
            />
          </div>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteAward(index)}>
            Delete
          </button>
        </div>
      ))}

      <div className="add-button-container">
        <button type="button" className="btn btn-primary add-button" onClick={handleAddAward}>
          Add Award
        </button>
      </div>

      <div className="form-group">
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="form-group">
        <Link to="/experience">
          <button type="button" className="btn btn-secondary">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Education;
