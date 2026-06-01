import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import { projects } from '../data/projects';

export default function Projects() {
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

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

  const staggerProjectCard = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="section-subtitle">Selected Work</span>
          <h2 className="section-title">Projects Showcase</h2>
          <p className="section-desc">
            A handpicked selection of React applications showing engineering complexity and performance focus.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.ul
          className="portfolio-filters"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInDown}
        >
          {['all', 'react', 'fullstack', 'apps', 'tools', 'creative'].map((cat) => (
            <li key={cat}>
              <button
                className={`filter-btn ${projectFilter === cat ? 'active' : ''}`}
                onClick={() => setProjectFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </motion.ul>

        <motion.div
          key={`${projectFilter}-${showAllProjects}`}
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          variants={staggerContainer}
        >
          {(showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)).map((project) => (
            <motion.div
              className="project-card glass-card premium-card"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              variants={staggerProjectCard}
            >
              <div className="project-media">
                <div className="project-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span className="mockup-dot" style={{ backgroundColor: '#ef4444' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#eab308' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#10b981' }}></span>
                    </div>
                    <div className="mockup-address">
                      {project.title.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                  <div className="mockup-image-container">
                    <img src={project.image} alt={project.title} className="mockup-img" />
                    <div className="mockup-overlay">
                      <span className="view-details-glow">View Architecture</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card-info">
                <span className="project-card-tag">{project.tag.toUpperCase()}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>

                <div className="project-card-tech">
                  {project.tech.map((t, idx) => (
                    <span className="tech-badge" key={idx}>{t}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <span className="explore-link">View Details <ChevronRight size={14} className="project-chevron" /></span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link-icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {filteredProjects.length > 3 && (
          <div className="view-more-container">
            <button
              className="view-more-btn"
              onClick={() => {
                setShowAllProjects(!showAllProjects);
                if (showAllProjects) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>{showAllProjects ? 'View Less' : 'View All'}</span>
              <ChevronDown
                size={14}
                className={`view-more-icon ${showAllProjects ? 'rotated' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Project Modal Detail Overlay */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content premium-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <div className="modal-grid">
              {/* Left Column: Interactive Screenshot Showcase */}
              <div className="modal-preview-col">
                <div className="modal-browser-mockup">
                  <div className="browser-header">
                    <div className="mockup-dots">
                      <span className="mockup-dot" style={{ backgroundColor: '#ef4444' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#eab308' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#10b981' }}></span>
                    </div>
                    <div className="browser-address">
                      https://{selectedProject.title.toLowerCase().replace(/\s+/g, '')}.com/showcase
                    </div>
                  </div>
                  <div className="browser-body">
                    <img src={selectedProject.image} alt={selectedProject.title} className="modal-screenshot" />
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Details */}
              <div className="modal-info-col">
                <div className="modal-info-header">
                  <span className="modal-badge" style={{ color: selectedProject.themeColor, borderColor: `${selectedProject.themeColor}33`, background: `${selectedProject.themeColor}11` }}>
                    {selectedProject.tag}
                  </span>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <div className="modal-meta-row">
                    <span>Role: Lead Product Engineer</span>
                    <span className="bullet">•</span>
                    <span>Category: {selectedProject.category.toUpperCase()}</span>
                  </div>
                </div>

                <div className="modal-info-body">
                  <h4 className="info-section-title">PROJECT OVERVIEW</h4>
                  <p className="modal-desc-text">{selectedProject.details}</p>

                  <h4 className="info-section-title">ENGINEERING STACK</h4>
                  <div className="modal-tech-grid">
                    {selectedProject.tech.map((t, idx) => (
                      <span className="modal-tech-chip" key={idx} style={{ borderLeft: `3px solid ${selectedProject.themeColor}` }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-info-footer">
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary modal-action-btn">
                    Launch Application <ExternalLink size={16} />
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary modal-action-btn">
                    Explore Codebase <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
