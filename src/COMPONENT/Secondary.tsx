import React, { useState } from "react";

import "./Secondary.css"; 
import sec1 from "../assets/images (18).jpg";
import sec2 from "../assets/images (8).jpg";
import sec3 from "../assets/Boarding-Common-Room-e1538503886336.jpg";
import sec4 from "../assets/IMG_20230413_190525_787-768x660.webp";
import sec5 from "../assets/images (20).jpg";
import { GraduationCap } from "lucide-react";

const Secondary = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="secondary-school">
      {/* Navigation Header */}
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
      
      {/* Hero Section */}
      <header className="secondary-hero">
        <h1>Vincent C Academy</h1>
        <p>
          Inspiring young minds to lead, innovate, and excel in academics, 
          sports, arts, and leadership.
        </p>
      </header>

      {/* Subjects Section */}
      <section className="section subjects">
        <h2>Subjects Offered</h2>
        <ul className="subject-list">
          <li>Mathematics & Further Mathematics</li>
          <li>Sciences: Physics, Chemistry, Biology</li>
          <li>ICT & Computer Science</li>
          <li>Social Sciences & Humanities</li>
          <li>Languages: English, French, Yoruba, Igbo, Hausa</li>
          <li>Entrepreneurship & Business Studies</li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section className="section gallery">
        <h2>Life at Vincent C Academy</h2>
        <div className="gallery-grid">
          <img src={sec1} alt="Classroom" />
          <img src={sec2} alt="Science Lab" />
          <img src={sec3} alt="Debate Club" />
          <img src={sec4} alt="Sports Team" />
        </div>
      </section>

      {/* Clubs and Societies */}
      <section className="section clubs">
        <h2>Clubs & Societies</h2>
        <p>
          Beyond the classroom, students thrive through vibrant extracurricular
          activities that build leadership and teamwork.
        </p>
        <ul className="club-list">
          <li>STEM & Robotics Club</li>
          <li>Debate & Literary Society</li>
          <li>Music & Performing Arts</li>
          <li>Sports Teams & Fitness Club</li>
          <li>Red Cross & Community Service</li>
        </ul>
      </section>

      {/* Leadership & Alumni */}
      <section className="section leadership">
        <h2>Leadership & Alumni Success</h2>
        <p>
          Our students graduate with confidence, integrity, and global competence.
          Many of our alumni have excelled in universities and careers worldwide.
        </p>
        <img src={sec5} alt="Graduation" className="alumni-img" />
      </section>

      {/* Register Button */}
      <div className="nav-item register-btn">
        <a 
          href="/Registration" 
          className="nav-link" 
          onClick={() => setMenuOpen(false)}
        >
          Register Online
        </a>
      </div>

      {/* Contact Section */}
      <section id="admissions-contact" className="section">
  <div className="card-box contact-section">
    <h2>Admissions Department</h2>
    <p><strong>Admissions Officer:</strong> +234 810 297 4792</p>
    <p><strong>Email:</strong> nnajivincentchidera@gmail.com</p>
    <p><strong>Hours:</strong> Mon – Fri: 9:00 A.M. – 4:00 P.M.</p>
    <div className="social-links">
      <a href="">Facebook</a> | <a href="">Instagram</a>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Vincent c Academy. All rights reserved.
      </footer>
    </div>
  );
};

export default Secondary;
