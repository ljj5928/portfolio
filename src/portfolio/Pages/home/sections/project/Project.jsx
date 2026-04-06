import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Project.css";

const Project = () => {
  const cursorRef = useRef(null);
  const galleryRef = useRef(null);
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [stackState, setStackState] = useState("before-enter");

  const show = () => cursorRef.current?.classList.add("show");

  const hide = () => {
    cursorRef.current?.classList.remove("show");
  };

  const move = (e) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const rect = gallery.getBoundingClientRect();

    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current;
      if (!cursor) {
        frameRef.current = null;
        return;
      }

      const { x, y } = mouseRef.current;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      frameRef.current = null;
    });
  };

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll(
      ".reveal-line, .reveal-button",
    );
    if (!targets?.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStackState(entry.isIntersecting ? "visible" : "leaving-up");
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="project" ref={sectionRef}>
      <div className="project-container">
        <div className="project-content">
          <h2 className="project-title reveal-line">Project</h2>

          <div className="project-text">
            <h3 className="project-headline">
              <span className="reveal-line" style={{ transitionDelay: "0s" }}>
                HTML, CSS, JS 기반 퍼블리싱과
              </span>
              <br />
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.08s" }}
              >
                React를 활용한 상태 관리와
              </span>
              <br />
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.16s" }}
              >
                API 연동을 통해
              </span>
              <br />
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.24s" }}
              >
                프로젝트를 제작했습니다.
              </span>
            </h3>

            <p className="project-desc">
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.24s" }}
              >
                반응형 구조와 시맨틱 마크업을 구현하고,
              </span>
              <br />
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.32s" }}
              >
                인터랙션 구현 경험을 쌓았습니다.
              </span>
            </p>
          </div>

          <Link to="/projects" className="project-button reveal-button">
            <span className="project-button-text">View Projects</span>
            <span className="project-button-arrow">→</span>
          </Link>
        </div>

        <Link to="/projects">
          <div
            className={`project-gallery ${stackState}`}
            ref={galleryRef}
            onMouseEnter={show}
            onMouseLeave={hide}
            onMouseMove={move}
          >
            <div className="cursor-follower" ref={cursorRef} aria-hidden="true">
              →
            </div>

            <div className="card-stack" aria-hidden="true">
              <div
                className="stack-card back"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}img/home/home-project-card3.png)`,
                }}
              >
                <div className="card-overlay"></div>
                <div className="card-info">
                  <h4>날씨 앱</h4>
                  <p>React / Redux / API</p>
                </div>
              </div>

              <div
                className="stack-card mid"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}img/home/home-project-card2.png)`,
                }}
              >
                <div className="card-overlay"></div>
                <div className="card-info">
                  <h4>ABL Bio 클론코딩</h4>
                  <p>HTML / CSS / JS</p>
                </div>
              </div>

              <div
                className="stack-card top"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}img/home/home-project-card1.png)`,
                }}
              >
                <div className="card-overlay"></div>

                <div className="card-info">
                  <h4>동원그룹 클론코딩</h4>
                  <p>React / GSAP / Three.js</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Project;
