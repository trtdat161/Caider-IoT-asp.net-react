import { useState } from "react";
import "../css/addOrUp.css";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!username.trim()) nextErrors.username = "Username is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      nextErrors.email = "Invalid email";
    if (!password) nextErrors.password = "Password is required";
    else if (password.length < 6)
      nextErrors.password = "Password must be at least 6 chars";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // TODO: call register API here
      // For now redirect to login or dashboard
      navigate("/login");
    }
  };

  return (
    <div className="robot-container vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="robot-form"
        style={{
          borderWidth: 3,
          borderColor: "#ff004c",
          boxShadow: "0 18px 60px rgba(112,0,255,0.28)",
        }}
      >
        <div className="robot-header">
          <h2 className="robot-title glitch" data-text="ADMIN INIT">
            ADMIN INIT
          </h2>
        </div>
        <style>
            {`
                .input-group-robot .input-wrapper {
                    width: 100%;
                }
                .input-group-robot .robot-input {
                    width: 100%;
                }
            `}
        </style>
        <div className="input-group-robot">
          <label className="robot-label">Username</label>
          <div className="input-wrapper">
            <input
              className="robot-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="input-border" />
          </div>
          {errors.username && (
            <div className="text-danger mt-1">{errors.username}</div>
          )}
        </div>

        <div className="input-group-robot">
          <label className="robot-label">Email</label>
          <div className="input-wrapper">
            <input
              className="robot-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-border" />
          </div>
          {errors.email && (
            <div className="text-danger mt-1">{errors.email}</div>
          )}
        </div>

        <div className="input-group-robot">
          <label className="robot-label">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              className="robot-input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-border" />
          </div>
          {errors.password && (
            <div className="text-danger mt-1">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="robot-btn">
          <span className="btn-content">Create Admin</span>
          <span className="btn-glow" />
        </button>
      </form>
    </div>
  );
}
