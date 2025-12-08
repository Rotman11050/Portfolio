import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import projectsData from '../data/projects';
import './Projects.css';

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(projectsData.map(project => project.category))];

  // Filter projects
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);

  return (
    <div className="projects-page">
      <Navbar />
      <div className="projects-container">
        <div className="projects-header">
          <h1>My Projects</h1>
          <p>Here are some of the projects I've worked on</p>
        </div>

        {/* Search and Filter */}
        <div className="projects-controls">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && searchTerm === '' && selectedCategory === 'All' && (
          <div className="featured-section">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid featured">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className="all-projects-section">
          {searchTerm !== '' || selectedCategory !== 'All' || featuredProjects.length === 0 ? (
            <h2 className="section-title">All Projects</h2>
          ) : (
            <h2 className="section-title">More Projects</h2>
          )}
          
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <Link to={`/projects/${project.id}`} className={`project-card ${featured ? 'featured' : ''}`}>
      <div className="project-image">
        {project.thumbnailUrl ? (
          <img 
            src={project.thumbnailUrl}
            alt={project.title}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x250/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
            }}
          />
        ) : (
          <div className="project-image-placeholder">
            {project.title.charAt(0)}
          </div>
        )}
        {project.featured && (
          <span className="featured-badge">⭐ Featured</span>
        )}
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="project-short-desc">{project.shortDescription}</p>
        <div className="project-technologies">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-tag">+{project.technologies.length - 4}</span>
          )}
        </div>
        <div className="project-footer">
          <span className="project-category">{project.category}</span>
          <span className={`project-status ${project.status}`}>{project.status}</span>
        </div>
      </div>
    </Link>
  );
}

export default Projects;
