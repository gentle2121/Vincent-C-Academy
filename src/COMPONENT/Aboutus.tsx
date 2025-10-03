import React, { useState } from "react";
import "./Aboutus.css";
import { GraduationCap } from "lucide-react";

import image1 from "../assets/african-school-buldings-africa-buildings-lawn-grasses-trees-nigeria-africa-77945024.webp";
import image2 from "../assets/images (13).jpg";
import image3 from "../assets/6405bc9e7d01f7b76c4d0ba8_Kingsworth-Header-4.webp";
import image4 from "../assets/images (3).jpg";

const AboutUs: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="about-container">
      {/* Header */}
      <header className="vc-header">
              <div className="vc-logo">
                <GraduationCap className="vc-icon" color="#fff" />
                <span style={{ color: "#fff" }}>Vincent C Academy</span>
              </div>
      
              {/* Nav Links */}
              <nav className={menuOpen ? "vc-nav open" : "vc-nav"}>
                <ul>
                  <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
                  <li><a href="/Aboutus" onClick={() => setMenuOpen(false)}>About Us</a></li>
                  <li><a href="/Admissions" onClick={() => setMenuOpen(false)}>Admissions</a></li>
                  <li><a href="/Event" onClick={() => setMenuOpen(false)}>Event</a></li>
                  <li><a href="/Contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                  <li><a href="/Parentforum" onClick={() => setMenuOpen(false)}>Parents Forum</a></li>
                </ul>
              </nav>
      
              {/* Hamburger */}
              <div
                className={`vc-hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="vc-line"></div>
                <div className="vc-line"></div>
                <div className="vc-line"></div>
              </div>
            </header>
      

      {/* Hero */}
      <section className="hero-section">
        <img src={image1} alt="School campus" className="hero-image" />
        <h1 className="hero-title">About Us</h1>
      </section>

      {/* Mission */}
      <section className="text-section">
        <h2>Our Mission</h2>
        <p>
          Encouraging students through inquiry and mindfulness to believe in 
          themselves and to reach their highest potential. We foster respect,
          integrity, and curiosity in every learner.
        </p>
      </section>

      {/* Vision */}
      <section className="split-section reverse">
        <div className="split-text">
          <h2>Our Vision</h2>
          <p>
            We welcome students from diverse backgrounds and empower them 
            to succeed academically and personally. Our faculty guides learners 
            to adapt, grow, and contribute meaningfully to the global community.
          </p>
        </div>
        <img src={image3} alt="Vision" className="split-image" />
      </section>

      {/* Culture */}
      <section className="split-section">
        <img src={image2} alt="Culture" className="split-image" />
        <div className="split-text">
          <h2>Our Culture</h2>
          <p>
            At Vincent C Academy, we celebrate diversity and encourage 
            empathy, respect, and inclusivity. We provide a safe and inspiring 
            environment where students learn to value themselves and others.
          </p>
        </div>
      </section>

      {/* Inclusive Environment */}
      <section className="split-section">
        <img src={image4} alt="Inclusive environment" className="split-image" />
        <div className="split-text">
          <h2>Inclusive Community</h2>
          <p>
            Every day, our team works hard to create a warm atmosphere where 
            every student feels welcomed, supported, and encouraged to thrive.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="testimonials-grid">
          <blockquote>
            “My time at Vincent C Academy changed how I see learning and 
            helped me grow with confidence.” 
            <footer>– Sophia, Alumna</footer>
          </blockquote>
          <blockquote>
            “The teachers are supportive and always push us to achieve our best.” 
            <footer>– Frederick, Alumnus</footer>
          </blockquote>
          <blockquote>
            “I loved the diverse and friendly environment — I felt at home.” 
            <footer>– Seohyeon, Alumna</footer>
          </blockquote>
          <blockquote>
            “Thanks to everyone, I gained the skills and mindset to succeed.” 
            <footer>– Minh, Alumnus</footer>
          </blockquote>
        </div>
      </section>

     


      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Vincent C Academy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
