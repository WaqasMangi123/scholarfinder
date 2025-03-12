import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './aboutStyle.css';

const About = () => {
  const teamMembers = [
    {
      name: "Waqas Ahmed Mangi",
      position: "CEO",
      image: "/waqaspic.jpeg",
    },
    {
      name: "Waleed Ahmed",
      position: "CTO",
      image: "/images/team2.jpg",
    },
    // Add more team members as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <div className="about-header">
        <img src="/aboutus3.jpg" alt="About Us" />
        <div className="header-text">About Us</div>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p className="section-title">COMPANY OVERVIEW</p>
          <p>
          At ScholarFinder, our mission is to make the journey of finding and applying for scholarships as seamless and efficient as possible. We understand the challenges students face in securing financial aid for their education, and we are here to help.
          </p>
          <p>
          We envision a world where every student, regardless of their background, has access to the resources they need to achieve their academic and career goals. By leveraging technology and data, we aim to bridge the gap between students and scholarship opportunities globally.
          </p>
          <p>
          Our user-friendly interface ensures a smooth and hassle-free experience. Whether you are creating your profile, building your CV, or exploring scholarship opportunities, ScholarFinder is designed to guide you every step of the way.
          </p>
          <p>
          At ScholarFinder, we are committed to continuously improving our platform to better serve you. We welcome your feedback and suggestions to help us enhance our services.

Thank you for choosing ScholarFinder. We are excited to be a part of your academic journey and look forward to helping you achieve your dreams.
          </p>
        </div>
        <div className="about-video">
          <video width="100%" height="auto" controls autoPlay muted>
            <source src="/about.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="info-boxes">
        <div className="info-box">
          <img src="/mission.jpg" alt="Box 1 Image" />
          <h1 className="info-box-title">Mission</h1>
          <h3 className="info-box-subtitle">To empower students by providing tailored scholarship recommendations and professional CV building tools to help them achieve their academic and career goals.</h3>
        </div>
        <div className="info-box">
          <img src="/vision.jpg" alt="Box 2 Image" />
          <h1 className="info-box-title">Vision</h1>
          <h3 className="info-box-subtitle">TTo be the leading platform for scholarship discovery and CV creation, recognized for our innovative solutions and user-centric approach.</h3>
        </div>
        <div className="info-box">
          <img src="/values.jpg" alt="Box 3 Image" />
          <h1 className="info-box-title">Values</h1>
          <h3 className="info-box-subtitle">Commitment to supporting students, promoting educational opportunities, and maintaining transparency and integrity in all our services.</h3>
        </div>
        <div className="info-box">
          <img src="/goal.jpg" alt="Box 4 Image" />
          <h1 className="info-box-title">Goals</h1>
          <h3 className="info-box-subtitle">To continuously enhance our platform with advanced AI features, expand our scholarship database, and ensure user satisfaction and success in finding scholarships.</h3>
        </div>
      </div>
      <div className="team-container">
        <h2 className="section-title">Our Team</h2>
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default About;
