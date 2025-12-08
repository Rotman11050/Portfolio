import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <div className="bg-ambient" />
      <div className="bg-circle" />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight shine">Miloš Karapandžić</span>
          </h1>
          <p className="hero-subtitle">
            I’m a Creative Computing student, combining design, technology, human-centered thinking, and creative problem-solving to build meaningful digital experiences.          </p>
          <p className="hero-description">
            Welcome to my portfolio! Here you can explore my projects, see what I've been working on,
            and get in touch if you'd like to collaborate.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View My Projects
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-circle">
            <div className="floating-glow" />
            <div className="floating-core" />
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Web Development</h3>
              <p>Building modern, responsive web applications with React and Node.js</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Apps</h3>
              <p>Creating cross-platform mobile applications for Android</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI & Machine Learning</h3>
              <p>Exploring and integrating AI-powered features into digital products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
