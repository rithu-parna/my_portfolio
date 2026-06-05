import { motion } from "framer-motion";
import { Calendar, Award, Users, Download } from "lucide-react";

export default function About() {
  const ResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Rithuparna_Front_End_Developer.pdf";
    link.download = "Frontend Developer Rithuparna_AC.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -45, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 45, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="section">
      <div className="container" style={{ marginTop: "-32px" }}>
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="section-subtitle">Biography</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>
        <div className="about-grid">
          <motion.div
            className="about-image-side"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <div className="about-image-wrapper">
              <img
                src="/about_developer.jpeg"
                alt="Rithuparna A C"
                className="about-profile-img"
              />
              <div className="about-image-glow"></div>
            </div>
          </motion.div>

          <motion.div
            className="about-info-side"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInRight}
          >
            <h3 className="about-main-title">SOFTWARE DEVELOPER</h3>

            <p className="about-desc-text">
              Expert MERN stack developer with a proven track record of building
              high-performance, scalable, and user-focused web applications.
              Proficient in React.js, Redux, Node.js, Express.js, and MongoDB,
              with deep expertise in modern JavaScript (ES6+), HTML5, and CSS3.
              Skilled in writing clean, maintainable code and following industry
              best practices. Experienced in agile environments, automated
              development workflows, and version control using Git. Dedicated to
              delivering reliable, secure, and optimized solutions that align
              with business goals and enhance user experience.
            </p>

            <div className="about-contact-details">
              <div className="contact-detail-row">
                <strong>Email:</strong>{" "}
                <a href="mailto:rithu7025@gmail.com">rithu7025@gmail.com</a>
              </div>
              <div className="contact-detail-row">
                <strong>Address:</strong>{" "}
                <span>
                  Kizhakke Vellamthatta House, Payyoli post, Kozhikode, Pin-
                  673522
                </span>
              </div>
              <div className="contact-detail-row">
                <strong>Phone:</strong>{" "}
                <a href="tel:+918086710182">+91 8086710182</a>
              </div>
              <div className="contact-detail-row">
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/rithu-parna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/rithu-parna
                </a>
              </div>
              <div className="contact-detail-row">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/rithuparna-rithu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/rithuparna-rithu
                </a>
              </div>
            </div>

            <div className="about-stats-grid">
              <div className="about-stat-card">
                <div className="about-stat-icon">
                  <Calendar size={20} />
                </div>
                <div className="about-stat-info">
                  <h4>3+</h4>
                  <p>Years Experience</p>
                </div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-icon">
                  <Award size={20} />
                </div>
                <div className="about-stat-info">
                  <h4>10+</h4>
                  <p>Projects Completed</p>
                </div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-icon">
                  <Users size={20} />
                </div>
                <div className="about-stat-info">
                  <h4>5+</h4>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>

            <div className="about-actions-row" onClick={ResumeDownload}>
              <a className="btn btn-primary">
                Download Resume <Download size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
