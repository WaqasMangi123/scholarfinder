import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from './navbar';

const templates = [
  { id: 1, imgSrc: '/resumepic1.jpg', name: 'Template 1' },
  { id: 2, imgSrc: '/resumepic2.jpg', name: 'Template 2' },
  { id: 3, imgSrc: '/resumepic3.png', name: 'Template 3' },
  { id: 4, imgSrc: '/resumepic4.jpg', name: 'Template 4' },
];

const newsEvents = [
  { title: "New Scholarship for STEM Students", description: "A new scholarship for students pursuing STEM fields has been announced. Apply now!", imgSrc: "/news1.webp" },
  { title: "AI and Machine Learning Workshop", description: "Join our upcoming workshop on AI and Machine Learning to enhance your skills.", imgSrc: "/news3.webp" },
  { title: "Leadership Summit for Students", description: "A unique event for students to learn about leadership skills in the 21st century.", imgSrc: "/news2.webp" },
];

const Home = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Navbar />
      <header className="home-header">
        <div className="header-content">
          <h1>Discover scholarships that match your ambitions</h1>
          <p>Unlock your future with tailored scholarships and a professionally crafted CV in minutes.</p>
          <div className="buttons">
            <Link to="/profile" className="btn btn-warning">Create your Profile</Link>
            <Link to="/allscholorships" className="btn btn-primary">All Scholarships</Link>
          </div>
        </div>
      </header>

      {/* Collaboration Section */}
      <section className="collaboration-section">
        <div className="collaboration-container">
          <img src="/collaboration.jpeg" alt="Collaboration" className="collaboration-image" />
          <div className="collaboration-text">
            <h2>Collaboration with Sona Foundation & FFC</h2>
            <p>
              Scholar Finder is proud to collaborate with the Sona Foundation and FFC to offer more opportunities and resources to students. This partnership allows us to reach more students and provide enhanced services.
            </p>
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="news-events-section">
        <div className="news-events-container">
          <h2>News & Events</h2>
          <div className="news-event">
            <img src={newsEvents[currentNewsIndex].imgSrc} alt="News Event" className="news-event-image" />
            <div className="news-event-text">
              <h3>{newsEvents[currentNewsIndex].title}</h3>
              <p>{newsEvents[currentNewsIndex].description}</p>
              <Link to="/blog" className="btn-details">Further Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="main-section">
        <div className="container">
          <div className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step-card">
                <h3>Step 1</h3>
                <p>Create your CV.</p>
              </div>
              <div className="step-card">
                <h3>Step 2</h3>
                <p>Fill in your details using our simple prompts.</p>
              </div>
              <div className="step-card">
                <h3>Step 3</h3>
                <p>Download your CV or proceed further.</p>
              </div>
              <div className="step-card">
                <h3>Step 4</h3>
                <p>We extract key data from user data and apply algorithm.</p>
              </div>
              <div className="step-card">
                <h3>Step 5</h3>
                <p>Receive personalized scholarship recommendations based on your data.</p>
              </div>
            </div>
          </div>
          <div className="templates-section">
            <h2>Templates:</h2>
            <p>Explore a range of professionally crafted templates designed to showcase your profile with clarity and make a lasting impression.</p>
            <div className="template-grid">
              {templates.map(template => (
                <Link to={`/templateselection`} key={template.id} className="template-card">
                  <img src={template.imgSrc} alt={template.name} />
                  <h3>{template.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-media">
          <p>Connect with us on social media</p>
        </div>
        <div className="footer-links">
          <div className="column">
            <h3>JOB SEEKERS</h3>
            <Link to="/profile">Create a profile</Link>
            <Link to="#">Resume Examples</Link>
            <Link to="#">Resume Templates</Link>
            <Link to="#">Cover Letter Templates</Link>
            <Link to="#">Scholarship Search</Link>
          </div>
          <div className="column">
            <h3>OUR COMPANY</h3>
            <Link to="/about">About Us</Link>
            <Link to="#">Pricing</Link>
            <Link to="#">Product Updates</Link>
            <Link to="#">Sponsorship Program</Link>
            <Link to="#">Media Kit</Link>
            <Link to="#">Affiliates</Link>
          </div>
          <div className="column">
            <h3>SUPPORT</h3>
            <Link to="#">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Privacy</Link>
            <Link to="#">Right of Withdrawal</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="left">
            <img src="/path/to/flag-icon.png" alt="International" />
            <p>- scholarfinder.io</p>
          </div>
          <div className="right">
            <img src="/path/to/cprw-icon.png" alt="CPRW" />
            <p>More than a resume. Resume.io is part of the career.io ecosystem.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
