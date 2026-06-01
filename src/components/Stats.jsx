import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.03
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          className="stats-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={staggerContainer}
        >
          <motion.div className="stat-card" variants={staggerItem}>
            <div className="stat-number">3+</div>
            <div className="stat-label">Years of Experience</div>
          </motion.div>
          <motion.div className="stat-card" variants={staggerItem}>
            <div className="stat-number">15+</div>
            <div className="stat-label">Projects Completed</div>
          </motion.div>
          <motion.div className="stat-card" variants={staggerItem}>
            <div className="stat-number">1k+</div>
            <div className="stat-label">GitHub Contributions</div>
          </motion.div>
          <motion.div className="stat-card" variants={staggerItem}>
            <div className="stat-number">99%</div>
            <div className="stat-label">Performance Core Web Vitals</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
