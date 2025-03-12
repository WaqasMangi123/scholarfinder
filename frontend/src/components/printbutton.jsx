import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import ConsolidatedView from './consolidatedview';

const PrintButton = ({ template }) => {
  const componentRef = useRef();

  // Inline styles for the button container and the button
  const containerStyle = {
    position: 'fixed', // Fix the position on the screen
    top: '10px', // Place the button at the top of the page
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000, // Ensure it stays above other elements
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
  };

  const handleHoverStyle = {
    backgroundColor: '#0056b3', // Darker blue on hover
  };

  return (
    <div style={containerStyle}>
      <ReactToPrint
        trigger={() => (
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, handleHoverStyle)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Download PDF
          </button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <ConsolidatedView ref={componentRef} template={template} />
      </div>
    </div>
  );
};

export default PrintButton;
