// ScholarBot.jsx
import React from 'react';

const ScholarBot = () => {
  const openChatPopup = () => {
    // Open a new window with specific dimensions and no toolbar or address bar
    window.open(
      "https://huggingface.co/spaces/Scholarfinder/ScholarBot", // ScholarBot URL
      "ScholarBotChat",
      "width=400,height=600,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no,menubar=no"
    );
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
        onClick={openChatPopup}
      >
        💬 ScholarBot 
      </button>
    </div>
  );
};

export default ScholarBot;
