import React, { useEffect, useRef, useState } from "react";
import "./Overview.css";
import ScrollIndicator from "../../../../Components/ScrollIndicator";

const Overview = () => {
  const sectionRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShow(true);
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`overview ${isShow ? "show" : ""}`}
    >
      <div className="overview-bg-words">OVERVIEW</div>

      <div className="overview-container">
        <div className="overview-text">
          <span className="overview-eyebrow">ABOUT ME</span>

          <h2 className="overview-title">
            디테일과 구조를 중심으로
            <br />
            완성도 높은 웹을 만듭니다.
          </h2>

          <p className="overview-desc">
            사용자 경험을 중심으로 <br className="mobile-br" />
            구조적이고 의미 있는 마크업을 <br />
            구현하는 웹 퍼블리셔 이재진입니다.
          </p>

          <p className="overview-purpose">
            HTML, CSS, JavaScript, React를 기반으로
            <br />
            인터랙티브하고 반응형 웹을 구현하며,
            <br />
            작은 디테일까지 놓치지 않는 UI를 <br className="mobile-br" />
            만드는 것을 목표로 합니다.
          </p>
        </div>

        <div className="overview-visual">
          <div className="overview-photo-frame">
            <div className="overview-photo"></div>
          </div>
        </div>
      </div>
      <ScrollIndicator/>
    </section>
  );
};

export default Overview;