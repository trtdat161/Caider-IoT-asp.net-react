import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/welcome.css";
import robotBg from "./assets/img/robot.jpg";

export function Welcome() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    let time = 3000;

    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/auth/bootstrap");

        if (!isMounted) {
          console.log("Component welcome đã chết, không cập nhật state nữa");
          return;
        }

        const result = response.data;
        if (result.status) {
          console.log("Admin tồn tại, tiến hành login");
          timeoutId = setTimeout(() => {
            if (isMounted) {
              navigate("/login");
            }
          }, time);
        } else {
          console.log("Chưa có admin, đăng ký");
          timeoutId = setTimeout(() => {
            if (isMounted) {
              navigate("/register");
            }
          }, time);
        }
      } catch (err) {
        if (isMounted) {
          setError("error: " + err.message);
          console.error("lỗi: ", err.message);
        }
      }
    };

    checkAdmin();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    /*
    trong useFffect này, return một hàm dọn dẹp để đặt isMounted thành false khi component unmount.
    */
  }, [navigate]);

  return (
    <div className="welcome-container">
      {/* Background robot mờ */}
      <div
        className="robot-background"
        style={{ backgroundImage: `url(${robotBg})` }}
        // {object}
      ></div>

      <div className="scanline"></div>

      <div className="glitch-wrapper">
        <h1 className="glitch" data-text="WELCOME YOU, BOSS">
          WELCOME YOU, BOSS
        </h1>
      </div>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p className="status-text">[ SYSTEM INITIALIZING... ]</p>
      {error && <p className="error-text">[ ERROR: {error} ]</p>}
    </div>
  );
}
