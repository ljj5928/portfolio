import React from "react";
import "./Tools.css";

const Tools = () => {
  const tools = [
    {
      id: 1,
      name: "Figma",
      desc: "디자인 협업",
      img: "./img/about/about-tool-icon1.png",
      className: "figma",
    },
    {
      id: 2,
      name: "GitHub",
      desc: "버전 관리",
      img: "./img/about/about-tool-icon2.png",
      className: "github",
    },
    {
      id: 3,
      name: "Node.js",
      desc: "서버 개발 환경",
      img: "./img/about/about-tool-icon3.png",
      className: "vite",
    },
    {
      id: 4,
      name: "VSCode",
      desc: "개발 에디터",
      img: "./img/about/about-tool-icon4.png",
      className: "vscode",
    },
  ];

  const certificates = [
    { id: 1, name: "ACP - Photoshop CC", organization: "Adobe" },
    { id: 2, name: "ACP - Illustrator CC", organization: "Adobe" },
    { id: 3, name: "웹디자인개발기능사", organization: "한국산업인력공단" },
  ];

  return (
    <section className="tools">
      <div className="tools-bg-glow tools-bg-glow1"></div>
      <div className="tools-bg-glow tools-bg-glow2"></div>

      <div className="tools-inner">
        <div className="tools-head">
          <p className="tools-kicker">WORKFLOW</p>
          <h2 className="tools-title">Tools</h2>
          <p className="tools-sub">
            효율적인 협업과 개발을 위해 다양한 개발 도구를 활용합니다.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <div className={`tools-card ${tool.className}`} key={tool.id}>
              <div className="tools-icon-wrap">
                <img src={tool.img} alt={tool.name} className="tools-icon" />
              </div>

              <div className="tools-text">
                <h3>{tool.name}</h3>
                <p>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="certificate">
          <div className="certificate-head">
            <p className="certificate-kicker">LICENSE</p>
            <h3 className="certificate-title">Certificate</h3>
            <p className="certificate-sub">전문성을 기반으로 취득한 자격증입니다.</p>
          </div>

          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <div className="certificate-card" key={certificate.id}>
                <span className="certificate-dot"></span>

                <div className="certificate-text">
                  <p className="certificate-name">{certificate.name}</p>
                  <span className="certificate-org">
                    {certificate.organization}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;