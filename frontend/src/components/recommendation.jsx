import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/UseAuthContext';
import './recommendation.css';

function Recommendations() {
    const { user } = useAuthContext();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNote, setShowNote] = useState(true);
    const motivationalMessage = "Great things come to those who prepare... Finding scholarships tailored to your profile.";
    const noteMessage = "Note: Some scholarships may show 'All Levels' as the eligibility, which means you can apply for Undergraduate, Master, and PhD All programs. Have an exciting day! if any query so have a chat with us.";

    useEffect(() => {
        if (user && user._id && user.token) {
            setTimeout(() => {
                fetchRecommendations(user._id, user.token);
            }, 5000); // 5-second delay for motivational message

            // Automatically hide the note after 30 seconds
            const noteTimeout = setTimeout(() => setShowNote(false), 30000);

            // Cleanup timeout on component unmount
            return () => clearTimeout(noteTimeout);
        } else {
            setLoading(false);
            setError('User data is incomplete for generating recommendations.');
        }
    }, [user]);

    const fetchRecommendations = async (userId, token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:3001/api/recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to fetch recommendations');
            }

            const data = await response.json();

            if (data.recommendations && data.recommendations.length === 0) {
                setError('No scholarships match your profile at the moment.');
            } else {
                setRecommendations(data.recommendations || []);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-message">
                <span>{motivationalMessage}</span>
                <div className="fetching-details">
                    <div className="spinner"></div>
                    <span>Fetching user details...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="recommendations-container">
            <h2>Recommended Scholarships</h2>
            {showNote && (
                <div className="note-container">
                    <p>{noteMessage}</p>
                    <button className="note-ok-button" onClick={() => setShowNote(false)}>OK</button>
                </div>
            )}
            {recommendations.length > 0 ? (
                <ul className="scholarship-list">
                    {recommendations.map((scholarship, index) => (
                        <li className="scholarship-item" key={index}>
                            <img src={scholarship.imageUrl} alt={scholarship.title} className="scholarship-image" />
                            <div>
                                <h3>{scholarship.title}</h3>
                                <p><strong>Country:</strong> {scholarship.country}</p>
                                <p><strong>Education Level:</strong> {scholarship.level}</p>
                                <p><strong>Courses:</strong> {scholarship.courses}</p>
                                <p><strong>Benefits:</strong> {scholarship.benefits}</p>
                                <a href={scholarship.link} className="apply-link" target="_blank" rel="noopener noreferrer">
                                    Apply Now
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-recommendations">No recommendations available at the moment.</p>
            )}
        </div>
    );
}

export default Recommendations;
