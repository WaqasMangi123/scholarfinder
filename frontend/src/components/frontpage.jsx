import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './frontpage.css';
import { 
  FaArrowRight, 
  FaUserPlus, 
  FaSignInAlt, 
  FaGraduationCap, 
  FaAward, 
  FaSearchDollar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaRegClock,
  FaEdit,
  FaUserTie,
  FaChartLine
} from 'react-icons/fa';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "ScholarFinder helped me discover scholarships I never would have found on my own. Thanks to their platform, I secured funding for my entire undergraduate degree!",
    name: "Sarah Johnson",
    achievement: "Recipient of 3 scholarships totaling $25,000",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    text: "The personalized recommendations saved me countless hours of searching. I was matched with perfect opportunities based on my unique background and interests.",
    name: "Michael Chen",
    achievement: "Awarded $15,000 STEM scholarship",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    text: "As a first-generation student, I had no idea how to navigate scholarship applications. ScholarFinder guided me through the entire process with ease.",
    name: "Emily Rodriguez",
    achievement: "First in family to attend college",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const HomeHero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const controls = useAnimation();
  
  // Background images
  const backgrounds = [
    'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
  ];

  // CV Template Slides
  const cvSlides = [
    {
      id: 1,
      title: "Professional Academic",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Clean layout", "Education focus", "Publication highlights"]
    },
    {
      id: 2,
      title: "Creative Modern",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Visual design", "Skill visualization", "Portfolio integration"]
    },
    {
      id: 3,
      title: "Minimalist Elegant",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Two-column layout", "Timeline format", "Achievement focused"]
    }
  ];

  // Rotate backgrounds every 5 seconds
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cvSlides.length);
    }, 6000);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    
    return () => {
      clearInterval(bgInterval);
      clearInterval(slideInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  // Animation for features section
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cvSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cvSlides.length) % cvSlides.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="scholar-hero">
        {/* Animated background images */}
        <div className="hero-backgrounds">
          {backgrounds.map((bg, index) => (
            <motion.div
              key={index}
              className="hero-bg-image"
              style={{ backgroundImage: bg }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentBg === index ? 1 : 0,
                scale: currentBg === index ? 1 : 1.05
              }}
              transition={{ duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            />
          ))}
        </div>
        
        {/* Overlay */}
        <div className="hero-overlay" />
        
        {/* Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-title"
          >
            Unlock personalized scholarship opportunities
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-subtitle"
          >
            Build a future of success with <span>Scholar Finder</span>
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button primary"
            >
              <FaSignInAlt /> Login
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button secondary"
            >
              <FaUserPlus /> Register <FaArrowRight />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scrolling indicator */}
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="chevron" />
          <div className="chevron" />
          <div className="chevron" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="scholar-features">
        <motion.div 
          className="features-container"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Feature 1 */}
          <motion.div
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <FaGraduationCap />
            </div>
            <h3>Comprehensive Database</h3>
            <p>Access thousands of scholarships from around the world, updated daily to ensure you never miss an opportunity.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }
              }
            }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <FaAward />
            </div>
            <h3>Personalized Matches</h3>
            <p>Our AI-powered system analyzes your profile to recommend scholarships that fit your qualifications perfectly.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
              }
            }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <FaSearchDollar />
            </div>
            <h3>Application Tracker</h3>
            <p>Manage all your scholarship applications in one place with our intuitive tracking system.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="scholar-info">
        <motion.div 
          className="info-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="info-image-container"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1539413595691-37a09a48579b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Student with laptop" 
                className="info-image" 
              />
              <div className="image-overlay" />
              <div className="floating-element floating-1" />
              <div className="floating-element floating-2" />
              <div className="floating-element floating-3" />
            </div>
          </motion.div>

          <motion.div 
            className="info-content"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="info-title">Why Choose Scholar Finder?</h2>
            <p className="info-text">
              With Scholar Finder, create a professional CV effortlessly and discover tailored scholarships that align with your ambitions. Our platform offers customizable templates to present your achievements, bringing you closer to financial support for your academic journey.
            </p>
            
            <div className="info-stats">
              <div className="stat-item">
                <motion.div 
                  className="stat-number"
                  initial={{ number: 0 }}
                  whileInView={{ number: 10000 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  {({ number }) => <span>{Math.floor(number)}+</span>}
                </motion.div>
                <div className="stat-label">Scholarships</div>
              </div>
              
              <div className="stat-item">
                <motion.div 
                  className="stat-number"
                  initial={{ number: 0 }}
                  whileInView={{ number: 95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  {({ number }) => <span>{Math.floor(number)}%</span>}
                </motion.div>
                <div className="stat-label">Success Rate</div>
              </div>
              
              <div className="stat-item">
                <motion.div 
                  className="stat-number"
                  initial={{ number: 0 }}
                  whileInView={{ number: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  {({ number }) => <span>{Math.floor(number)}/7</span>}
                </motion.div>
                <div className="stat-label">Support</div>
              </div>
            </div>
            
            <motion.button
              className="info-button"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(79, 195, 247, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started <FaArrowRight />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* CV Builder Section */}
      <section className="cv-builder-section">
        <motion.div 
          className="cv-builder-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="cv-builder-content"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="cv-builder-title">Build Your Professional CV Effortlessly</h3>
            <p className="cv-builder-text">
              Choose from our premium templates designed specifically for scholarship applications. 
              Highlight your academic achievements and personal strengths with our intuitive builder.
            </p>
            <motion.div
              className="cv-features"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div
                className="cv-feature"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="cv-feature-icon"><FaEdit /></span>
                <span>Easy-to-use editor</span>
              </motion.div>
              <motion.div
                className="cv-feature"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="cv-feature-icon"><FaUserTie /></span>
                <span>Professional designs</span>
              </motion.div>
              <motion.div
                className="cv-feature"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="cv-feature-icon"><FaChartLine /></span>
                <span>Optimized for success</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="cv-builder-slider"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="slider-container">
              <button className="slider-nav prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              
              <div className="slider-track">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="slide"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="slide-image-container">
                      <img 
                        src={cvSlides[currentSlide].image} 
                        alt={cvSlides[currentSlide].title} 
                        className="slide-image"
                      />
                      <div className="slide-overlay">
                        <h4>{cvSlides[currentSlide].title}</h4>
                        <ul>
                          {cvSlides[currentSlide].features.map((feature, index) => (
                            <li key={index}>
                              <FaCheckCircle /> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button className="slider-nav next" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div>
            
            <div className="slider-dots">
              {cvSlides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Scholarship Tips Section */}
      <section className="scholarship-tips-section">
        <motion.div 
          className="tips-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="tips-content"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="tips-title">
              Top Tips for Finding Scholarships
            </h2>
            <p className="tips-subtitle">
              Expert advice to maximize your scholarship opportunities
            </p>
            
            <motion.ul 
              className="tips-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <FaRegClock /> Start your search early and keep track of deadlines.
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: 0.1 } }
                }}
              >
                <FaEdit /> Tailor your applications to highlight your strengths and achievements.
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: 0.2 } }
                }}
              >
                <FaSearchDollar /> Utilize all available resources to discover unique opportunities.
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: 0.3 } }
                }}
              >
                <FaUserTie /> Ask for recommendations from teachers or mentors.
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: 0.4 } }
                }}
              >
                <FaChartLine /> Keep applying, even if you receive rejections. Persistence pays off!
              </motion.li>
            </motion.ul>
          </motion.div>
          
          <motion.div
            className="tips-image-container"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="tips-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Scholarship tips" 
                className="tips-image"
              />
              <div className="image-highlight" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="works-container">
          <motion.h2
            className="works-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How ScholarFinder Works
          </motion.h2>
          
          <motion.p
            className="works-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Three simple steps to find your perfect scholarship match
          </motion.p>
          
          <div className="steps-container">
            <motion.div
              className="step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>Fill out your academic background, interests, and career goals to help us understand your unique qualifications.</p>
              </div>
              <div className="step-connector"></div>
            </motion.div>
            
            <motion.div
              className="step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get Personalized Recommendations</h3>
                <p>Our advanced algorithms analyze thousands of scholarships to match you with opportunities that fit your profile.</p>
              </div>
              <div className="step-connector"></div>
            </motion.div>
            
            <motion.div
              className="step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Apply With Confidence</h3>
                <p>Our platform guides you through each application with tips and tools to maximize your chances of success.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="works-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="works-button"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 20px rgba(79, 195, 247, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/register" className="button-link">
                Start Your Journey <FaArrowRight />
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <motion.div 
          className="testimonials-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Hear from students who found their perfect scholarships</p>
          </motion.div>

          <div className="testimonials-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
                  <div className="testimonial-author">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name} 
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <p>{testimonials[currentTestimonial].achievement}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="slider-controls">
            <motion.button 
              className="slider-arrow prev"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronLeft />
            </motion.button>
            <div className="slider-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${currentTestimonial === i ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(i)}
                />
              ))}
            </div>
            <motion.button 
              className="slider-arrow next"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="contact-title">Ready to Transform Your Future?</h2>
            <p className="contact-text">
              Our team is here to help you navigate the scholarship process and answer any questions you may have.
            </p>
            
            <motion.div
              className="contact-buttons"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.button
                className="contact-button primary"
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 25px rgba(79, 195, 247, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/contact" className="button-link">
                  Contact Our Advisors
                </Link>
              </motion.button>
              
              <motion.button
                className="contact-button secondary"
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/faq" className="button-link">
                  Browse FAQs
                </Link>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="contact-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Student receiving guidance" 
                className="main-image"
              />
              <div className="floating-elements">
                <motion.div 
                  className="floating-element"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaGraduationCap />
                </motion.div>
                <motion.div 
                  className="floating-element"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <FaAward />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;