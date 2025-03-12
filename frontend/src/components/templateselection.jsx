import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // Ensure Footer component exists
import './templateselection.css';

const TemplateSelection = () => {
  const [showTemplatePopup, setShowTemplatePopup] = useState(true);

  const closePopup = () => {
    setShowTemplatePopup(false);
  };

  return (
    <div className="template-selection-page">
      {/* Popup Message */}
      {showTemplatePopup && (
        <div className="template-popup-overlay">
          <div className="template-popup-content">
            <h2>Download Your Details</h2>
            <p>
              You can download your profile details by selecting a template of your choice. If not, feel free to explore the
              recommended scholarships below.
            </p>
            <button className="template-popup-close-btn" onClick={closePopup}>
              Got It!
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="header-container">
        <h1 className="animated-heading">Choose a Template</h1>
        <p className="sub-heading">
          Select a professionally designed template to organize and showcase your details, or proceed to the scholarship section.
        </p>
      </div>

      {/* Template Cards Section */}
      <div className="templates-container">
        <Link to="/consolidated-view?template=template1">
          <div className="template-card">
            <img src="/template1.jpeg" alt="Template 1" className="template-image" />
            <p className="template-name">Template 1</p>
          </div>
        </Link>
        <Link to="/consolidated-view?template=template2">
          <div className="template-card">
            <img src="/template2.jpeg" alt="Template 2" className="template-image" />
            <p className="template-name">Template 2</p>
          </div>
        </Link>
      </div>

      {/* Divider Line */}
      <div className="divider"></div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <div className="recommendations-image-container">
          <img src="/recommend4.webp" alt="Scholarship Opportunities" className="recommendations-image" />
          <div className="recommendations-overlay">
            <h2>Looking for Recommended Scholarships?</h2>
            <p>
              Based on your selected template and profile, discover scholarships that match your qualifications. Don't miss out on
              opportunities tailored to you.
            </p>
            <Link to="/recommendation">
              <button className="recommendation-button">Go to Recommendations</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TemplateSelection;
