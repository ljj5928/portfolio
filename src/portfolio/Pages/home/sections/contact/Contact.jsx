import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(target);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact ${show ? "show" : ""}`}
    >
      <div className="contact-con">
        <h3>Let's work together</h3>
        <p>
          Creating clean and interactive web experiences. <br />
          Web Publisher 이재진
        </p>

        <a className="contact-email" href="mailto:dlwowls10@naver.com">
          <FontAwesomeIcon icon={faEnvelope} /> dlwowls10@naver.com
        </a>

        <div className="contact-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            깃허브
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            이력서
          </a>
        </div>
      </div>

      <div className="contact-footer">© 2025 Lee Jaejin</div>
    </section>
  );
};

export default Contact;
