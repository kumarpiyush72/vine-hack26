import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './App.css'

// Register GSAP plugins
gsap.registerPlugin(useGSAP)

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const heroRef = useRef(null)
  const statsRef = useRef(null)

  // Track scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Animations
  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-kicker', { opacity: 0, y: -20, duration: 0.8, delay: 0.1 })
      .from('.hero-title', { opacity: 0, y: 30, duration: 0.9 }, '-=0.5')
      .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.hero-badges-row', { opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.hero-image-wrapper', { opacity: 0, scale: 0.94, duration: 1 }, '-=1')
      .from('.hero-floating-card', { opacity: 0, x: -30, duration: 0.8 }, '-=0.5')

    // Subtle breathing animation on floating card
    gsap.to('.hero-floating-card', {
      y: -6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, { scope: heroRef })

  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      title: 'Historic Bell Tower & Quad',
      category: 'campus',
      tag: 'Academic Quadrangle',
      image: '/images/campus-quad.jpg',
      desc: 'Collegiate Gothic architecture looking out across Pelican Bay.'
    },
    {
      id: 2,
      title: 'Oceanic Research & Navigation Lab',
      category: 'research',
      tag: 'Marine Sciences',
      image: '/images/maritime-lab.jpg',
      desc: 'State-of-the-art oceanography, navigation simulations, and marine research.'
    },
    {
      id: 3,
      title: 'Varsity Pirate Regatta & Crew',
      category: 'athletics',
      tag: 'Pirate Athletics',
      image: '/images/athletics-regatta.jpg',
      desc: 'Championship-winning collegiate sailing and coastal rowing teams.'
    },
    {
      id: 4,
      title: 'The Flagship Training Vessel',
      category: 'campus',
      tag: 'Maritime Heritage',
      image: '/images/hero-pirates.jpg',
      desc: 'Our living maritime laboratory where students master navigation and ocean science.'
    }
  ]

  const filteredGallery = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setApplyModalOpen(false)
    }, 2200)
  }

  return (
    <div className="app-root">
      {/* 1. STICKY NAVBAR */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="brand-wrapper" aria-label="Pelican Coast College Home">
            {/* Nautical Crest SVG */}
            <svg className="crest-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="College Crest">
              <circle cx="50" cy="50" r="46" fill="#0B1F3A" stroke="#D4AF65" strokeWidth="3" />
              <circle cx="50" cy="50" r="40" stroke="#D4AF65" strokeWidth="1" strokeDasharray="3 3" />
              {/* Anchor and Helm Silhouette */}
              <path d="M50 24V74M36 40C36 54 64 54 64 40M30 64C38 74 62 74 70 64" stroke="#D4AF65" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="30" r="4" fill="#D4AF65" />
              <path d="M42 36H58" stroke="#D4AF65" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="brand-text">
              <span className="brand-name">PELICAN COAST</span>
              <span className="brand-tagline">HOME OF THE PIRATES • EST. 1888</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#programs" className="nav-link">Programs</a></li>
              <li><a href="#highlights" className="nav-link">Why Choose Us</a></li>
              <li><a href="#gallery" className="nav-link">Campus Life</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          {/* Right Action */}
          <div className="nav-actions">
            <button
              className="btn btn-primary nav-btn"
              onClick={() => setApplyModalOpen(true)}
            >
              Apply Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <ul className="mobile-nav-links">
              <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a></li>
              <li><a href="#highlights" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a></li>
              <li><a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Campus Life</a></li>
              <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false)
                setApplyModalOpen(true)
              }}
            >
              Apply for Fall 2026
            </button>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="hero-section" ref={heroRef} id="hero">
          <div className="hero-bg-accent"></div>
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="kicker-pill on-dark hero-kicker">
                  <span>⚓</span>
                  <span>Prestigious Coastal Education</span>
                </div>
                <h1 className="hero-title">
                  CHART YOUR COURSE. <br />
                  <span className="gold-text">CONQUER THE HORIZON.</span>
                </h1>
                <p className="hero-tagline">
                  Founded on the Pacific bluffs in 1888, Pelican Coast College fuses world-class academic rigor with the bold, adventurous heritage of the Pirates. Steer your ambition where visionary leaders are forged.
                </p>
                <div className="hero-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => setApplyModalOpen(true)}
                  >
                    Apply for Fall 2026
                  </button>
                  <a href="#gallery" className="btn btn-outline">
                    Explore Campus
                  </a>
                </div>
                <div className="hero-badges-row">
                  <div className="hero-stat-item">
                    <span className="hero-stat-number">#1</span>
                    <span className="hero-stat-label">Coastal Regional College</span>
                  </div>
                  <div className="hero-stat-item">
                    <span className="hero-stat-number">98%</span>
                    <span className="hero-stat-label">Career & Sea Placement</span>
                  </div>
                  <div className="hero-stat-item">
                    <span className="hero-stat-number">138 Yrs</span>
                    <span className="hero-stat-label">Maritime Heritage</span>
                  </div>
                </div>
              </div>

              {/* Hero Image on Right */}
              <div className="hero-media">
                <div className="hero-image-wrapper">
                  <img
                    src="/images/hero-pirates.jpg"
                    alt="Majestic tall ship sailing at sunset representing the pirate heritage of Pelican Coast College"
                    className="hero-img"
                  />
                  <div className="hero-floating-card">
                    <svg className="floating-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" fill="#D4AF65" stroke="none" />
                    </svg>
                    <div>
                      <div className="floating-title">The Pirate Legacy</div>
                      <div className="floating-sub">Courage • Honor • Discovery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nautical Wave Divider (Navy to Ivory) */}
        <div className="wave-divider" style={{ backgroundColor: 'var(--deep-navy)' }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,50 L1200,120 L0,120 Z" fill="var(--warm-ivory)" />
          </svg>
        </div>

        {/* 3. ABOUT / INTRO SECTION */}
        <section className="about-section" id="about">
          <div className="container">
            <div className="about-grid">
              {/* Image beside text */}
              <div className="about-media">
                <div className="about-img-frame">
                  <img
                    src="/images/campus-quad.jpg"
                    alt="Pelican Coast College historic quadrangle and clock tower overlooking the ocean"
                    className="about-img"
                    loading="lazy"
                  />
                  <div className="about-badge">
                    Accredited Maritime Academy
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="about-content">
                <div className="kicker-pill on-light">
                  <span>⚔️</span>
                  <span>Tradition & Excellence</span>
                </div>
                <h2>WHERE SCHOLARSHIP MEETS THE SPIRIT OF DISCOVERY</h2>
                <div className="gold-line"></div>
                <p className="about-lead">
                  At Pelican Coast College, we honor a heritage that refuses to stay in calm waters.
                </p>
                <p className="about-body">
                  Established in 1888 perched over the crashing Pacific, our institution prepares graduates to navigate uncharted territories. Whether you are conducting breakthrough marine ecology research, mastering coastal engineering, or championing ethical business across global shipping corridors, the Pirate spirit drives every student to command their future with honor, resilience, and curiosity.
                </p>

                {/* Key Stats Bar */}
                <div className="stats-grid" ref={statsRef}>
                  <div className="stat-card">
                    <span className="stat-num">98%</span>
                    <span className="stat-desc">Career Placement Rate</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">14:1</span>
                    <span className="stat-desc">Student to Faculty Ratio</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">48+</span>
                    <span className="stat-desc">Undergrad & Grad Degrees</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">16</span>
                    <span className="stat-desc">Varsity Pirate Titles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HIGHLIGHTS / WHY CHOOSE US SECTION (ROYAL BLUE) */}
        <section className="highlights-section" id="highlights">
          <div className="container">
            <div className="section-header">
              <div className="kicker-pill on-dark">
                <span>🧭</span>
                <span>The Pirate Advantage</span>
              </div>
              <h2>FOUR PILLARS OF A PRESTIGIOUS EDUCATION</h2>
              <div className="gold-line center"></div>
              <p>
                Engineered for innovators, oceanic explorers, and leaders who refuse the ordinary.
              </p>
            </div>

            <div className="cards-grid" id="programs">
              {/* Card 1: Compass Rose */}
              <div className="highlight-card">
                <span className="card-num">01</span>
                <div className="card-icon-wrap">
                  {/* Compass Rose SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" stroke="#D4AF65" />
                    <polygon points="12,3 14,10 21,12 14,14 12,21 10,14 3,12 10,10" fill="#D4AF65" />
                  </svg>
                </div>
                <h3>Navigational Academics</h3>
                <p>
                  Immersive degree programs across Oceanic Sciences, Naval Engineering, Coastal Architecture, and International Maritime Law designed for high-impact careers.
                </p>
                <a href="#gallery" className="card-link">
                  Explore Curricula →
                </a>
              </div>

              {/* Card 2: Anchor */}
              <div className="highlight-card">
                <span className="card-num">02</span>
                <div className="card-icon-wrap">
                  {/* Iron Anchor SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="3" stroke="#D4AF65" />
                    <line x1="12" y1="8" x2="12" y2="21" stroke="#D4AF65" />
                    <line x1="7" y1="12" x2="17" y2="12" stroke="#D4AF65" />
                    <path d="M5 16C6 21 18 21 19 16" stroke="#D4AF65" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Steadfast Heritage & Honor</h3>
                <p>
                  More than a century of collegiate traditions, honor councils, and fellowship. Our graduates carry an unyielding commitment to integrity and community leadership.
                </p>
                <a href="#gallery" className="card-link">
                  Our Traditions →
                </a>
              </div>

              {/* Card 3: Ship's Wheel */}
              <div className="highlight-card">
                <span className="card-num">03</span>
                <div className="card-icon-wrap">
                  {/* Helm Ship Wheel SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" stroke="#D4AF65" />
                    <circle cx="12" cy="12" r="3" fill="#D4AF65" />
                    <line x1="12" y1="1" x2="12" y2="23" stroke="#D4AF65" />
                    <line x1="1" y1="12" x2="23" y2="12" stroke="#D4AF65" />
                    <line x1="4.2" y1="4.2" x2="19.8" y2="19.8" stroke="#D4AF65" />
                    <line x1="19.8" y1="4.2" x2="4.2" y2="19.8" stroke="#D4AF65" />
                  </svg>
                </div>
                <h3>Leadership at the Helm</h3>
                <p>
                  Direct access to bridge simulations, enterprise incubators, and one-on-one mentorship with industry admirals and venture leaders before you graduate.
                </p>
                <a href="#gallery" className="card-link">
                  Leadership Labs →
                </a>
              </div>

              {/* Card 4: Astrolabe / Sextant */}
              <div className="highlight-card">
                <span className="card-num">04</span>
                <div className="card-icon-wrap">
                  {/* Sextant / Map SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" stroke="#D4AF65" />
                    <line x1="9" y1="3" x2="9" y2="18" stroke="#D4AF65" />
                    <line x1="15" y1="6" x2="15" y2="21" stroke="#D4AF65" />
                  </svg>
                </div>
                <h3>Global Ocean Expeditions</h3>
                <p>
                  Every student participates in field voyages, international exchange residencies, or semester-at-sea programs spanning Arctic passages to Mediterranean shores.
                </p>
                <a href="#gallery" className="card-link">
                  Global Voyages →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CAMPUS / GALLERY SECTION */}
        <section className="gallery-section" id="gallery">
          <div className="container">
            <div className="section-header">
              <div className="kicker-pill on-light">
                <span>🌊</span>
                <span>Campus & Coastal Life</span>
              </div>
              <h2 style={{ color: 'var(--deep-navy)' }}>EXPEDITIONS IN LEARNING & LIVING</h2>
              <div className="gold-line center"></div>
              <p style={{ color: '#4c5f76' }}>
                Explore our 120-acre oceanfront sanctuary situated on dramatic cliffs overlooking Pelican Bay.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="gallery-filters">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Views
              </button>
              <button
                className={`filter-btn ${activeFilter === 'campus' ? 'active' : ''}`}
                onClick={() => setActiveFilter('campus')}
              >
                Historic Grounds
              </button>
              <button
                className={`filter-btn ${activeFilter === 'research' ? 'active' : ''}`}
                onClick={() => setActiveFilter('research')}
              >
                Research Labs
              </button>
              <button
                className={`filter-btn ${activeFilter === 'athletics' ? 'active' : ''}`}
                onClick={() => setActiveFilter('athletics')}
              >
                Pirate Athletics
              </button>
            </div>

            {/* Gallery Image Grid */}
            <div className="gallery-grid">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  onClick={() => setSelectedGalleryImg(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-tag">{item.tag}</span>
                    <h3 className="gallery-title">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION BAND (DEEP NAVY) */}
        <section className="cta-band" id="admissions">
          <div className="container">
            <div className="cta-content">
              <span className="cta-badge">Priority Admissions Fall 2026</span>
              <h2 className="cta-heading">READY TO SET SAIL WITH THE CREW?</h2>
              <div className="gold-line center"></div>
              <p className="cta-text">
                Your future is too bold for quiet harbors. Join a prestigious collegiate tradition where intellect, adventure, and courage collide. Scholarships and fellowship grants are now being awarded.
              </p>
              <div className="cta-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setApplyModalOpen(true)}
                >
                  Start Your Application
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => alert('Tour scheduled! An admissions officer will contact you.')}
                >
                  Schedule Campus Visit
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER (DEEP NAVY) */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="brand-wrapper">
                <svg className="crest-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" fill="#0B1F3A" stroke="#D4AF65" strokeWidth="3" />
                  <path d="M50 24V74M36 40C36 54 64 54 64 40M30 64C38 74 62 74 70 64" stroke="#D4AF65" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="brand-text">
                  <span className="brand-name">PELICAN COAST</span>
                  <span className="brand-tagline">HOME OF THE PIRATES</span>
                </div>
              </div>
              <p>
                An accredited coastal academic institution dedicated to cultivating honorable leaders, oceanic researchers, and global pioneers.
              </p>
              <div className="footer-motto">
                "Per Mare ad Astra" — Through the Seas to the Stars
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="footer-heading">Academics</h4>
              <ul className="footer-menu">
                <li><a href="#programs">School of Oceanic Sciences</a></li>
                <li><a href="#programs">Maritime Engineering</a></li>
                <li><a href="#programs">Global Trade & Navigation</a></li>
                <li><a href="#programs">Honors Discovery College</a></li>
                <li><a href="#programs">Graduate Fellowships</a></li>
              </ul>
            </div>

            {/* Campus Life Column */}
            <div>
              <h4 className="footer-heading">Campus Life</h4>
              <ul className="footer-menu">
                <li><a href="#gallery">Pirate Athletics & Regatta</a></li>
                <li><a href="#gallery">Clifftop Student Residences</a></li>
                <li><a href="#gallery">Marine Research Marina</a></li>
                <li><a href="#gallery">Leadership & Honor Societies</a></li>
                <li><a href="#gallery">Dining & Coastal Commons</a></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h4 className="footer-heading">Contact & Admissions</h4>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>1888 Pelican Way, Pacific Coast Bluffs, CA 92657</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>(800) 555-PIRATE / (949) 555-0188</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>admissions@pelicancoast.edu</span>
              </div>

              {/* Social Icons in Gold */}
              <div className="social-links">
                <a href="#hero" className="social-icon-btn" aria-label="X (Twitter)">𝕏</a>
                <a href="#hero" className="social-icon-btn" aria-label="LinkedIn">in</a>
                <a href="#hero" className="social-icon-btn" aria-label="Instagram">IG</a>
                <a href="#hero" className="social-icon-btn" aria-label="YouTube">YT</a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div>
              © 2026 Pelican Coast College. All Rights Reserved. Accredited by WASC Senior College and University Commission.
            </div>
            <div className="footer-links-row">
              <a href="#hero">Privacy Policy</a>
              <a href="#hero">Terms of Use</a>
              <a href="#hero">Title IX</a>
              <a href="#hero">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* APPLICATION MODAL */}
      {applyModalOpen && (
        <div className="modal-backdrop" onClick={() => setApplyModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Apply to Pelican Coast College</h3>
              <button
                className="modal-close"
                onClick={() => setApplyModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚓</div>
                  <h3 style={{ color: 'var(--deep-navy)', marginBottom: '0.5rem' }}>Application Submitted!</h3>
                  <p style={{ color: '#495c73' }}>
                    Welcome to the voyage. Your preliminary admissions portfolio has been received. An admissions officer will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <p style={{ color: '#495c73', fontSize: '0.92rem', marginBottom: '1.4rem' }}>
                    Begin your application for Fall 2026. Submit your details below to receive your personalized application portal access and merit scholarship eligibility review.
                  </p>
                  <div className="form-group">
                    <label>Full Legal Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Eleanor Vance"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="e.g. eleanor@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Intended Program of Study</label>
                    <select className="form-select" required>
                      <option value="">Select a Program</option>
                      <option value="oceanic-science">B.S. Oceanic Sciences & Marine Ecology</option>
                      <option value="naval-eng">B.S. Naval & Coastal Engineering</option>
                      <option value="maritime-biz">B.A. Global Maritime Trade & Logistics</option>
                      <option value="environmental-law">B.A. Coastal Policy & Environmental Law</option>
                      <option value="athletics">Varsity Pirate Athletics Program</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    Submit Application Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedGalleryImg && (
        <div className="modal-backdrop" onClick={() => setSelectedGalleryImg(null)}>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              style={{ position: 'absolute', top: -40, right: 0, color: '#fff' }}
              onClick={() => setSelectedGalleryImg(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img
              src={selectedGalleryImg.image}
              alt={selectedGalleryImg.title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <strong>{selectedGalleryImg.title}</strong> — {selectedGalleryImg.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
