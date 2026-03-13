import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

const projects = [
  {
    id: 1,
    title: "동원 클론코딩",
    subtitle: "React 기반 기업 홈페이지 클론 프로젝트",
    desc: "실제 사이트의 구조를 분석하고 컴포넌트 단위로 분리하여 반응형 UI와 정보 구조를 구현한 프로젝트입니다.",
    stack: ["React","GSAP","CSS"],
    features: [
      "시맨틱 마크업 기반 구조 설계",
      "컴포넌트 단위 UI 분리",
      "반응형 레이아웃 구현",
    ],
    image: "./img/home/home-project-card1.png",
    live: "#",
    github: "https://github.com/ljj5928/CloneDongwon",
  },
  {
    id: 2,
    title: "Weather App",
    subtitle: "실시간 날씨 정보를 제공하는 웹 애플리케이션",
    desc: "외부 API를 활용해 현재 날씨와 도시 검색 기능을 구현하고, 정보 전달이 직관적인 UI로 구성한 프로젝트입니다.",
    stack: ["React", "Redux", "API"],
    features: ["실시간 데이터 연동", "도시 검색 기능", "간결한 정보 중심 UI"],
    image: "./img/home/home-project-card3.png",
    live: "https://ljj5928.github.io/WeatherApp/",
    github: "https://github.com/ljj5928/WeatherApp",
  },
  {
    id: 3,
    title: "ABLbio 클론코딩",
    subtitle: "기업 사이트 구조 분석 중심 퍼블리싱 프로젝트",
    desc: "HTML, CSS, JavaScript를 활용해 정적인 레이아웃과 인터랙션을 구현하고 원본 디자인을 재현한 프로젝트입니다.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: [
      "디자인 재현 중심 퍼블리싱",
      "반응형 구조 설계",
      "시맨틱 마크업 기반 HTML 구조 작성",
    ],
    image: "./img/home/home-project-card2.png",
    live: "https://ljj5928.github.io/ablbio/",
    github: "https://github.com/ljj5928/ablbio",
  },
];

const ProjectList = () => {
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((prev) => {
          const next = { ...prev };

          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.index);
            next[index] = entry.isIntersecting;
          });

          return next;
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const currentRefs = cardRefs.current;

    currentRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className="project-list">
      <div className="project-list-bg-grid"></div>
      <div className="project-list-bg-glow project-list-bg-glow1"></div>
      <div className="project-list-bg-glow project-list-bg-glow2"></div>

      <div className="project-list-inner">
        <div className="project-list-deco project-list-orbit1"></div>
        <div className="project-list-deco project-list-orbit2"></div>

        <div className="project-list-deco project-list-deco-line1"></div>
        <div className="project-list-deco project-list-deco-line2"></div>

        <div className="project-list-wrap">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
            >
              <ProjectCard
                project={project}
                reverse={index % 2 === 1}
                number={String(project.id).padStart(2, "0")}
                visible={!!visibleCards[index]}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;