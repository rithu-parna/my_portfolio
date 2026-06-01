import PropTypes from 'prop-types';
import { Sun, Moon, X, Menu } from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  isScrolled
}) {
  return (
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
  );
}

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool.isRequired
};
