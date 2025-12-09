import React from 'react';
import Navbar from './Navbar';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <div className="about-header">
          <h1>About Me</h1>
          <p className="about-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Hello! 👋</h2>
            <p>
              I'm a passionate developer who loves creating beautiful and functional web applications.
              I enjoy working with modern technologies and I am always eager to learn new things.
            </p>
            <p>
              My goal is to build projects that not only look great but also provide excellent user
              experiences or help me in my life. I believe in writing clean, maintainable code and following best practices.
            </p>
          </div>

          <div className="about-section">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React</li>
                  <li>JavaScript</li>
                  <li>HTML/CSS</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>RESTful APIs</li>
                  <li>Database Design</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools</h3>
                <ul>
                  <li>Git</li>
                  <li>VS Code</li>
                  <li>npm/yarn</li>
                  <li>Webpack/Vite</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Get In Touch</h2>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong>
                <span>misa.karapandzic@gmail.com</span>
              </div>
              <div className="contact-item">
                <strong>GitHub:</strong>
                <a href="https://github.com/Rotman11050" target="_blank" rel="noopener noreferrer">
                  github.com/rotman11050
                </a>
              </div>
              <div className="contact-item">
                <strong>LinkedIn:</strong>
                <a href="https://www.linkedin.com/in/milo%C5%A1-karapand%C5%BEi%C4%87-14b343333/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/miloskarapandzic
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

