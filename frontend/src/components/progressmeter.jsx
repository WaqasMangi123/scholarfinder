import React, { useState } from 'react';
import './progressmeter.css';

const FloatingProgressMeter = ({ profileCompletion, educationCompletion, experienceCompletion }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle visibility of the progress tooltip
  const toggleMeter = () => {
    setIsOpen(!isOpen);
  };

  // Check if all values are valid numbers before calculating the overall completion
  const isCalculating =
    profileCompletion === undefined ||
    educationCompletion === undefined ||
    experienceCompletion === undefined;

  // Calculate the overall completion percentage if valid, otherwise show "Calculating"
  const overallCompletion = isCalculating
    ? "Calculating..."
    : Math.round(
        (profileCompletion + educationCompletion + experienceCompletion) / 3
      );

  return (
    <div className="floating-progress-meter">
      {/* Floating button to display overall progress */}
      <button
        className={`progress-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMeter}
      >
        {typeof overallCompletion === "number" ? `${overallCompletion}% Complete` : overallCompletion}
      </button>

      {/* Progress tooltip */}
      {isOpen && (
        <div className="progress-tooltip">
          <h4>Progress Meter</h4>
          <div className="progress-details">
            <p>
              <span className="section-name">Profile:</span>{" "}
              {profileCompletion !== undefined
                ? `${Math.round(profileCompletion)}%`
                : "Calculating..."}
            </p>
            <p>
              <span className="section-name">Education:</span>{" "}
              {educationCompletion !== undefined
                ? `${Math.round(educationCompletion)}%`
                : "Calculating..."}
            </p>
            <p>
              <span className="section-name">Experience:</span>{" "}
              {experienceCompletion !== undefined
                ? `${Math.round(experienceCompletion)}%`
                : "Calculating..."}
            </p>
          </div>
          <div className="progress-overall">
            <strong>
              Overall Progress:{" "}
              {typeof overallCompletion === "number"
                ? `${overallCompletion}%`
                : "Calculating..."}
            </strong>
          </div>
          <button className="close-button" onClick={toggleMeter}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingProgressMeter;
