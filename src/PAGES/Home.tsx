import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Info, Mail, Phone, ArrowRight } from "lucide-react";
import "./Home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } },
};

export default function SchoolHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="vc-homepage">
      {/* Navigation */}
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
      <section className="vc-hero">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="vc-hero-content"
        >
          <h1>Nurturing Minds. Building Character.</h1>
          <p>
            A vibrant learning community where every student thrives in
            academics, arts, and leadership.
          </p>
          <div className="vc-hero-buttons">
            <a href="/Admissions" className="vc-btn vc-primary">
              Start Application <ArrowRight size={18} />
            </a>
            <a href="/Aboutus" className="vc-btn vc-secondary">
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Us */}
      <section id="about" className="vc-section">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="vc-card">
            <h2>About Us</h2>
            <p>
              Vincent C Academy is dedicated to holistic education. With
              passionate teachers, modern facilities, and engaging co-curricular
              programs, we prepare students to excel and serve their communities
              with curiosity, integrity, and resilience.
            </p>
            <div className="vc-info-grid">
              <div className="vc-info-card"><strong>Mission:</strong> Empower students to become confident and creative leaders.</div>
              <div className="vc-info-card"><strong>Vision:</strong> A joyful community where every child belongs and excels.</div>
              <div className="vc-info-card"><strong>Values:</strong> Respect • Excellence • Service • Growth.</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Admissions */}
      <section id="admissions" className="vc-section">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="vc-card">
            <h2>Admissions</h2>
            <p>We welcome applications for Nursery, Primary, and Secondary levels.</p>
            <div className="vc-steps">
              <div className="vc-step"><span>1</span> Inquiry & Campus Tour</div>
              <div className="vc-step"><span>2</span> Assessment & Interview</div>
              <div className="vc-step"><span>3</span> Enrollment & Orientation</div>
            </div>
            <div className="vc-hero-buttons">
              <a href="/Contact" className="vc-btn vc-primary">Ask Admissions</a>
              <a href="" className="vc-btn vc-secondary">Download Prospectus</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="vc-section">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="vc-card">
            <h2>Contact Us</h2>
            <div className="vc-contact-grid">
              <div className="vc-contact-item"><Mail /> info@vincentcacademy.edu</div>
              <div className="vc-contact-item"><Phone /> +234 (0) 810-297-4792</div>
              <div className="vc-contact-item"><Info /> 12 Tetlow, Owerri, Lagos, Nigeria</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Admissions Contact */}
      <section id="admissions-contact" className="vc-section">
        <div className="vc-card vc-contact-section">
          <h2>Admissions Department</h2>
          <p><strong>Admissions Officer:</strong> +234 810 297 4792</p>
          <p><strong>Email:</strong> nnajivincentchidera@gmail.com</p>
          <p><strong>Hours:</strong> Mon – Fri: 9:00 A.M. – 4:00 P.M.</p>
          <div className="vc-social-links">
            <a href="">Facebook</a> | <a href="">Instagram</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="vc-footer">
        © {new Date().getFullYear()} Vincent C Academy. All rights reserved.
      </footer>
    </div>
  );
}
