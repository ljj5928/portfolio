import React, { useEffect, useRef, useState } from "react";
import "./Skill.css";

const Skill = () => {
  const [showOrbit, setShowOrbit] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    {
      id: 1,
      name: "React",
      desc: "컴포넌트 기반 UI 구현",
      img: "./img/about/about-skill-icon1.png",
      level: 0.65,
    },
    {
      id: 2,
      name: "HTML",
      desc: "의미 있는 구조 설계",
      img: "./img/about/about-skill-icon2.png",
      level: 0.85,
    },
    {
      id: 3,
      name: "CSS",
      desc: "반응형 · 디테일 스타일링",
      img: "./img/about/about-skill-icon3.png",
      level: 0.8,
    },
    {
      id: 4,
      name: "JavaScript",
      desc: "동적인 인터랙션 구현",
      img: "./img/about/about-skill-icon4.png",
      level: 0.65,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setShowOrbit(true);
          obs.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skill" ref={sectionRef}>
      <div className="skill-bg-glow skill-bg-glow1"></div>
      <div className="skill-bg-glow skill-bg-glow2"></div>

      <div className="skill-inner">
        <div className="skill-head">
          <p className="skill-kicker">CAPABILITIES</p>
          <h2 className="skill-title">Skills</h2>
          <p className="skill-sub">
            구조적인 마크업, 섬세한 스타일링, <br className="mobile-br" />
            인터랙션 구현까지
            <br className="pc-br" />
            사용자 경험을 완성하는 <br className="mobile-br" />
            퍼블리싱•프론트엔드 기술 역량입니다.
          </p>
        </div>

        <div className="skill-grid">
          {skills.map((skill, index) => {
            const angle = 90 + skill.level * 180;

            return (
              <div
                className={`skill-card ${showOrbit ? "show-orbit" : ""}`}
                key={skill.id}
                style={{
                  "--target-angle": `${angle}deg`,
                  "--target-progress": `${skill.level * 50}`,
                  "--orbit-delay": `${index * 0.12}s`,
                }}
              >
                <div className="skill-orbit">
                  <svg
                    className="skill-track"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle
                      className="skill-track-line"
                      cx="50"
                      cy="50"
                      r="49"
                      pathLength="100"
                    />
                  </svg>

                  <span className="orbit-label orbit-label-0">0</span>
                  <span className="orbit-label orbit-label-center">
                    CONFIDENCE
                  </span>
                  <span className="orbit-label orbit-label-100">100</span>

                  <span className="orbit-dot" />
                  <span className="orbit-value">
                    {Math.round(skill.level * 100)}%
                  </span>
                </div>

                <figure className="skill-img">
                  <img src={skill.img} alt={skill.name} />
                </figure>

                <div className="skill-text">
                  <h3>{skill.name}</h3>
                  <p>{skill.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skill;
