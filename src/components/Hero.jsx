import { useState } from 'react';
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
              I&apos;m a <span className="gradient-text">{typingRole}</span>
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
                      &nbsp;&nbsp;name: <span className="code-string">&quot;Rithuparna AC&quot;</span>,<br />
                      &nbsp;&nbsp;role: <span className="code-string">&quot;Product Engineer&quot;</span>,<br />
                      &nbsp;&nbsp;philosophy: <span className="code-string">&quot;Scalable architectures &amp; API Integration&quot;</span>,<br />
                      &nbsp;&nbsp;coreStack: [<span className="code-string">&quot;React.js&quot;</span>, <span className="code-string">&quot;Redux&quot;</span>, <span className="code-string">&quot;JavaScript&quot;</span>],<br />
                      &nbsp;&nbsp;location: <span className="code-string">&quot;Kozhikode, Kerala, India&quot;</span>,<br />
                      &nbsp;&nbsp;experience: <span className="code-string">&quot;3+ Years&quot;</span><br />
                      &#125;;<br /><br />
                      <span className="code-comment">{"// Transforming complex requirements into UI"}</span><br />
                      <span className="code-keyword">function</span> <span className="code-function">init</span>() &#123;<br />
                      &nbsp;&nbsp;console.log(<span className="code-string">&quot;Developing scalable supply chain modules...&quot;</span>);<br />
                      &#125;<br />
                      <span className="code-function">init</span>();
                    </code>
                  </pre>
                ) : (
                  <pre className="terminal-code">
                    <code>
                      &#123;<br />
                      &nbsp;&nbsp;<span className="code-variable">&quot;technologies&quot;</span>: &#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">&quot;frontend&quot;</span>: [<span className="code-string">&quot;React.js&quot;</span>, <span className="code-string">&quot;Redux&quot;</span>, <span className="code-string">&quot;Bootstrap&quot;</span>, <span className="code-string">&quot;MUI&quot;</span>],<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">&quot;backend&quot;</span>: [<span className="code-string">&quot;Python&quot;</span>, <span className="code-string">&quot;Django&quot;</span>, <span className="code-string">&quot;MySQL&quot;</span>, <span className="code-string">&quot;Node.js&quot;</span>],<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-variable">&quot;tools&quot;</span>: [<span className="code-string">&quot;Git&quot;</span>, <span className="code-string">&quot;GitHub&quot;</span>, <span className="code-string">&quot;Postman&quot;</span>, <span className="code-string">&quot;npm&quot;</span>]<br />
                      &nbsp;&nbsp;&#125;,<br />
                      &nbsp;&nbsp;<span className="code-variable">&quot;attributes&quot;</span>: [<span className="code-string">&quot;Collaborative&quot;</span>, <span className="code-string">&quot;Responsive&quot;</span>, <span className="code-string">&quot;Analytical&quot;</span>]<br />
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
