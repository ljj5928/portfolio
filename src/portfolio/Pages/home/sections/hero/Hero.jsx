import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";

const Hero = ({ introEnd }) => {
  const heroRef = useRef(null);
  const timersRef = useRef([]);
  const finishedRef = useRef(false);
  const [showScroll, setShowScroll] = useState(false);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const completeIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    clearAllTimers();
    introEnd?.();
    setShowScroll(true);
  }, [introEnd]);

  const finishIntro = useCallback(() => {
    const hero = heroRef.current;
    if (!hero || finishedRef.current) return;

    clearAllTimers();

    hero.classList.add("open", "expand", "derivation", "align");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        completeIntro();
      });
    });
  }, [completeIntro]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    finishedRef.current = false;
    hero.classList.remove("open", "expand", "derivation", "align");
    setShowScroll(false);

    timersRef.current = [
      setTimeout(() => hero.classList.add("open"), 300),
      setTimeout(() => hero.classList.add("expand"), 1200),
      setTimeout(() => hero.classList.add("derivation"), 1800),
      setTimeout(() => hero.classList.add("align"), 3100),
      setTimeout(() => {
        completeIntro();
      }, 4300),
    ];

    window.addEventListener("wheel", finishIntro, {
      passive: true,
    });
    window.addEventListener("touchstart", finishIntro, {
      passive: true,
    });

    return () => {
      clearAllTimers();
      window.removeEventListener("wheel", finishIntro);
      window.removeEventListener("touchstart", finishIntro);
    };
  }, [finishIntro, completeIntro]);

  const handleSkipIntro = () => {
    finishIntro();

    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-expand-bg" aria-hidden="true"></div>

      <div className="hero-window" aria-hidden="true">
        <h2 className="hero-title">WEB PUBLISHER</h2>
      </div>

      <p className="hero-keyword detail">Detail-oriented</p>
      <p className="hero-keyword inter">Interactive</p>
      <p className="hero-keyword sem">Semantic</p>
      <p className="hero-keyword grow">Growth</p>

      <div className="hero-intro">
        <p>웹퍼블리셔</p>
        <p>이재진</p>
        <p>포트폴리오</p>
      </div>

      <button
        type="button"
        className={`hero-scroll-indicator ${showScroll ? "show" : ""}`}
        onClick={handleSkipIntro}
        aria-label="다음 섹션으로 이동"
      >
        <span></span>
      </button>
    </section>
  );
};

export default Hero;