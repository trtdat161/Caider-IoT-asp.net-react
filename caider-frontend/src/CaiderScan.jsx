import { useState, useEffect } from "react";
import "./css/CaiderScan.css";

export default function CaiderScan() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      delay: Math.random() * 4 + "s",
      duration: 3 + Math.random() * 2 + "s",
      id: Math.random(),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="hs-container">
      <div className="scan-line"></div>
      <div className="human">
        <div className="head"></div>
        <div className="body">
          <div className="arm left"></div>
          <div className="arm right"></div>
        </div>
        <div className="legs">
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-label">Scan Progress</div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration + "s",
          }}
        />
      ))}
    </div>
  );
}
