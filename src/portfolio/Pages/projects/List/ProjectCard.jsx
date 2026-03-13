import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project, reverse, number, visible, index }) => {
  return (
    <article
      className={`project-card ${reverse ? "reverse" : ""} ${
        visible ? "show" : ""
      } ${index % 2 === 0 ? "from-left" : "from-right"}`}
    >
      <div className="project-card-media">
        <div className="project-card-image-box">
          <img
            src={project.image}
            alt={project.title}
            className="project-card-image"
          />
        </div>
      </div>

      <div className="project-card-content">
        <span className="project-card-number">{number}</span>
        <p className="project-card-subtitle">{project.subtitle}</p>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.desc}</p>

        <div className="project-card-meta">
          <div className="project-card-block">
            <span className="project-card-label">Stack</span>
            <ul className="project-card-inline-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-card-block">
            <span className="project-card-label">Feature</span>
            <ul className="project-card-feature-list">
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-card-links">
          <a href={project.live} target="_blank" rel="noreferrer">
            Live Site
          </a>
          <a href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;