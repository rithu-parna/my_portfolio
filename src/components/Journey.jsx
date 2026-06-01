import React from 'react';
import { motion } from 'framer-motion';

export default function Journey() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -45, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 45, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const timelineItemVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const timelineDotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 14 }
    }
  };

  const timelineContentVariants = {
    hidden: { opacity: 0, x: 16, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="journey" className="section" style={{ borderTop: '1px solid var(--card-border)' }}>
      <div className="container" style={{ marginTop: '-52px' }}>
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="section-subtitle">My Journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-desc">
            A historical look at my professional work experience and educational background.
          </p>
        </motion.div>

        <div className="journey-grid">
          {/* Work Experience */}
          <motion.div
            className="journey-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeInLeft}
          >
            <h3 className="journey-column-title">
              <span className="logo-dot" style={{ background: 'var(--accent-primary)' }}></span> Work Experience
            </h3>

            <div className="timeline">
              <motion.div
                className="timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={timelineItemVariants}
              >
                <motion.div className="timeline-dot" variants={timelineDotVariants}></motion.div>
                <motion.div className="timeline-header-info" variants={timelineContentVariants}>
                  <span className="timeline-date">May 2023 - Present</span>
                  <span className="timeline-role">Product Engineer</span>
                </motion.div>
                <motion.div className="timeline-company" variants={timelineContentVariants}>Frugal Scientific</motion.div>
                <motion.p className="timeline-desc" variants={timelineContentVariants}>
                  Responsible for building and integrating multiple modules within a logistics and supply chain management platform. Focuses on designing centralized RFQ & job dashboards, service booking modules, real-time notification alerts, and customer/vendor finance modules.
                </motion.p>
              </motion.div>

              <motion.div
                className="timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={timelineItemVariants}
              >
                <motion.div className="timeline-dot" variants={timelineDotVariants}></motion.div>
                <motion.div className="timeline-header-info" variants={timelineContentVariants}>
                  <span className="timeline-date">Dec 2022 - May 2023</span>
                  <span className="timeline-role">Frontend Developer Intern</span>
                </motion.div>
                <motion.div className="timeline-company" variants={timelineContentVariants}>Full Stack Developer Academy</motion.div>
                <motion.p className="timeline-desc" variants={timelineContentVariants}>
                  Built responsive and visually appealing web applications using HTML, CSS, Bootstrap, and JavaScript. Crafted clean, efficient, and scalable JS code, designed back-end services with Node.js/Express, and handled MySQL/MongoDB data persistence.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="journey-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeInRight}
          >
            <h3 className="journey-column-title">
              <span className="logo-dot" style={{ background: 'var(--accent-secondary)' }}></span> Education
            </h3>

            <div className="timeline">
              <motion.div
                className="timeline-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={timelineItemVariants}
              >
                <motion.div className="timeline-dot" variants={timelineDotVariants}></motion.div>
                <motion.div className="timeline-header-info" variants={timelineContentVariants}>
                  <span className="timeline-date">2019 - 2022</span>
                  <span className="timeline-role">B.Sc Computer Science</span>
                </motion.div>
                <motion.div className="timeline-company" variants={timelineContentVariants}>RSM SNDP Yogam College</motion.div>
                <motion.p className="timeline-desc" variants={timelineContentVariants}>
                  Acquired foundational knowledge in database management systems, web development, software engineering, and core programming principles.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
