import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Send, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formState.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success Simulation
    setShowToast(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

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

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="section-subtitle">Collaborate</span>
          <h2 className="section-title">Let's Build Something Great</h2>
          <p className="section-desc">
            Have a complex frontend problem, require premium React development, or want to discuss full-time roles? Reach out today.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left Column: Interactive Contact Dashboard */}
          <motion.div
            className="contact-info-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeInLeft}
          >
            {/* Availability Indicator */}
            <div className="availability-card glass-card">
              <div className="availability-pulse">
                <span className="pulse-dot"></span>
              </div>
              <div className="availability-text">
                <span className="status-label">CURRENT AVAILABILITY</span>
                <span className="status-value">Active & Open to New Opportunities</span>
              </div>
            </div>

            {/* Interactive Contact Cards */}
            <div className="contact-methods-stack">
              {/* Email Card */}
              <div
                className="interactive-contact-card glass-card"
                onClick={() => handleCopy('rithu7025@gmail.com', 'email')}
              >
                <div className="card-icon-wrapper">
                  <Mail size={22} className="card-icon" />
                </div>
                <div className="card-content">
                  <span className="card-label">DIRECT EMAIL</span>
                  <a href="mailto:rithu7025@gmail.com" className="card-value" onClick={(e) => e.stopPropagation()}>
                    rithu7025@gmail.com
                  </a>
                </div>
                <button className="copy-action-btn" aria-label="Copy Email">
                  {copiedType === 'email' ? <span className="copy-tooltip active">Copied!</span> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div
                className="interactive-contact-card glass-card"
                onClick={() => handleCopy('+918086710182', 'phone')}
              >
                <div className="card-icon-wrapper">
                  <Phone size={22} className="card-icon" />
                </div>
                <div className="card-content">
                  <span className="card-label">PHONE & WHATSAPP</span>
                  <a href="tel:+918086710182" className="card-value" onClick={(e) => e.stopPropagation()}>
                    +91 8086710182
                  </a>
                </div>
                <button className="copy-action-btn" aria-label="Copy Phone">
                  {copiedType === 'phone' ? <span className="copy-tooltip active">Copied!</span> : <Copy size={16} />}
                </button>
              </div>

              {/* Location Card */}
              <div className="interactive-contact-card glass-card location-card">
                <div className="card-icon-wrapper">
                  <MapPin size={22} className="card-icon" />
                </div>
                <div className="card-content">
                  <span className="card-label">LOCATION</span>
                  <span className="card-value">Kozhikode, Kerala, India</span>
                </div>
              </div>
            </div>

            {/* Social Channels Connect */}
            <div className="social-connect-box glass-card">
              <span className="connect-title">CONNECT ELSEWHERE</span>
              <div className="social-connect-links">
                <a href="https://github.com/rithu-parna" target="_blank" rel="noopener noreferrer" className="social-connect-btn github">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/rithuparna-rithu" target="_blank" rel="noopener noreferrer" className="social-connect-btn linkedin">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Contact Form */}
          <motion.div
            className="contact-form-panel glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeInRight}
          >
            <form className="premium-contact-form" onSubmit={handleFormSubmit}>
              {/* Floating Group: Name */}
              <div className={`form-floating-group ${formState.name ? 'has-value' : ''}`}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="input-focus-line"></div>
                {formErrors.name && <span className="form-error-msg">{formErrors.name}</span>}
              </div>

              {/* Floating Group: Email */}
              <div className={`form-floating-group ${formState.email ? 'has-value' : ''}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-focus-line"></div>
                {formErrors.email && <span className="form-error-msg">{formErrors.email}</span>}
              </div>

              {/* Floating Group: Message */}
              <div className={`form-floating-group ${formState.message ? 'has-value' : ''}`}>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder=" "
                  required
                ></textarea>
                <label htmlFor="message" className="form-label">Tell me about your project...</label>
                <div className="input-focus-line"></div>
                {formErrors.message && <span className="form-error-msg">{formErrors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary premium-submit-btn">
                <span>Send Message</span>
                <Send size={16} className="submit-send-icon" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating Success Toast */}
      {showToast && (
        <div className="toast">
          <CheckCircle size={18} />
          <span>Message sent successfully! Thanks for reaching out.</span>
        </div>
      )}
    </section>
  );
}
