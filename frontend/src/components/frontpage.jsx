import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './frontpage.css';

const FrontPage = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  const data = {
    labels: ['Scholarships Secured', 'Students Helped', 'Satisfaction Rate (%)'],
    datasets: [
      {
        label: 'Scholarship Statistics',
        data: [5, 10000, 98],
        backgroundColor: ['#32a852', '#20808d', '#ffca28'],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.label === 'Scholarships Secured') return '1800+';
            if (context.label === 'Students Helped') return '4,000+';
            return '95% Satisfaction';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
      x: {
        ticks: { color: '#ffffff' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="front-page">
     {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
     
      {/* Collaboration Section with Image */}
      <div className="collaboration-section">
        <img src="/collaboration.jpeg" alt="Collaboration" className="collaboration-image" />
        <p>
          <strong>Collaboration Announcement:</strong> Scholar Finder is proud to collaborate with Fauji Fertilizer Company to provide additional scholarship opportunities and support for students in their academic journeys.
        </p>
      </div>

      <button className="popup-close-btn" onClick={closePopup}>Got It!</button>
    </div>
  </div>
)}
      <div className="video-container">
        <video autoPlay muted loop>
          <source src="/frontpagebackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay">
        <div className="logo-container">
          <img src="/logonew.jpeg" alt="Logo" className="logo" />
        </div>
        <div className="text-container">
          <h1>Welcome to Scholar Finder</h1>
          <p>Unlock personalized scholarship opportunities and build a future of success with Scholar Finder.</p>
          <div className="button-container">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-image">
          <img src="/cv.webp" alt="Info Image" className="info-img" />
        </div>
        <div className="info-text">
          <h2>Why Choose Scholar Finder?</h2>
          <p>With Scholar Finder, create a professional CV effortlessly and discover tailored scholarships that align with your ambitions. Our platform offers customizable templates to present your achievements, bringing you closer to financial support for your academic journey.</p>
        </div>
      </div>

      <div className="feature-section">
        <div className="feature-item">
          <div className="feature-text">
            <h3>Discover Your Perfect Scholarship</h3>
            <p>Our platform guides you to scholarships that match your profile, whether you're an undergraduate or advancing to higher education. Unlock numerous scholarship opportunities tailored to your goals.</p>
          </div>
          <div className="feature-video">
            <video controls>
              <source src="/discover.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-text">
            <h3>Build Your Professional CV Effortlessly</h3>
            <p>Create a standout CV using various templates, emphasizing your strengths and academic achievements. Prepare to impress scholarship committees and employers with ease.</p>
          </div>
          <div className="feature-video">
            <video controls>
              <source src="/cv2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="ats-section">
        <div className="ats-content">
          <h2>Scholarships Tailored for Your Unique Profile</h2>
          <p>Our platform is designed to connect you with ideal scholarship opportunities based on your personal and academic strengths.</p>
          <Link to="/register" className="btn btn-success">Find Your Perfect Scholarship</Link>
        </div>
        <div className="ats-features">
          <div className="ats-feature">
            <span className="icon">📇</span>
            <p>Personalized scholarship recommendations</p>
          </div>
          <div className="ats-feature">
            <span className="icon">📄</span>
            <p>Comprehensive profile analysis</p>
          </div>
          <div className="ats-feature">
            <span className="icon">🚀</span>
            <p>Streamlined search and application process</p>
          </div>
        </div>
      </div>

      <div className="customer-reviews">
        <div className="review-section">
          <h2>Student Success Stories</h2>
          <div className="testimonial-container">
            <div className="testimonial">
              <img src="/success1.jpg" alt="Alex Johnson" className="testimonial-img" />
              <p>"ScholarFinder helped me secure a full scholarship for my master's program. The personalized recommendations were spot-on!"</p>
              <h4>Alex Johnson</h4>
              <p>Master's Student at XYZ University</p>
            </div>
            <div className="testimonial">
              <img src="/success2.jfif" alt="Maria Garcia" className="testimonial-img" />
              <p>"I found scholarships I didn't even know existed. ScholarFinder made the application process so much easier!"</p>
              <h4>Maria Garcia</h4>
              <p>Undergraduate Student at ABC College</p>
            </div>
            <div className="testimonial">
              <img src="/success3.jpg" alt="Ravi Patel" className="testimonial-img" />
              <p>"Thanks to ScholarFinder, I received multiple scholarship offers and can now focus on my studies without financial stress."</p>
              <h4>Ravi Patel</h4>
              <p>PhD Candidate at DEF Institute</p>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h2>Scholarship Statistics</h2>
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="review-section">
          <h2>Top Tips for Finding Scholarships</h2>
          <div className="tips-container">
            <div className="tips-image">
              <img src="/scholorshiptips.jpeg" alt="Tips for Scholarships" />
            </div>
            <ul className="tips-list">
              <li>Start your search early and keep track of deadlines.</li>
              <li>Tailor your applications to highlight your strengths and achievements.</li>
              <li>Utilize all available resources, including ScholarFinder, to discover unique opportunities.</li>
              <li>Ask for recommendations from teachers or mentors.</li>
              <li>Keep applying, even if you receive rejections. Persistence pays off!</li>
            </ul>
          </div>
        </div>

        <div className="review-section">
          <h2>How ScholarFinder Works</h2>
          <div className="how-it-works-container">
            <div className="step">
              <h3>1. Create Your Profile</h3>
              <p>Fill out your academic background, interests, and career goals.</p>
            </div>
            <div className="step">
              <h3>2. Get Personalized Recommendations</h3>
              <p>Our advanced algorithms match you with scholarships that fit your profile.</p>
            </div>
            <div className="step">
              <h3>3. Apply for Scholarships</h3>
              <p>Our platform guides you to apply with confidence.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Let's Land Your Dream Scholarships Together</h2>
          <Link to="/register" className="cta-button">Start Your Journey</Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
