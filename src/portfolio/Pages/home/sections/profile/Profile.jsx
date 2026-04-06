import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const cursorRef = useRef(null);
  const galleryRef = useRef(null);
  const sectionRef = useRef(null);

  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    const targets = sectionRef.current?.querySelectorAll(".reveal-line");
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
        threshold: 0.35,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="profile" id="profile" ref={sectionRef}>
      <div className="profile-container">
        <div className="profile-content">
          <h2 className="profile-title reveal-line">Profile</h2>

          <div className="profile-text">
            <h3 className="profile-headline">
              <span className="reveal-line" style={{ transitionDelay: "0s" }}>
                React 기반 인터랙션 구현에 강점을 가진
              </span>
              <br />
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.08s" }}
              >
               웹 퍼블리셔 이재진입니다.
              </span>
            </h3>

            <p className="profile-desc">
              <span
                className="reveal-line"
                style={{ transitionDelay: "0.24s" }}
              >
                반응형 구조와 자연스러운 애니메이션을 통해
              </span>
              <br />
              <span   
                className="reveal-line"
                style={{ transitionDelay: "0.32s" }}
              >
                사용자 흐름을 고려한 UI를 구현합니다.
              </span>
            </p>
          </div>

          <Link to="/about" className="profile-button reveal-line">
            <span className="profile-button-text">More About Me</span>
            <span className="profile-button-arrow">→</span>
          </Link>
        </div>

        <div className="profile-gallery" ref={galleryRef}>
          <div className="cursor-follower" ref={cursorRef} aria-hidden="true">
            →
          </div>

          <Link to="/about">
            <div
              className="profile-photo profile-photo-main"
              onMouseEnter={show}
              onMouseLeave={hide}
              onMouseMove={move}
            >
              <img src="./img/home/profile-image2.jpg" alt="프로필사진1" />
            </div>
          </Link>

          <Link to="/about">
            <div className="profile-skills">
              <h4 className="skills-title">Skills</h4>

              <ul className="skills-list">
                <li>
                  <strong>React</strong>
                  <span>컴포넌트 구조 설계 / 상태 기반 UI 구현</span>
                </li>

                <li>
                  <strong>HTML / CSS / Responsive</strong>
                  <span>구조적인 마크업과 반응형 구현</span>
                </li>

                <li>
                  <strong>Sass / Git / Figma</strong>
                  <span>스타일 관리와 협업 도구 활용</span>
                </li>

                <li>
                  <strong>Ai / Vibe Coding</strong>
                  <span>아이디어 정리와 작업 보조</span>
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
