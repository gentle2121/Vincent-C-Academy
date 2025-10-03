import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import "./Contactus.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } },
};

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      const res = await fetch("https://formspree.io/f/xjkabgyv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "✅ Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "❌ Something went wrong." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "❌ Network error. Try again." });
    }
  };

  return (
    <div className="contact-page">
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
      <section className="hero">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="hero-content">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Reach out with any questions.</p>
        </motion.div>
      </section>

      {/* Contact Grid */}
      <section className="section">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="card-box contact-grid">
            {/* Map */}
            <div className="map-container">
              <iframe
                title="Vincent C Academy Location"
                src="https://www.google.com/maps?q=No12+Chikwere+Street+Tetlow+School+Road+Owerri+Municipal+Owerri+Imo+State&output=embed"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Form + Info */}
            <div className="contact-right">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit" className="btn primary">
                  {status.type === "loading" ? "Sending..." : "Send Message"}
                  <ArrowRight size={16} />
                </button>
                {status.type && (
                  <p className={`status-message ${status.type}`}>{status.message}</p>
                )}
              </form>

              <div className="contact-info">
                <h2>Our Location</h2>
                <p><MapPin /> 12 Chikwere Street, Imo, Nigeria</p>
                <p><Phone /> +234 810 297 4792</p>
                <p><Mail /> contact@vincentcacademy.org.ng</p>
              </div>

              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
                <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Vincent C Academy. All rights reserved.
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2348102974792"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
    </div>
  );
}
