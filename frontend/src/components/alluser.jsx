import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios by running 'npm install axios'
import './alluser.css';

const AllUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [educationLevel, setEducationLevel] = useState('');

  // Fetch all user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userdetailfetch'); // Fetch data from the backend
        console.log('API Response:', response.data); // Debug: Check if it contains all 5 users
        setUsersData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Filter users based on search query and education level
  const filterUsers = () => {
    return usersData.filter((user) => {
      const fullNameMatch = user.profile.fullName && user.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const educationLevelMatch = educationLevel ? user.education.some(edu => edu.degreeLevel === educationLevel) : true;

      return (fullNameMatch || searchQuery === '') && educationLevelMatch;
    });
  };

  // Handle loading, error, and filtered data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredUsers = filterUsers();
  console.log('Filtered Users:', filteredUsers); // Debug: Log the filtered users

  return (
    <div className="all-users-container">
      <h1 className="page-title">User Detail</h1>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
          <option value="">Select Education Level</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="table-container">
        {filteredUsers.length === 0 ? (
          <p className="empty-data">No matching users found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Profile Image</th>
                <th>Education Level</th>
                <th>Skills</th>
                <th>Interests</th>
                <th>Experience</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.profile.fullName || 'Not Available'}</td>
                  <td>{user.profile.email || 'Not Available'}</td>
                  <td>{user.profile.phoneNumber || 'Not Available'}</td>
                  <td>
                    <img
                      src={user.profile.profileImage || 'default-profile.jpg'}
                      alt={user.profile.fullName || 'Profile'}
                      className="profile-image"
                    />
                  </td>
                  <td>{user.education.length > 0 ? user.education.map(edu => edu.degreeLevel).join(', ') : 'Not Available'}</td>
                  <td>{user.skills.length > 0 ? user.skills.join(', ') : 'Not Available'}</td>
                  <td>{user.interests.length > 0 ? user.interests.join(', ') : 'Not Available'}</td>
                  <td>
                    {user.experience.length > 0 ? (
                      user.experience.map((exp, expIndex) => (
                        <div key={expIndex}>
                          <strong>{exp.company} ({new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()})</strong>
                          <p>{exp.title}</p>
                          <p>{exp.details}</p>
                        </div>
                      ))
                    ) : (
                      'Not Available'
                    )}
                  </td>
                  <td>
                    {user.projects.length > 0 ? (
                      user.projects.map((project, projIndex) => (
                        <div key={projIndex}>
                          <strong>{project.title}</strong>
                          <p>{project.description}</p>
                        </div>
                      ))
                    ) : (
                      'Not Available'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
