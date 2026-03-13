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
      }
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
                기본에 충실한 마크업과
              </span>
              <br />
              <span className="reveal-line" style={{ transitionDelay: "0.08s" }}>
                깔끔한 구조를 중요하게 생각하는
              </span>
              <br />
              <span className="reveal-line" style={{ transitionDelay: "0.16s" }}>
                Web Publisher입니다.
              </span>
            </h3>

            <p className="profile-desc">
              <span className="reveal-line" style={{ transitionDelay: "0.24s" }}>
                작은 디테일까지 고민하며
              </span>
              <br />
              <span className="reveal-line" style={{ transitionDelay: "0.32s" }}>
                지속적으로 성장하고 있습니다.
              </span>
            </p>
          </div>

          <Link to="/about">
            <button
              className="profile-button reveal-line"
              type="button"
              style={{ transitionDelay: "0.4s" }}
            >
              <span className="profile-button-text">About me</span>
              <span className="profile-button-arrow">→</span>
            </button>
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
              <img
                src="./img/home/profile-image1.jpg"
                alt="프로필사진1"
              />
            </div>
          </Link>

          <Link to="/about">
            <div
              className="profile-photo profile-photo-sub"
              onMouseEnter={show}
              onMouseLeave={hide}
              onMouseMove={move}
            >
              <img
                src="./img/home/profile-image2.jpg"
                alt="프로필사진2"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;