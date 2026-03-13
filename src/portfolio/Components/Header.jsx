import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ showHeader }) => {
  const [isHeaderHide, setIsHeaderHide] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const prevScrollY = useRef(0);

  const isBlackLogo = isDarkSection || isHover;

  const logoSrc = isBlackLogo
    ? `${import.meta.env.BASE_URL}img/header/logo-black.png`
    : `${import.meta.env.BASE_URL}img/header/logo-white.png`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && currentScrollY > 80) {
        setIsHeaderHide(true);
      } else {
        setIsHeaderHide(false);
      }

      prevScrollY.current = currentScrollY;

      const profileSection = document.querySelector("#profile");
      if (!profileSection) return;

      const headerHeight = 100;
      const profileTop = profileSection.getBoundingClientRect().top;
      const profileBottom = profileSection.getBoundingClientRect().bottom;

      const isProfileUnderHeader =
        profileTop <= headerHeight && profileBottom > headerHeight;

      setIsDarkSection(isProfileUnderHeader);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${showHeader ? "show" : ""} ${isHeaderHide ? "hide" : ""} ${isDarkSection ? "dark" : ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <nav>
        <Link to="/">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${logoSrc})`,
            }}
          />
        </Link>

        <ul className="gnb">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;