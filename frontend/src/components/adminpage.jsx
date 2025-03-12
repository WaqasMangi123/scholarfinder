import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './adminpage.css';

function AdminLogin() {
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // For showing popup notification
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ secretKey }),
            });

            const data = await response.json();

            if (data.isAdmin) {
                setMessage('Welcome, Admin!');
                setShowPopup(true); // Show popup on successful login
                setTimeout(() => {
                    setShowPopup(false); // Hide popup after a delay
                    navigate('/admindashboard'); // Redirect to admin dashboard
                }, 2000); // 2-second delay for showing popup
            } else {
                setMessage('Access Denied');
                setShowPopup(false);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Server error');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="secretKey">Enter Secret Key</label>
                    <input
                        type="password"
                        id="secretKey"
                        placeholder="Secret Key"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <p className="message">{message}</p>
                </form>
            </div>

            {/* Popup notification */}
            {showPopup && (
                <div className="popup">
                    <p>Welcome, Admin!</p>
                </div>
            )}
        </div>
    );
}

export default AdminLogin;
