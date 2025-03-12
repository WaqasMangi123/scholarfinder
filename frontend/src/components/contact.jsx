import React, { useState } from 'react';
import { AiOutlineMail, AiTwotonePhone } from "react-icons/ai";
import emailjs from 'emailjs-com'; // Import EmailJS
import './contactus.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    message: '',
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage(''); // Clear error message when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email contains '@'
    if (!formData.contact.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    emailjs
      .send(
        "service_vfdjkhs",
        "template_wvnvphx",
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.contact,
          message: formData.message,
        },
        "xzkY7jTKybp3YEXbQ" // Use your Public Key here
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response);
          setShowPopup(true); // Show popup on successful submission
          setFormData({ firstName: '', lastName: '', contact: '', message: '' });
        },
        (err) => {
          console.error('Failed to send email:', err);
          setErrorMessage('Failed to send email. Please try again later.');
        }
      );
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <img src="/aboutus3.jpg" alt="Contact Us" className="header-image" />
        <div className="header-text">Contact Us</div>
      </div>
      <div className="contact-content">
        <div className="contact-video">
          <video width="100%" height="auto" controls autoPlay muted loop>
            <source src="/Contact.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="contact-form">
          <div className="form-box">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="contact"
                  placeholder="Phone or Email"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="form-group">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="success-popup">Message submitted successfully!</div>
      )}
      <div className="office-location">
        <h2 className="section-title">Our Office Location</h2>
        <div className="map-container">
          {/* Replace with your actual Google Maps embed link */}
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509771!2d144.95373531531827!3d-37.81627997975138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0a3a97%3A0x5045675218ceed0!2sYour%20Company%20Name!5e0!3m2!1sen!2sau!4v1617775399437!5m2!1sen!2sau"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
