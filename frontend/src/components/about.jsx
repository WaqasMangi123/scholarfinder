import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './aboutStyle.css';

const AboutHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const slides = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-bg-container">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`about-hero-bg ${currentSlide === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
              variants={slideVariants}
              initial="enter"
              animate={currentSlide === index ? "center" : "exit"}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-hero-overlay" />
            </motion.div>
          ))}
        </div>

        <div className="about-hero-content">
          <motion.div
            className="about-hero-content-inner"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="about-hero-title-container">
                <motion.span 
                  className="about-hero-title-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                <motion.h1 
                  className="about-hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  About Us
                </motion.h1>
                <motion.span 
                  className="about-hero-title-line right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.p 
                className="about-hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Empowering students worldwide to discover their perfect scholarship opportunities through innovative technology and personalized matching.
              </motion.p>
            </motion.div>

            <motion.div 
              className="about-hero-scroll-container"
              variants={itemVariants}
            >
              <motion.div
                className="about-hero-scroll"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <svg className="about-hero-scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="about-hero-scroll-text">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slide-indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="company-overview-section">
        <h2 className="company-overview-title">Company Overview</h2>
        <motion.div 
          className="company-overview-carousel"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {[
            {
              title: "Our Vision",
              desc: "To revolutionize access to education by connecting students with opportunities they deserve through cutting-edge technology."
            },
            {
              title: "Our Mission",
              desc: "To provide a personalized platform that empowers students with scholarship matches tailored to their goals."
            },
            {
              title: "Core Values",
              desc: "Integrity, Inclusivity, Innovation. These values guide our work in building a better future for global learners."
            },
            {
              title: "Global Impact",
              desc: "Helping thousands of students across continents find meaningful educational opportunities and achieve their dreams."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="company-overview-card"
              variants={{
                hidden: { x: 100, opacity: 0 },
                visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Founding Member Message Section */}
      <section className="founding-message-section">
        <motion.div 
          className="founding-message-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="founder-profile"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D03AQEc_E9sLlp_TQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726877060139?e=2147483647&v=beta&t=5IkBKebR3koqfckuiakF6-fv-HCRbjWiNAlunKhQAzc"
              alt="Founding Member"
              className="founder-img"
            />
            <div className="founder-info">
              <h3>Waqas Ahmed Mangi</h3>
              <p>Founder & Visionary</p>
            </div>
          </motion.div>

          <motion.div 
            className="founding-message-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p>
              From the very beginning, our mission has been to transform lives through education. 
              We believe in breaking barriers and opening doors to opportunities that can shape futures. 
              Every line of code we write and every feature we launch is aimed at empowering students. 
              We're not just a platform — we're a movement. 
              Our team is committed to equity, innovation, and continuous support for learners worldwide. 
              This journey started with a simple dream, and today, it's impacting thousands. 
              I am proud of how far we've come — but even more excited about where we're going. 
              Let's keep building, dreaming, and making a difference — together.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* NEW Core Values Section */}
      <section className="core-values-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Integrity",
                description: "We maintain the highest ethical standards in all our interactions and recommendations.",
                example: "Our matching algorithm prioritizes student needs over any commercial interests."
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
                title: "Inclusivity",
                description: "We believe every student deserves equal access to educational opportunities.",
                example: "Our platform supports students from 150+ countries with multilingual interfaces."
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                    <circle cx="12" cy="15" r="2"></circle>
                    <line x1="12" y1="12" x2="12.01" y2="12"></line>
                  </svg>
                ),
                title: "Innovation",
                description: "We continuously evolve our technology to better serve students.",
                example: "Pioneered AI-powered scholarship matching with 92% user satisfaction."
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                ),
                title: "Empowerment",
                description: "We equip students with tools and knowledge to take control of their futures.",
                example: "Free webinars and resources have helped 15,000+ students improve applications."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p className="value-description">{value.description}</p>
                <div className="value-example">
                  <span>Example:</span> {value.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW FAQ Section */}
      <section className="faq-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our platform</p>
          </motion.div>

          <div className="faq-container">
            {[
              {
                question: "How does your scholarship matching work?",
                answer: "Our proprietary algorithm analyzes your academic profile, interests, and background to match you with relevant scholarships. We consider over 50 factors including GPA, field of study, extracurriculars, and demographic information to provide personalized recommendations."
              },
              {
                question: "Is there a cost to use your platform?",
                answer: "No, our basic scholarship matching service is completely free. We offer premium features like application review and priority support through optional subscriptions, but the core matching functionality remains free for all students."
              },
              {
                question: "How many scholarships are in your database?",
                answer: "We currently maintain a database of over 15,000 active scholarships from 2,300+ providers worldwide, with a total value exceeding $3 billion in funding opportunities."
              },
              {
                question: "Do you guarantee scholarship awards?",
                answer: "While we can't guarantee awards (as decisions are made by scholarship providers), students using our platform are 3x more likely to secure funding compared to traditional search methods, based on our user surveys."
              },
              {
                question: "How often is your database updated?",
                answer: "Our team verifies and updates scholarship listings daily. We also use automated monitoring to flag expired or changed opportunities, ensuring you always see current, valid options."
              },
              {
                question: "Can international students use your platform?",
                answer: "Absolutely! We support students from all countries and maintain specialized databases for international opportunities, country-specific scholarships, and study abroad programs."
              },
              {
                question: "How do you protect my personal data?",
                answer: "We employ enterprise-grade encryption, regular security audits, and strict data policies. Your information is never sold to third parties, and we only share what's necessary with scholarship providers when you choose to apply."
              },
              {
                question: "What makes your platform different?",
                answer: "Unlike generic search engines, we provide truly personalized matches, deadline tracking, application tools, and success metrics. Our AI learns from thousands of successful applications to improve your chances."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`faq-item ${activeFAQ === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <motion.span 
                    className="faq-icon"
                    animate={{ rotate: activeFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeFAQ === index ? 'auto' : 0,
                    opacity: activeFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="faq-answer-content">{item.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="faq-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p>Still have questions? We're here to help.</p>
            <button className="cta-button">Contact Our Support Team</button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;