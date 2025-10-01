import React, { useState } from "react";
import { GraduationCap, CalendarDays, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./Event.css";

const eventsData = [
  {
    id: 1,
    title: "Annual Cultural Day",
    date: "October 20, 2025",
    description: "A celebration of diversity and culture through music, dance, and food.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "STEM Innovation Fair",
    date: "November 15, 2025",
    description: "Students showcase science, technology, and engineering projects.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "End of Year Concert",
    date: "December 10, 2025",
    description: "A musical evening with choir, orchestra, and drama performances.",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Sports Day",
    date: "January 22, 2026",
    description: "Students compete in athletics, football, and team games.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Debate & Quiz Competition",
    date: "February 10, 2026",
    description: "Inter-house academic challenge to boost critical thinking.",
    image: "https://images.unsplash.com/photo-1581092580485-60e8a2a8dd1a?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Art & Creativity Exhibition",
    date: "March 5, 2026",
    description: "An exhibition of students’ artworks, crafts, and photography.",
    image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Leadership Summit",
    date: "April 12, 2026",
    description: "Empowering students with leadership and entrepreneurship skills.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Parents Open Day",
    date: "May 8, 2026",
    description: "Engaging parents in academic reports and co-curricular displays.",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Graduation Ceremony",
    date: "July 25, 2026",
    description: "Celebrating the achievements of our graduating students.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2400&auto=format&fit=crop",
  },
];

export default function EventsPage(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="vc-events-page">
      {/* Navigation Header */}
      <header className="vc-header">
        <div className="vc-logo">
          <GraduationCap className="vc-icon" color="#fff" />
          <span style={{ color: "#fff" }}>Vincent C Academy</span>
        </div>

        <nav className={menuOpen ? "vc-nav open" : "vc-nav"}>
          <ul>
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/Aboutus" onClick={() => setMenuOpen(false)}>About Us</a></li>
            <li><a href="/Admissions" onClick={() => setMenuOpen(false)}>Admissions</a></li>
            <li><a href="/Event" onClick={() => setMenuOpen(false)}>Events</a></li>
            <li><a href="/Contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li><a href="/Parentforum" onClick={() => setMenuOpen(false)}>Parents Forum</a></li>
          </ul>
        </nav>

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
      <section className="vc-events-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="vc-events-hero-content"
        >
          <h1>Upcoming Events</h1>
          <p>
            Stay connected with Vincent C Academy. Explore our vibrant events that inspire
            learning, creativity, and community.
          </p>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="vc-events-section">
        <div className="vc-events-grid">
          {eventsData.map((event) => (
            <motion.div
              key={event.id}
              className="vc-event-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={event.image} alt={event.title} className="vc-event-img" />
              <div className="vc-event-content">
                <h2>{event.title}</h2>
                <p className="vc-event-date">
                  <CalendarDays size={18} /> {event.date}
                </p>
                <p className="vc-event-desc">{event.description}</p>
                <div className="vc-event-actions">
                  <a href="#" className="vc-btn vc-primary">
                    Learn More <ArrowRight size={16} />
                  </a>
                  <a href="#" className="vc-btn vc-secondary">Register</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="vc-footer">
        © {new Date().getFullYear()} Vincent C Academy. All rights reserved.
      </footer>
    </div>
  );
}
