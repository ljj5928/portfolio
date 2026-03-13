import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/home/Home";
import About from "./Pages/about/About";
import Projects from "./Pages/projects/Projects";
import ScrollToTop from "./Components/ScrollToTop";
import "./App.css";

const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation();

  const appRef = useRef(null);
  const [particles, setParticles] = useState([]);

  const lastParticleTime = useRef(0);
  const removeTimers = useRef([]);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      removeTimers.current.forEach(clearTimeout);
      removeTimers.current = [];
    };
  }, []);

  const handleMouseMove = (e) => {
    const now = Date.now();

    if (now - lastParticleTime.current < 70) return;
    lastParticleTime.current = now;

    const id = now + Math.random();

    const newParticle = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 6 + 4,
      dx: (Math.random() - 0.5) * 80,
      dy: Math.random() * -60 - 20,
      duration: Math.random() * 1 + 1.4,
    };

    setParticles((prev) => [...prev.slice(-8), newParticle]);

    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
      removeTimers.current = removeTimers.current.filter((t) => t !== timer);
    }, newParticle.duration * 1000);

    removeTimers.current.push(timer);
  };

  return (
    <div ref={appRef} className="app-shell" onMouseMove={handleMouseMove}>
      <ScrollToTop />
      <Header showHeader={showHeader} />

      <div className="global-particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              "--dx": `${particle.dx}px`,
              "--dy": `${particle.dy}px`,
              "--duration": `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <main
        className="app-main"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}img/home/home-bg.jpg)`,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home introEnd={() => setShowHeader(true)} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
    </div>
  );
};

export default App; 