import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={fadeInUp}
    >
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Rithuparna AC. All rights reserved. Made with React.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
