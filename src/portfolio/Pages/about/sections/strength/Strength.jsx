import React, { useEffect, useRef } from "react";
import "./Strength.css";

const Strength = () => {
  const sectionRef = useRef(null);

  const coreStrength = [
    {
      id: 1,
      title: "Interactive",
      desc: [
        "사용자 경험을 향상시키는",
        "역동적이고 몰입감 있는",
        "UI 인터랙션을 구현합니다.",
      ],
      img: "./img/about/about-strength-icon1.png",
    },
    {
      id: 2,
      title: "Growth",
      desc: [
        "지속적인 학습과 개선을 통해",
        "더 나은 사용자 경험과",
        "새로운 해결 방법을 고민합니다.",
      ],
      img: "./img/about/about-strength-icon2.png",
    },
    {
      id: 3,
      title: "Semantic",
      desc: [
        "의미 있는 HTML 구조를 작성하여",
        "접근성과 SEO를 고려한",
        "웹 구조를 구현합니다.",
      ],
      img: "./img/about/about-strength-icon3.png",
    },
    {
      id: 4,
      title: "Detail-oriented",
      desc: [
        "픽셀 단위까지 세심하게 확인하며",
        "완성도 높은 디자인과",
        "퍼포먼스를 구현합니다.",
      ],
      img: "./img/about/about-strength-icon4.png",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
        }
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="strength" ref={sectionRef}>
      <div className="strength-inner">
        <div className="strength-head">
          <p className="strength-kicker">CORE VALUE</p>
          <h2 className="strength-title">Strength</h2>
          <p className="strength-sub">
            인터랙션, 구조적인 마크업, 세밀한 디테일까지
            <br />
            사용자 경험을 중심으로 완성도 높은 웹 UI를 구현합니다.
          </p>
        </div>

        <div className="strength-grid">
          {coreStrength.map((strength) => (
            <div className="strength-card" key={strength.id}>
              <figure className="strength-icon">
                <img src={strength.img} alt={strength.title} />
              </figure>
              <h3>{strength.title}</h3>
              <p>
                {strength.desc.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strength;
