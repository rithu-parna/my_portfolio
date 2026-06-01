import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Cpu } from 'lucide-react';

export default function Skills() {
  const [skillsActive, setSkillsActive] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setSkillsActive(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
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

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

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
    <section
      id="skills"
      className="section"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--card-border)',
        borderBottom: '1px solid var(--card-border)'
      }}
      ref={skillsRef}
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="section-subtitle">Capabilities</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-desc">
            My engineering stack is curated to deliver robust architectures combined with elegant animations.
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              className="skills-category glass-card"
              key={index}
              variants={staggerItem}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
