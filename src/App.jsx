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
  ChevronRight,
  Copy
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
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Refs for Scroll Spy and Skills trigger
  const skillsRef = useRef(null);

  // Cycle list for Typing Title
  const roles = ["Product Engineer", "React.js Developer", "Frontend Developer", "API Integration Specialist"];
  const typingRole = useTypewriter(roles);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => revealObserver.observe(el));

    return () => {
      elements.forEach((el) => revealObserver.unobserve(el));
    };
  }, [showAllProjects]);

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
      image: "/savitha.png",
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
      image: "/torus.png",
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
      image: "/thillakkam.png",
      liveUrl: "https://thillakkamfancy.in/",
      githubUrl: "https://github.com/rithu-parna"
    },
    {
      id: 4,
      title: "Book Store",
      category: "fullstack",
      tag: "Online Book Shop",
      desc: "A feature-rich web app to browse, search, and purchase books with a streamlined cart system and user-friendly interface.",
      details: "Book Store is a complete bookshop web application that allows users to explore a curated library of books, search by title or author, add items to a cart, and proceed through a smooth checkout experience. Built with React.js and modern UI patterns for a seamless reading-commerce experience.",
      tech: ["React.js", "JavaScript (ES6+)", "CSS3", "REST API"],
      themeColor: "#f59e0b",
      image: "/bookstore.png",
      liveUrl: "https://github.com/rithu-parna/Book_Store",
      githubUrl: "https://github.com/rithu-parna/Book_Store"
    },
    {
      id: 5,
      title: "Home Stay",
      category: "fullstack",
      tag: "Booking Platform",
      desc: "A modern web app for booking comfortable homestays with easy browsing, advanced search, and seamless reservation features.",
      details: "Home Stay is a full-featured accommodation booking platform. Users can discover and book comfortable homestays with detailed property listings, an advanced search and filter system, image galleries, and a complete reservation flow. Designed with mobile-first responsiveness and an inviting visual aesthetic.",
      tech: ["React.js", "Node.js", "CSS3", "REST API"],
      themeColor: "#10b981",
      image: "/homestay.png",
      liveUrl: "https://github.com/rithu-parna/home_stay_web_app",
      githubUrl: "https://github.com/rithu-parna/home_stay_web_app"
    },
    {
      id: 6,
      title: "Nexus Mall",
      category: "fullstack",
      tag: "Multi-Vendor Marketplace",
      desc: "A multi-vendor shopping platform where users can buy and sell products with secure payments, order tracking, and vendor management.",
      details: "Nexus Mall is a comprehensive multi-vendor e-commerce marketplace. It empowers sellers to manage their storefronts while providing buyers with a unified shopping experience. Features include secure payment integration, real-time order tracking, vendor dashboards, product reviews, and inventory management.",
      tech: ["React.js", "Redux", "Node.js", "Payment Gateway"],
      themeColor: "#8b5cf6",
      image: "/nexus.png",
      liveUrl: "https://github.com/rithu-parna",
      githubUrl: "https://github.com/rithu-parna"
    },
    {
      id: 7,
      title: "Blood Donor App",
      category: "apps",
      tag: "Community Health App",
      desc: "A life-saving application connecting blood donors with people in need, with search by blood group and location.",
      details: "Blood Donor App is a community-driven application designed to bridge the gap between blood donors and recipients during emergencies. Users can register as donors, search for nearby donors by blood group and location, send urgent requests, and manage donation history. Built for speed and accessibility when every second counts.",
      tech: ["React.js", "JavaScript", "Geolocation API", "CSS3"],
      themeColor: "#ef4444",
      image: "/blood.png",
      liveUrl: "https://github.com/rithu-parna/Blood_Donar_App",
      githubUrl: "https://github.com/rithu-parna/Blood_Donar_App"
    },
    {
      id: 8,
      title: "Chat App",
      category: "apps",
      tag: "Real-Time Messaging",
      desc: "A real-time chat application for instant communication with private and group chats, built for fast and secure messaging.",
      details: "Chat App is a modern real-time messaging platform enabling users to communicate instantly through private and group conversations. Features include real-time message delivery, typing indicators, online status, media sharing, and message history. Built with WebSocket technology for lightning-fast, secure communication.",
      tech: ["React.js", "Socket.io", "Node.js", "Express"],
      themeColor: "#3b82f6",
      image: "/chat.png",
      liveUrl: "https://github.com/rithu-parna",
      githubUrl: "https://github.com/rithu-parna"
    },
    {
      id: 9,
      title: "Weather App",
      category: "apps",
      tag: "Weather Dashboard",
      desc: "A sleek application showing real-time weather updates, temperature, and conditions for any location using live APIs.",
      details: "Weather App delivers real-time meteorological data with an elegant, intuitive interface. Users can search any city worldwide to view current temperature, humidity, wind speed, weather conditions, and multi-day forecasts. Powered by live weather data APIs with beautiful dynamic backgrounds that reflect current conditions.",
      tech: ["React.js", "Weather API", "JavaScript", "CSS3"],
      themeColor: "#06b6d4",
      image: "/weather.png",
      liveUrl: "https://github.com/rithu-parna/Weather_App",
      githubUrl: "https://github.com/rithu-parna/Weather_App"
    },
    {
      id: 10,
      title: "E-Commerce App",
      category: "fullstack",
      tag: "Shopping Platform",
      desc: "A full-featured online shopping application with product browsing, cart management, and smooth order placement experience.",
      details: "E-Commerce App is a comprehensive online retail solution that provides users with a seamless shopping journey. Features include intelligent product categorization, advanced search and filtering, a dynamic shopping cart, wishlist functionality, order management, and a streamlined checkout process. Built with performance and user engagement in mind.",
      tech: ["React.js", "Redux", "REST API", "CSS3"],
      themeColor: "#f97316",
      image: "/ecommerce.png",
      liveUrl: "https://github.com/rithu-parna",
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
              <div className="hero-tagline animate-on-load duration-800">
                <span className="badge">Available for Work</span>
              </div>
              <h1 className="hero-title animate-on-load duration-800 delay-100">
                Crafting Digital <br />
                <span className="gradient-text">Experiences</span>
              </h1>
              <div className="hero-subtitle animate-on-load duration-800 delay-200">
                I'm a <span className="gradient-text">{typingRole}</span>
                <span className="cursor">|</span>
              </div>
              <p className="hero-desc animate-on-load duration-800 delay-300">
                Product Engineer with 3+ years of experience building responsive, scalable web applications using React.js, Redux, and JavaScript. Experienced in developing enterprise supply chain modules, logistics panels, and commercial e-commerce storefronts.
              </p>
              <div className="hero-buttons animate-on-load duration-800 delay-400">
                <a href="#projects" className="btn btn-primary">
                  View Projects <ArrowUpRight size={16} />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
              </div>
            </div>

            <div className="hero-visual animate-perspective duration-1000 delay-500">
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
                        &nbsp;&nbsp;location: <span className="code-string">"Kozhikode, Kerala, India"</span>,<br />
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
          <div className="stats-grid reveal-on-scroll reveal-stagger">
            <div className="stat-card reveal-flip">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-card reveal-flip">
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card reveal-flip">
              <div className="stat-number">1k+</div>
              <div className="stat-label">GitHub Contributions</div>
            </div>
            <div className="stat-card reveal-flip">
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
            <div className="about-left reveal-on-scroll reveal-slide-left">
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                I am a Product Engineer and Frontend Developer with a strong passion for building responsive, scalable web applications using React.js, Redux, and modern state management. With 3 years of hands-on experience, I focus on integrating RESTful APIs and optimizing cross-device performance.
              </p>
              <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                I believe in creating highly functional and accessible frontend interfaces. The details matter—from modular component reuse and clean code architectures down to state flows and responsive user journeys that make an application feel smooth and intuitive.
              </p>
              
              <div className="about-features reveal-on-scroll reveal-stagger">
                <div className="feature-card reveal-scale-in">
                  <div className="feature-icon"><Layers size={24} /></div>
                  <h4 className="feature-title">Modular Structure</h4>
                  <p className="feature-desc">Building dry, highly reusable component abstractions.</p>
                </div>
                <div className="feature-card reveal-scale-in">
                  <div className="feature-icon"><Sparkles size={24} /></div>
                  <h4 className="feature-title">REST & API Flow</h4>
                  <p className="feature-desc">Integrating high-performance asynchronous data endpoints.</p>
                </div>
              </div>
            </div>

            <div className="about-right reveal-on-scroll reveal-slide-right">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="logo-dot" style={{ background: 'var(--accent-primary)' }}></span> History & Education
              </h3>
              
              <div className="timeline">
                <div className="timeline-item reveal-on-scroll">
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

                <div className="timeline-item reveal-on-scroll">
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

                <div className="timeline-item reveal-on-scroll">
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

          <div className="skills-grid reveal-on-scroll reveal-fade-in reveal-stagger">
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
          </ul>

          <div className="projects-grid reveal-on-scroll reveal-stagger">
            {(showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)).map((project) => (
              <div 
                className="project-card glass-card premium-card reveal-project-card" 
                key={project.id}
                onClick={() => setSelectedProject(project)}
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
              </div>
            ))}
          </div>

          {/* View More Button */}
          {filteredProjects.length > 3 && (
            <div className="view-more-container">
              <button 
                className="btn btn-primary view-more-btn"
                onClick={() => {
                  setShowAllProjects(!showAllProjects);
                  if (showAllProjects) {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {showAllProjects ? 'Show Less Projects' : 'View All Projects'}
              </button>
            </div>
          )}
        </div>
      </section>

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

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Collaborate</span>
            <h2 className="section-title">Let's Build Something Great</h2>
            <p className="section-desc">
              Have a complex frontend problem, require premium React development, or want to discuss full-time roles? Reach out today.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left Column: Interactive Contact Dashboard */}
            <div className="contact-info-panel reveal-on-scroll reveal-slide-left">
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
            </div>

            {/* Right Column: Premium Contact Form */}
            <div className="contact-form-panel glass-card reveal-on-scroll reveal-slide-right">
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
