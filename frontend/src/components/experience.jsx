import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './datacontext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './experience.css';
import axios from 'axios';
import { useAuthContext } from '../../hooks/UseAuthContext';
import FloatingProgressMeter from './progressmeter';

const Experience = () => {
  const {
    experienceData, setExperienceData,
    skillsData, setSkillsData,
    interestsData, setInterestsData,
    projectsData, setProjectsData,
    progress, updateProgress
  } = useContext(DataContext);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState(experienceData.length ? experienceData : [{ company: '', title: '', startDate: new Date(), endDate: new Date(), details: '' }]);
  const [skills, setSkills] = useState(skillsData.length ? skillsData : ['']);
  const [interests, setInterests] = useState(interestsData.length ? interestsData : ['']);
  const [customInterests, setCustomInterests] = useState(['']);
  const [projects, setProjects] = useState(projectsData.length ? projectsData : [{ title: '', description: '' }]);
  const [errorMessage, setErrorMessage] = useState('');

  const interestOptions = [
    'Biology/Life Sciences', 'Computer & Information Systems', 'Engineering', 'Health Professions',
    'Mathematics', 'Chemistry', 'Applied Science', 'Medicine', 'Physics', 'Science and Technology',
    'Social Sciences', 'Environmental Studies', 'Law and Legal Studies', 'Education and Teaching',
    'Arts and Humanities', 'Business Administration', 'Other',
  ];

  const validateFields = () => {
    for (const exp of experiences) {
      if (!exp.company || !exp.title || !exp.startDate || !exp.endDate || !exp.details) {
        setErrorMessage('All fields in Experience must be filled.');
        return false;
      }
      if (exp.startDate >= exp.endDate) {
        setErrorMessage('Start date should be before the end date in Experience.');
        return false;
      }
    }

    for (const skill of skills) {
      if (!skill.trim()) {
        setErrorMessage('All Skills must be filled.');
        return false;
      }
    }

    for (const interest of interests) {
      if (!interest.trim()) {
        setErrorMessage('All Areas of Interest must be selected.');
        return false;
      }
    }

    for (const interest of interests) {
      if (interest === 'Other') {
        for (const customInterest of customInterests) {
          if (!customInterest.trim()) {
            setErrorMessage('Please specify your custom Area of Interest.');
            return false;
          }
        }
      }
    }

    for (const project of projects) {
      if (!project.title || !project.description) {
        setErrorMessage('All fields in Projects must be filled.');
        return false;
      }
    }

    setErrorMessage('');
    return true;
  };

  const handleExperienceChange = (index, event) => {
    const newExperiences = experiences.map((experience, i) =>
      index === i ? { ...experience, [event.target.name]: event.target.value } : experience
    );
    setExperiences(newExperiences);
  };

  const handleExperienceDateChange = (index, date, name) => {
    const newExperiences = experiences.map((experience, i) =>
      index === i ? { ...experience, [name]: date } : experience
    );
    setExperiences(newExperiences);
  };

  const handleSkillChange = (index, event) => {
    const newSkills = skills.map((skill, i) => (index === i ? event.target.value : skill));
    setSkills(newSkills);
  };

  const handleInterestChange = (index, event) => {
    const newInterests = interests.map((interest, i) => (index === i ? event.target.value : interest));
    setInterests(newInterests);

    if (event.target.value !== 'Other') {
      setCustomInterests((prev) => prev.map((_, i) => (i === index ? '' : prev[i])));
    }
  };

  const handleCustomInterestChange = (index, event) => {
    const newCustomInterests = customInterests.map((customInterest, i) => (index === i ? event.target.value : customInterest));
    setCustomInterests(newCustomInterests);
  };

  const handleProjectChange = (index, event) => {
    const newProjects = projects.map((project, i) =>
      index === i ? { ...project, [event.target.name]: event.target.value } : project
    );
    setProjects(newProjects);
  };

  const handleAddExperience = () => setExperiences([...experiences, { company: '', title: '', startDate: new Date(), endDate: new Date(), details: '' }]);
  const handleAddSkill = () => setSkills([...skills, '']);
  const handleAddInterest = () => {
    setInterests([...interests, '']);
    setCustomInterests([...customInterests, '']);
  };
  const handleAddProject = () => setProjects([...projects, { title: '', description: '' }]);

  const handleDeleteExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
  const handleDeleteSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const handleDeleteInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
    setCustomInterests(customInterests.filter((_, i) => i !== index));
  };
  const handleDeleteProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (!validateFields()) return;

    const mergedInterests = interests.map((interest, index) =>
      interest === 'Other' ? customInterests[index] : interest
    );

    // Save data to DataContext
    setExperienceData(experiences);
    setSkillsData(skills);
    setInterestsData(mergedInterests);
    setProjectsData(projects);

    const experienceData = { experienceData: experiences, skills, interests: mergedInterests, projects };

    try {
      await axios.post('http://127.0.0.1:3001/api/experience', experienceData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Experience data saved successfully!');
    } catch (error) {
      console.error('Error saving experience data:', error);
      alert('Failed to save experience data.');
    }
  };

  const handleProceed = () => {
    if (validateFields()) {
      handleSave();
      navigate('/templateselection');
    }
  };

  // Calculate completion percentages for progress meter
  const calculateCompletion = () => {
    const experienceCompletion = experiences.reduce(
      (acc, exp) => acc + (exp.company && exp.title && exp.startDate && exp.endDate && exp.details ? 1 : 0),
      0
    ) / experiences.length;

    const skillCompletion = skills.reduce((acc, skill) => acc + (skill.trim() ? 1 : 0), 0) / skills.length;

    const interestCompletion = interests.reduce(
      (acc, interest, index) => acc + (interest.trim() && (interest !== 'Other' || customInterests[index].trim()) ? 1 : 0),
      0
    ) / interests.length;

    const projectCompletion = projects.reduce(
      (acc, proj) => acc + (proj.title && proj.description ? 1 : 0),
      0
    ) / projects.length;

    const experienceSectionCompletion = (experienceCompletion + skillCompletion + interestCompletion + projectCompletion) / 4 * 100;
    updateProgress(experienceSectionCompletion); // Update progress in DataContext
    return experienceSectionCompletion;
  };

  const experienceCompletion = calculateCompletion();

  return (
    <div className="experience-page">
      {/* Floating Progress Meter */}
      <FloatingProgressMeter
        profileCompletion={progress} // use progress from context for overall consistency
        educationCompletion={0} // Set education completion here if needed
        experienceCompletion={experienceCompletion}
      />

      <div className="header-container animated fadeInDown">
        <h1>Experience</h1>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Note for Experience */}
      <div className="alert alert-info">
        <p>
          Note: If you have work experience, fill it here. If you don't, you can write "In future I will gain
          experience". You can also delete this section if not required.
        </p>
      </div>

      {/* Experience Form Fields */}
      {experiences.map((experience, index) => (
        <div key={index} className="experience-entry animated fadeIn">
          <h2>Experience {index + 1}</h2>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="company" value={experience.company} onChange={(e) => handleExperienceChange(index, e)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" value={experience.title} onChange={(e) => handleExperienceChange(index, e)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <DatePicker
              selected={experience.startDate}
              onChange={(date) => {
                if (experience.endDate && date >= experience.endDate) {
                  alert('Start date must be before end date.');
                } else {
                  handleExperienceDateChange(index, date, 'startDate');
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="date-picker form-control"
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <DatePicker
              selected={experience.endDate}
              onChange={(date) => {
                if (experience.startDate && date <= experience.startDate) {
                  alert('End date must be after start date.');
                } else {
                  handleExperienceDateChange(index, date, 'endDate');
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="date-picker form-control"
            />
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea name="details" value={experience.details} onChange={(e) => handleExperienceChange(index, e)} className="form-control"></textarea>
          </div>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteExperience(index)}>Delete Experience</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary add-button" onClick={handleAddExperience}>Add Experience</button>

      {/* Skills Section */}
      <div className="header-container animated fadeInDown">
        <h1>Skills</h1>
      </div>
      <div className="alert alert-info">
        <p>
          Note: Write down your skills. If you don't have specific skills, you can write "To be developed". You can also delete this section if not required.
        </p>
      </div>

      {/* Skills Fields */}
      {skills.map((skill, index) => (
        <div key={index} className="form-group animated fadeIn">
          <label>Skill {index + 1}</label>
          <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e)} className="form-control" />
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteSkill(index)}>Delete Skill</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary add-button" onClick={handleAddSkill}>Add Skill</button>

      {/* Interests Section */}
      <div className="header-container animated fadeInDown">
        <h1>Area of Interest</h1>
      </div>
      <div className="alert alert-info">
        <p>
          Note: Select your area of interest. If your area of interest is not in the options, select "Other" and add your custom area of interest. This section is mandatory.
        </p>
      </div>

      {interests.map((interest, index) => (
        <div key={index} className="form-group animated fadeIn">
          <label>Interest {index + 1}</label>
          <select value={interest} onChange={(e) => handleInterestChange(index, e)} className="form-control">
            <option value="">Select an area of interest</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {interest === 'Other' && (
            <input
              type="text"
              placeholder="Enter your area of interest"
              value={customInterests[index]}
              onChange={(e) => handleCustomInterestChange(index, e)}
              className="form-control mt-2"
            />
          )}
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteInterest(index)}>Delete Interest</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary add-button" onClick={handleAddInterest}>Add Interest</button>

      {/* Projects Section */}
      <div className="header-container animated fadeInDown">
        <h1>Projects</h1>
      </div>
      <div className="alert alert-info">
        <p>
          Note: Mention your projects here. If you don't have any, you can delete section.
        </p>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="form-group animated fadeIn">
          <label>Project Title {index + 1}</label>
          <input type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} className="form-control" />
          <label>Description</label>
          <textarea name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} className="form-control"></textarea>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteProject(index)}>Delete Project</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary add-button" onClick={handleAddProject}>Add Project</button>

      {/* Save and Proceed Buttons */}
      <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
      <button type="button" className="btn btn-primary" onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default Experience;
