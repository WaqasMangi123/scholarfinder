import React, { useState, useEffect } from 'react';
import './scrappingwebsitedetail.css'; // Import the CSS file for styling

const ScrapingDetails = () => {
  const [websites, setWebsites] = useState([
    {
      name: "StudyAbroad.pk - All Popular Scholarships",
      url: "https://www.studyabroad.pk/all-popular-scholarships/",
    },
    {
      name: "Masterportal - Scholarships Search",
      url: "https://www.mastersportal.com/search/scholarships/master/agriculture-forestry?ci=56,11,28,202,30,82",
    },
    {
      name: "ScholarshipAds",
      url: "https://www.scholarshipsads.com/search/?nationality%5B%5D=&country%5B%5D=&degree%5B%5D=441&subject%5B%5D=&funding%5B%5D=&page=2",
    },
    {
      name: "StudyAbroad.pk - Scholarships Search",
      url: "https://www.studyabroad.pk/scholarships/search?studyid=-1&levelid=36&countryid=-1&submit=search",
    },
    {
      name: "StudyAbroad.pk - All Popular Scholarships",
      url: "https://www.studyabroad.pk/all-popular-scholarships/",
    },
    {
      name: "Bachelor Scholarships - Scholarships Search",
      url: "https://www.scholarshipsads.com/search/?nationality%5B%5D=&country%5B%5D=&degree%5B%5D=439&subject%5B%5D=&funding%5B%5D=&page=1",
    },
  ]);

  const [nextScrapDate, setNextScrapDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newWebsite, setNewWebsite] = useState({ name: '', url: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Initialize scraping date and update the real-time clock
  useEffect(() => {
    const lastScrapDate = localStorage.getItem('lastScrapDate');
    if (lastScrapDate) {
      calculateNextScrapDate(new Date(lastScrapDate));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update current time every second

    // Set reminder if next scrape date is reached
    const reminderTimer = setInterval(() => {
      if (nextScrapDate && currentTime >= nextScrapDate) {
        triggerPopup('It’s time to scrape again!');
      }
    }, 1000 * 60); // Check every minute

    return () => {
      clearInterval(timer); // Clear time update interval
      clearInterval(reminderTimer); // Clear reminder check interval
    };
  }, [currentTime, nextScrapDate]);

  // Calculate the next scraping date
  const calculateNextScrapDate = (lastDate) => {
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 14); // Add 14 days
    setNextScrapDate(nextDate);
  };

  // Display a popup notification
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  // Handle scraping
  const handleScrapClick = () => {
    if (nextScrapDate && currentTime < nextScrapDate) {
      // Calculate remaining days
      const remainingTime = nextScrapDate - currentTime;
      const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      alert(`You recently scraped. Please wait ${remainingDays} day(s) before scraping again.`);
      return; // Exit without updating the scrape date
    }

    // Allow scraping
    const today = new Date();
    localStorage.setItem('lastScrapDate', today.toISOString());
    calculateNextScrapDate(today);
    triggerPopup('Scraping completed successfully!');
  };

  // Add a new website to the list
  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.url) {
      setWebsites([...websites, newWebsite]);
      setNewWebsite({ name: '', url: '' }); // Reset input fields
      triggerPopup('Website added successfully!');
    } else {
      triggerPopup('Please provide both name and URL for the website.');
    }
  };

  // Calculate countdown to next scraping time
  const calculateCountdown = () => {
    if (!nextScrapDate) return 'Not set';
    const diff = nextScrapDate - currentTime;
    if (diff <= 0) return 'Ready to scrap now!';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="scraping-details-page">
      <div className="scraping-details-container">
        <h1>Scraping Website Details</h1>
        <p className="info-text">
          Manage the websites for scraping. Add new websites, set scraping schedules, and track the countdown to the next scraping.
        </p>

        {/* Popup notification */}
        {showPopup && (
          <div className="popup-notification">
            <p>{popupMessage}</p>
          </div>
        )}

        {/* Real-time clock */}
        <div className="real-time-clock">
          <p>Current Time: {currentTime.toLocaleTimeString()}</p>
          <p>Last Scraped On: {localStorage.getItem('lastScrapDate') ? new Date(localStorage.getItem('lastScrapDate')).toLocaleString() : 'Not Scraped Yet'}</p>
          <p>Next Scraping Time: {nextScrapDate ? nextScrapDate.toLocaleString() : 'Not set'}</p>
          <p>Countdown: {calculateCountdown()}</p>
        </div>

        {/* Form to add a new website */}
        <div className="add-website-form">
          <h3>Add New Website</h3>
          <input
            type="text"
            placeholder="Website Name"
            value={newWebsite.name}
            onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
          />
          <input
            type="url"
            placeholder="Website URL"
            value={newWebsite.url}
            onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
          />
          <button onClick={handleAddWebsite}>Add Website</button>
        </div>

        {/* Display websites */}
        <div className="website-list">
          <h3>Website List</h3>
          {websites.map((website, index) => (
            <div className="website-item" key={index}>
              <h4>{website.name}</h4>
              <p>
                <a href={website.url} target="_blank" rel="noopener noreferrer">
                  {website.url}
                </a>
              </p>
              <button onClick={() => setWebsites(websites.filter((_, i) => i !== index))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Scrape now button */}
        <button
          className="scrap-button"
          onClick={handleScrapClick}
        >
          Scrap Now
        </button>
      </div>
    </div>
  );
};

export default ScrapingDetails;
