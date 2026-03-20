import { useState } from "react";
import "../css/addOrUp.css";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Email is required");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Invalid email");

    // TODO: call forgot-password endpoint
    setSent(true);
  };

  return (
    <div className="robot-container vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="robot-form"
        style={{ maxWidth: 520 }}
      >
        <div className="robot-header">
          <div className="robot-icon">🔒</div>
          <h2 className="robot-title">Reset Password</h2>
        </div>

        {!sent ? (
          <>
            <div className="input-group-robot">
              <label className="robot-label">Email</label>
              <div className="input-wrapper">
                <input
                  className="robot-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-border" />
              </div>
              {error && <div className="text-danger mt-1">{error}</div>}
            </div>

            <button type="submit" className="robot-btn">
              <span className="btn-content">Send Reset Link</span>
              <span className="btn-glow" />
            </button>

            <div className="tech-lines" style={{ marginTop: 18 }}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div style={{ marginTop: 12, textAlign: "center" }}>
              <button
                type="button"
                className="robot-btn"
                style={{ background: "#2b2b2b" }}
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p className="text-light">
              Reset link sent to <strong>{email}</strong> if it exists.
            </p>
            <div style={{ marginTop: 12 }}>
              <button
                className="robot-btn"
                type="button"
                onClick={() => navigate("/login")}
              >
                Return to Login
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
