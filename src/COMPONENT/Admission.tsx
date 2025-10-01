import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admission.css";

const Admissions = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admissions-page">
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
      
      {/* Hero Section */}
      <section className="admissions-hero">
        <div className="hero-text">
          <h1>Admissions at Vincent C Academy</h1>
          <p>
            Discover excellence in education. Join our learning community where
            students thrive academically, socially, and personally.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="admissions-tabs">
        <NavLink to="Primary" className="tab">
          Primary Section
        </NavLink>
        <NavLink to="Secondary" className="tab">
          Secondary Section
        </NavLink>
      </section>

      {/* Dynamic Content */}
      <section className="admissions-content">
        <Outlet />
      </section>

      {/* Admissions Policy */}
      <section className="admissions-policy">
        <h2>Admissions Criteria & Policy</h2>
        <p>
          At Vincent C Academy, we provide high-quality education in a nurturing
          environment. Our admissions process ensures that each student meets
          academic and character standards for success in our community.
        </p>
        <div className="download-buttons">
          <a href="" className="btn" download>
            Download Primary Form
          </a>
          <a href="" className="btn" download>
            Download Secondary Form
          </a>
        </div>
      </section>

      {/* Contact */}
      <section className="admissions-contact">
        <h2>Contact the Admissions Office</h2>
        <p><strong>Phone:</strong> +234 810 297 4792</p>
        <p><strong>Email:</strong> contact@vincentcacademy.org.ng</p>
        <p><strong>Hours:</strong> Monday – Friday: 9:00 A.M. – 4:00 P.M.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Vincent c Academy. All rights reserved.
      </footer>
    </div>
  );
};

export default Admissions;
