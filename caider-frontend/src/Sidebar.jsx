import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/sidebar.css";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng trên mobile
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Nút mở menu trên mobile - chỉ hiện dưới màn hình lớn (lg) */}
      <button
        className="btn btn-primary position-fixed top-0 start-0 m-3 z-3 d-lg-none"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "rgba(0, 240, 255, 0.3)",
          border: "1px solid #00f0ff",
          fontSize: "1.5rem", // <-- Chỉnh kích thước nút menu
          padding: "0.8rem",
        }}
      >
        {isOpen ? "X" : "|||"}
      </button>

      {/* Lớp phủ tối khi mở sidebar trên mobile */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 overlay d-lg-none"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar chính */}

      <div
        className={`sidebar position-fixed top-0 start-0 h-100 ${
          isOpen ? "show" : ""
        }`}
      >
        {/* Phần đầu - Logo và tên */}
        <div className="sidebar-header text-center">
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="robot-logo"></div>
            <div>
              <h2
                className="text-white mb-0 fw-bold"
                style={{ letterSpacing: "3px", fontSize: "1.8rem" }}
              >
                CAIDER
              </h2>
              <small style={{ color: "#00f0ff" }}>Robot Systems</small>
            </div>
          </div>
        </div>

        {/* Link - to */}
        <nav className="mt-4 px-3">
          <Link
            to="/manage"
            className={`menu-item ${isActive("/manage") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            <span>DASHBOARD</span>
          </Link>

          <Link
            to="/manage/microcontroller"
            className={`menu-item ${
              isActive("/manage/microcontroller") ? "active" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <span>Caider Microcontroller</span>
          </Link>

          <Link
            to="/manage/expansiveboard"
            className={`menu-item ${
              isActive("/manage/expansiveboard") ? "active" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <span>Caider Expansive Board</span>
          </Link>

          <Link
            to="/manage/servo"
            className={`menu-item ${isActive("/manage/servo") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            <span>Caider Servo</span>
          </Link>

          <Link
            to="/manage/motor"
            className={`menu-item ${isActive("/manage/motor") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            <span>Caider Motor</span>
          </Link>
        </nav>

        <div className="position-absolute bottom-0 w-100 p-4 text-center">
          <small className="text-muted" style={{ fontSize: "0.8rem" }}>
            <div className="text-white">Powered by Future Robotics © 2025</div>
          </small>
        </div>
      </div>
    </>
  );
}
