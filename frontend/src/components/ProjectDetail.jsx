import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import projectsData from '../data/projects';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-detail-page">
        <Navbar />
        <div className="not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn btn-primary">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <Navbar />
      <div className="project-detail-container">
        <Link to="/projects" className="back-link">
          ← Back to Projects
        </Link>
        
        <div className="project-header">
          <h1>{project.title}</h1>
          <div className="project-header-meta">
            <span className="project-category-badge">{project.category}</span>
            <span className={`project-status-badge ${project.status}`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="project-content">
          <div className="project-main-image">
            {project.featuredImageUrl ? (
              <img 
                src={project.featuredImageUrl} 
                alt={project.title}
                onError={(e) => {
                  e.target.src = project.thumbnailUrl || `https://via.placeholder.com/800x500/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                }}
              />
            ) : (
              <div className="project-image-placeholder large">
                {project.title.charAt(0)}
              </div>
            )}
          </div>

          <div className="project-details">
            <div className="project-section">
              <h2>About This Project</h2>
              <p className="project-description">{project.description}</p>
            </div>

            <div className="project-section">
              <h2>Technologies Used</h2>
              <div className="technologies-grid">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-meta-info">
              {project.startDate && (
                <div className="meta-item">
                  <strong>Start Date:</strong>
                  <span>{new Date(project.startDate).toLocaleDateString()}</span>
                </div>
              )}
              {project.completionDate && (
                <div className="meta-item">
                  <strong>Completion Date:</strong>
                  <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="project-links">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-btn github"
                >
                  View on GitHub →
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link-btn live"
                >
                  View Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
