import React from "react";
import "./ProjectHero.css";
import ScrollIndicator from "../../../Components/ScrollIndicator";

const ProjectsHero = () => {
  return (
    <section className="projects-hero">
      <div className="projects-hero-inner">
        <p className="projects-hero-kicker">Projects</p>
        <h1 className="projects-hero-title">Selected Works</h1>
        <p className="projects-hero-desc">
          디자인, 퍼블리싱, 인터랙션을 담아낸 작업물입니다.
          <br />
          사용자 경험과 완성도를 함께 고민하며 구현했습니다.
        </p>
      </div>

      <ScrollIndicator/>
    </section>
  );
};

export default ProjectsHero;
