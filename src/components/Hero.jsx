import React, { useState } from 'react';
import { Terminal, ArrowUpRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

export default function Hero() {
  const [activeTerminalTab, setActiveTerminalTab] = useState('about.js');

  const roles = ["Product Engineer", "React.js Developer", "Frontend Developer", "API Integration Specialist"];
  const typingRole = useTypewriter(roles);

  return (
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
  );
}
