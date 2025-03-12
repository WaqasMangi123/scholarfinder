import React from 'react';
import './admindashboard.css';
import { FaUsers, FaTools, FaServer, FaBlog, FaDatabase } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Send a message or perform any necessary cleanup actions
        alert("You have been logged out successfully!");

        // Redirect to the front page
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to your admin control panel</p>
            </header>

            <div className="dashboard-grid">
                {/* User Management Section */}
                <div className="dashboard-card">
                    <FaUsers className="card-icon" />
                    <h2>User Management</h2>
                    <p>Manage user profiles, control access, and monitor activity.</p>
                    <div className="card-actions">
                        <Link to="/alluser">
                            <button>User full detail</button>
                        </Link>
                        
                    </div>
                </div>

                {/* Scraping Details Section */}
                <div className="dashboard-card">
                    <FaTools className="card-icon" />
                    <h2>Scraping Website Details</h2>
                    <p>Configure, monitor, and log data scraping activities.</p>
                    <div className="card-actions">
                        <button onClick={() => window.location.href = '/scrappingwebsitedetail'}>
                            View Scraping Website Details
                        </button>
                    </div>
                </div>

                {/* Manage Blogs Section */}
                <div className="dashboard-card">
                    <FaBlog className="card-icon" />
                    <h2>Manage Blogs</h2>
                    <p>View, add, and update blog posts for your site.</p>
                    <div className="card-actions">
                        <Link to="/adminblogs">
                            <button>Go to Blog Management</button>
                        </Link>
                    </div>
                </div>

                {/* Real-Time Data Section */}
                <div className="dashboard-card">
                    <FaServer className="card-icon" />
                    <h2>Graph And Reports</h2>
                    <p>check the succes ratio on the basis of graph</p>
                    <div className="card-actions">
                        <Link to="/realtimedata">
                            <button>View Details</button>
                        </Link>
                    </div>
                </div>

                {/* Log in to Database Section */}
                <div className="dashboard-card">
                    <FaDatabase className="card-icon" />
                    <h2>Log in to Database</h2>
                    <p>Access and explore the database directly from here.</p>
                    <div className="card-actions">
                        <a 
                            href="https://cloud.mongodb.com/v2/66ced957e0ff0514617f8662#/metrics/replicaSet/66ceda337b25a26b267b2385/explorer/mydatabase/bachelorscholarships/find" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <button>Go to Database</button>
                        </a>
                    </div>
                </div>

                {/* Chat and Email Section */}
                <div className="dashboard-card">
                    <h2>Communication</h2>
                    <p>Contact users through chat or email for support.</p>
                    <div className="card-actions">
                        <a href="https://dashboard.tawk.to/#/dashboard/672012492480f5b4f5955a11" target="_blank" rel="noopener noreferrer">
                            <button>Chat Support</button>
                        </a>
                        <a href="https://dashboard.emailjs.com/admin" target="_blank" rel="noopener noreferrer">
                            <button>Email Support</button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="logout-section">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
