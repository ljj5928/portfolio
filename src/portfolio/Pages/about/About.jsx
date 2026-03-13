import React from "react";
import Overview from "./sections/overview/Overview";
import Strength from "./sections/strength/Strength";
import Skill from "./sections/skill/Skill";
import "./About.css";
import Tools from "./sections/tool/Tools";

const About = () => {
  return (
    <div className="about">
      <div
        className="about-orbit"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/about/about-bg.png)`,
        }}
      ></div>
      <Overview />
      <Strength />
      <Skill />
      <Tools />
    </div>
  );
};

export default About;
