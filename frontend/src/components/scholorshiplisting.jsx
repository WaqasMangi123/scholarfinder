import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './scholorshiplisting.css';
import Select from 'react-select'; // Import react-select
import { useAuthContext } from '../../hooks/UseAuthContext';

const ScholarshipListing = () => {
  const { user } = useAuthContext();
  const [scholarships, setScholarships] = useState([]);
  const [bachelorScholarships, setBachelorScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [nameFilter, setNameFilter] = useState(''); // Added name filter
  const [levelFilter, setLevelFilter] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      if (!user || !user.token) {
        setError('Authorization token missing.');
        setLoading(false);
        return;
      }

      try {
        const scholarshipResponse = await axios.get('http://127.0.0.1:3001/api/scholarships', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const validScholarships = scholarshipResponse.data.filter((scholarship) => {
          return scholarship.title && scholarship.country && scholarship.level && scholarship.courses && scholarship.benefits && scholarship.deadline;
        });

        setScholarships(validScholarships);

        const bachelorResponse = await axios.get('http://127.0.0.1:3001/api/bachelorscholorship');

        const validBachelorScholarships = bachelorResponse.data.filter((scholarship) => {
          return scholarship.name && scholarship.country && scholarship.educationLevel && scholarship.subject && scholarship.funding && scholarship.deadline;
        });

        setBachelorScholarships(validBachelorScholarships);

        const combinedScholarships = [...validScholarships, ...validBachelorScholarships];
        setFilteredScholarships(combinedScholarships);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setError('Unauthorized access. Please log in to continue.');
          } else if (err.response.status === 404) {
            setError('No scholarships found. Please check back later.');
          } else {
            setError('Failed to load scholarships. Please try again later.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [user]);

  const cleanFilterOption = (value) => {
    return value.replace(/Host Country -|Level -|Country -/g, '').trim();
  };

  const validLevels = ['Bachelor', 'Master', 'PhD'];

  const normalizeLevel = (level) => {
    if (!level) return '';
    if (/postgraduate|master’s|master/i.test(level)) return 'Master';
    if (/undergraduate|bachelor/i.test(level)) return 'Bachelor';
    if (/phd|doctorate/i.test(level)) return 'PhD';
    return level;
  };

  const filterExpiredScholarships = (scholarshipsList) => {
    const today = new Date();
    return scholarshipsList.filter((scholarship) => {
      const deadline = scholarship.deadline ? new Date(scholarship.deadline) : null;
      return !deadline || deadline >= today;
    });
  };

  useEffect(() => {
    let updatedScholarships = filterExpiredScholarships([...scholarships, ...bachelorScholarships]);

    if (countryFilter) {
      updatedScholarships = updatedScholarships.filter((scholarship) =>
        cleanFilterOption(scholarship.country).toLowerCase().includes(countryFilter.toLowerCase())
      );
    }
    if (nameFilter) {
      updatedScholarships = updatedScholarships.filter((scholarship) =>
        (scholarship.title || scholarship.name || '').toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (levelFilter) {
      updatedScholarships = updatedScholarships.filter((scholarship) =>
        normalizeLevel(scholarship.level).includes(levelFilter) ||
        normalizeLevel(scholarship.educationLevel).includes(levelFilter)
      );
    }

    setFilteredScholarships(updatedScholarships);
  }, [countryFilter, nameFilter, levelFilter, scholarships, bachelorScholarships]);

  if (loading) {
    return <p className="loading-message">Loading scholarships...</p>;
  }

  const uniqueCountries = Array.from(
    new Set([...scholarships, ...bachelorScholarships].map((s) => cleanFilterOption(s.country)))
  ).sort();

  const countryOptions = uniqueCountries.map((country) => ({
    value: country,
    label: country,
  }));

  return (
    <div className="scholarship-listing">
      <h1>Available Scholarships</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Note message */}
      <div className="note-message">
        <p>
          Note: There are some scholarships offering all courses or all feild of study. You can click on a scholarship to view more details about its eligibility criteria, benefits, and application process.
        </p>
      </div>

      {/* Filter dropdowns */}
      <div className="filters">
        <Select
          options={countryOptions}
          isSearchable
          placeholder="Search or Select Country"
          onChange={(selectedOption) => setCountryFilter(selectedOption ? selectedOption.value : '')}
        />

        <select onChange={(e) => setLevelFilter(e.target.value)} value={levelFilter}>
          <option value="">Select Level</option>
          {validLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>

        {/* New input for scholarship name */}
        <input
          type="text"
          placeholder="Search by Scholarship Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      {/* Scholarship cards */}
      <div className="scholarship-container">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <div className="scholarship-card" key={scholarship._id || scholarship.link}>
              <h2>{scholarship.title || scholarship.name || 'No Title'}</h2>
              <p>
                <strong>Country:</strong> {cleanFilterOption(scholarship.country) || 'Not specified'}
              </p>
              <p>
                <strong>Level:</strong> {normalizeLevel(scholarship.level || scholarship.educationLevel) || 'Not specified'}
              </p>
              <p>
                <strong>Courses:</strong>{' '}
                {Array.isArray(scholarship.courses)
                  ? scholarship.courses.join(', ')
                  : scholarship.courses || cleanFilterOption(scholarship.subject) || 'Not specified'}
              </p>
              <p>
                <strong>Benefits:</strong> {scholarship.benefits || scholarship.funding || 'Not specified'}
              </p>
              <p>
                <strong>Deadline:</strong>{' '}
                {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : 'Not specified'}
              </p>
              {scholarship.imageUrl && (
                <img
                  src={scholarship.imageUrl}
                  alt={scholarship.title || scholarship.name || 'Scholarship Image'}
                  className="scholarship-image"
                />
              )}
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View details for ${scholarship.title || scholarship.name || 'this scholarship'}`}
              >
                View Details
              </a>
            </div>
          ))
        ) : (
          <p>No scholarships available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipListing;
