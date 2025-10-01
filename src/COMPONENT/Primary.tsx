import React, { useState } from "react";
import "./Primary.css";
import image1 from "../assets/kids-having-fun-on-swing-260nw-2457556199.webp";
import image2 from "../assets/kids-play-table-soccer-popup-260nw-2459089983.webp";
import image3 from "../assets/images (13).jpg";
import image4 from "../assets/images (2).jpg";
import image5 from "../assets/images (14).jpg";
import image6 from "../assets/images (15).jpg";
import image7 from "../assets/images (17).jpg";
import image8 from "../assets/images (10).jpg";
import image9 from "../assets/images (16).jpg";
import image10 from "../assets/images (5).jpg";
import {
  
  GraduationCap,
  
} from "lucide-react";
const Primary = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="primary-school">
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
      <header className="primary-hero">
        <h1>Vincent C Academy</h1>
        <p>
          Building a strong educational foundation where curiosity leads to
          discovery and every child is nurtured to shine.
        </p>
      </header>

      <section className="section about">
        <h2>Our Mission</h2>
        <p>
          At Vincent C Academy, we believe in nurturing every
          child through quality education, creativity, and values. Our vision is
          to develop global citizens equipped with 21st-century skills.
        </p>
      </section>

      <section className="section gallery">
        <h2>Campus Life</h2>
        <div className="gallery-grid">
          <img src={image1} alt="Outdoor Sports" />
          <img src={image2} alt="Computer Class" />
          <img src={image3} alt="Inside Classroom" />
          <img src={image4} alt="School Library" />
          <img src={image8} alt="School Library" />
          <img src={image9} alt="School Library" />
          <img src={image10} alt="School Library" />
        </div>
      </section>

      <section className="section videos">
        <h2>Event Highlights</h2>
        <div className="video-wrapper">
          <video controls>
            <source src="/videos/school-event1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls>
            <source src="/videos/school-event2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="section awards">
        <h2>Achievements</h2>
        <p>
          Our students have excelled in academics, arts, and sports. These awards
          are a reflection of our commitment to excellence.
        </p>
        <div className="award-gallery">
          <img src={image5} alt="Award 1" />
          <img src={image6} alt="Award 2" />
          <img src={image7} alt="Award 3" />
        </div>
      </section>

      <section className="section curriculum">
        <h2>Curriculum Activities</h2>
        <p>
          Our curriculum is balanced across academics, arts, sports, and Religious
          moral education, fostering a holistic approach to child development.
        </p>
        <ul className="curriculum-list">
          <li>Literacy and Numeracy Foundations</li>
          <li>Computer & Digital Skills</li>
          <li>Physical Education & Health</li>
          <li>Religious and Moral Education</li>
          <li>STEM-focused Classroom Activities</li>
          <li>Creative Arts & Music</li>
          <li>Leadership & Character Development</li>
        </ul>
      </section>


     <div className="nav-item register-btn">
  <a 
    href="/PrimaryRegistration" 
    className="nav-link" 
    onClick={() => setMenuOpen(false)}
  >
    Register online
  </a>
</div>




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
      <footer className="vc-footer">
        © {new Date().getFullYear()} Vincent C Academy. All rights reserved.
      </footer>
    </div>
  );
};

export default Primary;
