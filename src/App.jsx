import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Code2, 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  Mail, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Send, 
  CheckCircle,
  ExternalLink,
  MapPin,
  Phone,
  ChevronRight
} from 'lucide-react';
import './App.css';

// Custom SVG Icons (Lucide brand icons removed in v1)
const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom Hook for Typing Animation
const useTypewriter = (words, speed = 100, delay = 1500) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentWord.slice(0, prev.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
};

function App() {
  // Theme & Navigation States
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Terminal State
  const [activeTerminalTab, setActiveTerminalTab] = useState('about.js');

  // Skills Animation State
  const [skillsActive, setSkillsActive] = useState(false);



  // Projects State
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  // Refs for Scroll Spy and Skills trigger
  const skillsRef = useRef(null);

  // Cycle list for Typing Title
  const roles = ["Product Engineer", "React.js Developer", "Frontend Developer", "API Integration Specialist"];
  const typingRole = useTypewriter(roles);

  // Manage Scroll Header & Spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple Skills Section Trigger
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setSkillsActive(true);
        }
      }

      // Scroll Spy for Navbar
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };



  // Contact Form Validation & Submit
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

  // Project List
  const projects = [
    {
      id: 1,
      title: "Savitha Jewellery",
      category: "react",
      tag: "E-Commerce Platform",
      desc: "A premium customer-facing jewelry storefront featuring high-performance product browsing, responsive catalogs, and fluid user journeys.",
      details: "Savitha Jewellery is a live customer e-commerce application. Developed using React.js and modern web standards, it delivers optimized page loading speeds and highly responsive customer journeys. Built with reusability, modular layouts, and cross-browser visual consistency in mind.",
      tech: ["React.js", "JavaScript (ES6)", "CSS3", "Responsive UI"],
      themeColor: "var(--accent-primary)",
      liveUrl: "https://www.savithajewellery.com/",
      githubUrl: "https://github.com/rithu-parna"
    },
    {
      id: 2,
      title: "Torus Logistics SCM",
      category: "tools",
      tag: "Supply Chain Dashboard",
      desc: "A complex enterprise logistics dashboard displaying real-time job tasklists, RFQ listings, shipping workflows, and billing modules.",
      details: "Torus SCM is a supply chain management system built to handle intricate business operations. Responsible for designing centralized RFQ lists with advanced filtration controls, real-time approval notification system, service booking segments, billing workflows (invoices/credits), and customer/vendor finance modules.",
      tech: ["React.js", "Redux", "RESTful API Integration", "Bootstrap"],
      themeColor: "var(--accent-secondary)",
      liveUrl: "http://139.59.13.165:3564/",
      githubUrl: "https://github.com/rithu-parna"
    },
    {
      id: 3,
      title: "Thillakkam Fancy Mall",
      category: "creative",
      tag: "Storefront Web App",
      desc: "An elegant retail web application built with component-driven layouts and optimized filtration views for product exploration.",
      details: "Thillakkam Fancy Mall is a live retail store application. Emphasizes clean catalog listing layouts, efficient image loading strategies, and intuitive device-specific layouts to guarantee a seamless consumer shopping experience on both mobile and desktop screens.",
      tech: ["React.js", "HTML5", "CSS3 Modules", "Git/GitHub"],
      themeColor: "#10b981",
      liveUrl: "https://thillakkamfancy.in/",
      githubUrl: "https://github.com/rithu-parna"
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  // Skill Config Data
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: <Code2 size={20} />,
      skills: [
        { name: "React.js & Redux", level: 95 },
        { name: "JavaScript (ES6+) & JSX", level: 92 },
        { name: "HTML5, CSS3 & Bootstrap", level: 95 },
        { name: "Material UI, Core UI, jQuery", level: 85 }
      ]
    },
    {
      title: "Backend & API Tools",
      icon: <Layers size={20} />,
      skills: [
        { name: "RESTful API Integration", level: 95 },
        { name: "Python & Django Framework", level: 75 },
        { name: "MySQL Database Schema", level: 80 },
        { name: "Postman & API Testing", level: 90 }
      ]
    },
    {
      title: "Development Practices",
      icon: <Cpu size={20} />,
      skills: [
        { name: "Responsive Web Design", level: 95 },
        { name: "Git & GitHub Workflow", level: 90 },
        { name: "npm & Dependency Tooling", level: 88 },
        { name: "Debugging & Unit Testing", level: 85 }
      ]
    }
  ];



  return (
    <div className="portfolio-app">
      {/* Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="logo">
            Rithuparna A C<span className="logo-dot"></span>
          </a>

          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <li>
                <a 
                  href="#home" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About & Experience
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
              </li>

              <li>
                <a 
                  href="#projects" 
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button 
              className="icon-btn" 
              onClick={toggleTheme} 
              aria-label="Toggle light/dark theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="icon-btn menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle main menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="glow-bg animate-pulse-slow" style={{ top: '-10%', left: '-10%' }}></div>
        <div className="glow-bg-cyan animate-pulse-slow" style={{ bottom: '10%', right: '-10%' }}></div>
        
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tagline">
                <span className="badge">Available for Work</span>
              </div>
              <h1 className="hero-title">
                Crafting Digital <br />
                <span className="gradient-text">Experiences</span>
              </h1>
              <div className="hero-subtitle">
                I'm a <span className="gradient-text">{typingRole}</span>
                <span className="cursor">|</span>
              </div>
              <p className="hero-desc">
                Product Engineer with 3+ years of experience building responsive, scalable web applications using React.js, Redux, and JavaScript. Experienced in developing enterprise supply chain modules, logistics panels, and commercial e-commerce storefronts.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">
                  View Projects <ArrowUpRight size={16} />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="terminal-box animate-float">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red"></span>
                    <span className="terminal-dot dot-yellow"></span>
                    <span className="terminal-dot dot-green"></span>
                  </div>
                  <span className="terminal-title">rithuparna@ac-portfolio ~</span>
                  <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="terminal-tabs">
                  <button 
                    className={`terminal-tab ${activeTerminalTab === 'about.js' ? 'active' : ''}`}
                    onClick={() => setActiveTerminalTab('about.js')}
                  >
                    about.js
                  </button>
                  <button 
                    className={`terminal-tab ${activeTerminalTab === 'skills.json' ? 'active' : ''}`}
                    onClick={() => setActiveTerminalTab('skills.json')}
                  >
                    skills.json
                  </button>
                </div>
                <div className="terminal-body">
                  {activeTerminalTab === 'about.js' ? (
                    <pre className="terminal-code">
                      <code>
                        <span className="code-keyword">const</span> developer = &#123;<br />
                        &nbsp;&nbsp;name: <span className="code-string">"Rithuparna AC"</span>,<br />
                        &nbsp;&nbsp;role: <span className="code-string">"Product Engineer"</span>,<br />
                        &nbsp;&nbsp;philosophy: <span className="code-string">"Scalable architectures & API Integration"</span>,<br />
                        &nbsp;&nbsp;coreStack: [<span className="code-string">"React.js"</span>, <span className="code-string">"Redux"</span>, <span className="code-string">"JavaScript"</span>],<br />
                        &nbsp;&nbsp;location: <span className="code-string">"Bangalore, India"</span>,<br />
                        &nbsp;&nbsp;experience: <span className="code-string">"3+ Years"</span><br />
                        &#125;;<br /><br />
                        <span className="code-comment">// Transforming complex requirements into UI</span><br />
                        <span className="code-keyword">function</span> <span className="code-function">init</span>() &#123;<br />
                        &nbsp;&nbsp;console.log(<span className="code-string">"Developing scalable supply chain modules..."</span>);<br />
                        &#125;<br />
                        <span className="code-function">init</span>();
                      </code>
                    </pre>
                  ) : (
                    <pre className="terminal-code">
                      <code>
                        &#123;<br />
                        &nbsp;&nbsp;<span className="code-variable">"technologies"</span>: &#123;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">"frontend"</span>: [<span className="code-string">"React.js"</span>, <span className="code-string">"Redux"</span>, <span className="code-string">"Bootstrap"</span>, <span className="code-string">"MUI"</span>],<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">"backend"</span>: [<span className="code-string">"Python"</span>, <span className="code-string">"Django"</span>, <span className="code-string">"MySQL"</span>, <span className="code-string">"Node.js"</span>],<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">"tools"</span>: [<span className="code-string">"Git"</span>, <span className="code-string">"GitHub"</span>, <span className="code-string">"Postman"</span>, <span className="code-string">"npm"</span>]<br />
                        &nbsp;&nbsp;&#125;,<br />
                        &nbsp;&nbsp;<span className="code-variable">"attributes"</span>: [<span className="code-string">"Collaborative"</span>, <span className="code-string">"Responsive"</span>, <span className="code-string">"Analytical"</span>]<br />
                        &#125;
                      </code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1k+</div>
              <div className="stat-label">GitHub Contributions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99%</div>
              <div className="stat-label">Performance Core Web Vitals</div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Experience Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Biography</span>
            <h2 className="section-title">Who is Rithuparna?</h2>
            <p className="section-desc">
              A brief lookup on my background, professional philosophy, and career journey.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-left">
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                I am a Product Engineer and Frontend Developer with a strong passion for building responsive, scalable web applications using React.js, Redux, and modern state management. With 3 years of hands-on experience, I focus on integrating RESTful APIs and optimizing cross-device performance.
              </p>
              <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                I believe in creating highly functional and accessible frontend interfaces. The details matter—from modular component reuse and clean code architectures down to state flows and responsive user journeys that make an application feel smooth and intuitive.
              </p>
              
              <div className="about-features">
                <div className="feature-card">
                  <div className="feature-icon"><Layers size={24} /></div>
                  <h4 className="feature-title">Modular Structure</h4>
                  <p className="feature-desc">Building dry, highly reusable component abstractions.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><Sparkles size={24} /></div>
                  <h4 className="feature-title">REST & API Flow</h4>
                  <p className="feature-desc">Integrating high-performance asynchronous data endpoints.</p>
                </div>
              </div>
            </div>

            <div className="about-right">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-dot" style={{ background: 'var(--accent-primary)' }}></span> History & Education
              </h3>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-header-info">
                    <span className="timeline-date">May 2023 - Present</span>
                    <span className="timeline-role">Product Engineer</span>
                  </div>
                  <div className="timeline-company">Frugal Scientific</div>
                  <p className="timeline-desc">
                    Responsible for building and integrating multiple modules within a logistics and supply chain management platform. Focuses on designing centralized RFQ & job dashboards, service booking modules, real-time notification alerts, and customer/vendor finance modules.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-header-info">
                    <span className="timeline-date">Dec 2022 - May 2023</span>
                    <span className="timeline-role">Frontend Developer Intern</span>
                  </div>
                  <div className="timeline-company">Full Stack Developer Academy</div>
                  <p className="timeline-desc">
                    Built responsive and visually appealing web applications using HTML, CSS, Bootstrap, and JavaScript. Crafted clean, efficient, and scalable JS code, designed back-end services with Node.js/Express, and handled MySQL/MongoDB data persistence.
                  </p>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-header-info">
                    <span className="timeline-date">2019 - 2022</span>
                    <span className="timeline-role">B.Sc Computer Science</span>
                  </div>
                  <div className="timeline-company">RSM SNDP Yogam College</div>
                  <p className="timeline-desc">
                    Acquired foundational knowledge in database management systems, web development, software engineering, and core programming principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }} ref={skillsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Capabilities</span>
            <h2 className="section-title">Technical Expertise</h2>
            <p className="section-desc">
              My engineering stack is curated to deliver robust architectures combined with elegant animations.
            </p>
          </div>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div className="skills-category glass-card" key={index}>
                <h3>
                  {category.icon}
                  {category.title}
                </h3>
                <div className="skills-list">
                  {category.skills.map((skill, sIdx) => (
                    <div className="skill-item" key={sIdx}>
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percent">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div 
                          className="skill-bar-fill" 
                          style={{ width: skillsActive ? `${skill.level}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Projects Portfolio Section */}
      <section id="projects" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Selected Work</span>
            <h2 className="section-title">Projects Showcase</h2>
            <p className="section-desc">
              A handpicked selection of React applications showing engineering complexity and performance focus.
            </p>
          </div>

          {/* Filters */}
          <ul className="portfolio-filters">
            {['all', 'react', 'tools', 'creative'].map((cat) => (
              <li key={cat}>
                <button 
                  className={`filter-btn ${projectFilter === cat ? 'active' : ''}`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div 
                className="project-card glass-card" 
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-media">
                  <div className="project-mockup">
                    <div className="mockup-header">
                      <span className="mockup-dot" style={{ backgroundColor: '#ef4444' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#eab308' }}></span>
                      <span className="mockup-dot" style={{ backgroundColor: '#10b981' }}></span>
                    </div>
                    <div className="mockup-content">
                      {project.id === 1 && (
                        <div className="mini-preview ecom-preview">
                          <div className="mini-item-card">
                            <span className="mini-item-img">💎</span>
                            <div className="mini-item-info">
                              <div className="mini-item-title">Savitha Gold</div>
                              <div className="mini-item-price">Catalog Live</div>
                            </div>
                            <span className="mini-item-btn">Browse</span>
                          </div>
                        </div>
                      )}
                      {project.id === 2 && (
                        <div className="mini-preview logistics-preview">
                          <div className="mini-chart">
                            <div className="bar" style={{ height: '35%' }}></div>
                            <div className="bar" style={{ height: '75%' }}></div>
                            <div className="bar" style={{ height: '55%' }}></div>
                            <div className="bar" style={{ height: '95%' }}></div>
                          </div>
                          <div className="mini-status">
                            <span className="dot pulse"></span> Torus SCM Monitor
                          </div>
                        </div>
                      )}
                      {project.id === 3 && (
                        <div className="mini-preview gallery-preview">
                          <div className="mini-gallery-grid">
                            <div className="grid-dot" style={{ background: 'var(--accent-primary)' }}></div>
                            <div className="grid-dot" style={{ background: '#10b981' }}></div>
                            <div className="grid-dot" style={{ background: '#3b82f6' }}></div>
                            <div className="grid-dot" style={{ background: 'var(--accent-secondary)' }}></div>
                          </div>
                          <div className="mini-search-bar">Thillakkam Mall...</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <span className="badge badge-cyan" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                  {project.category}
                </span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>
                
                <div className="project-card-footer">
                  <span>Explore Architecture</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal Detail Overlay */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={18} />
            </button>
            <div className="modal-hero">
              <div className="modal-hero-glow" style={{ background: `radial-gradient(circle, ${selectedProject.themeColor}33 0%, transparent 70%)` }}></div>
              <div 
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '24px',
                  background: selectedProject.themeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  zIndex: 2
                }}
              >
                {selectedProject.title.charAt(0)}
              </div>
            </div>
            <div className="modal-body">
              <span className="badge" style={{ marginBottom: '1rem', color: selectedProject.themeColor, borderColor: `${selectedProject.themeColor}44`, background: `${selectedProject.themeColor}11` }}>
                {selectedProject.tag}
              </span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              <div className="modal-meta">
                <span style={{ color: 'var(--text-muted)' }}>Role: Product Engineer</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ color: 'var(--text-muted)' }}>Category: {selectedProject.category}</span>
              </div>
              
              <p className="modal-desc">{selectedProject.details}</p>

              <h4 className="modal-section-title">Architectural Stack</h4>
              <div className="modal-tech-list">
                {selectedProject.tech.map((t, idx) => (
                  <span className="badge badge-cyan" key={idx}>{t}</span>
                ))}
              </div>

              <div className="modal-links">
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Launch App <ExternalLink size={16} />
                </a>
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Source Code <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Collaborate</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-desc">
              Have a complex frontend problem or want to collaborate on a premium website project? Drop a message.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-method">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <h4 className="contact-method-title">Direct Email</h4>
                  <a href="mailto:rithu7025@gmail.com" className="contact-method-value">rithu7025@gmail.com</a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <h4 className="contact-method-title">Location</h4>
                  <div className="contact-method-value">Kozhikode, Kerala, India</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <h4 className="contact-method-title">Phone & Social Connect</h4>
                  <a href="tel:+918086710182" className="contact-method-value" style={{ display: 'block', marginBottom: '0.75rem' }}>+91 8086710182</a>
                  <div className="social-links">
                    <a href="https://github.com/rithu-parna" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Github Profile"><Github size={18} /></a>
                    <a href="https://linkedin.com/in/rithuparna-rithu" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn Profile"><Linkedin size={18} /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form glass-card">
              <form className="contact-form-comp" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="e.g. John Doe"
                  />
                  {formErrors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formState.email}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="e.g. john@domain.com"
                  />
                  {formErrors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formState.message}
                    onChange={handleInputChange}
                    className="form-textarea" 
                    placeholder="Tell me about your project context..."
                  ></textarea>
                  {formErrors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{formErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Success Toast */}
      {showToast && (
        <div className="toast">
          <CheckCircle size={18} />
          <span>Message sent successfully! Thanks for reaching out.</span>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <a href="#home" className="logo">
              Rithuparna A C<span className="logo-dot"></span>
            </a>
            <p className="footer-text">
              © {new Date().getFullYear()} Rithuparna AC. All rights reserved. Made with React.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
