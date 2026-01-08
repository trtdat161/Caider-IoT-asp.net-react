import { useNavigate, useParams } from "react-router-dom";
import "../css/addOrUp.css";

import { LinkPage } from "./LinkPage";
import axios from "axios";
import { useEffect, useState } from "react";

export function ServoForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchServo = async () => {
        try {
          const response = await axios.get(`/api/servos/${id}`);
          setName(response.data.name || "");
          setNote(response.data.note || "");
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
          alert("Lỗi khi lấy dữ liệu servo: " + error.message);
        }
      };
      fetchServo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Tên động cơ servo là bắt buộc !");
      return;
    }
    try {
      if (isEditMode) {
        await axios.put(`/api/servos/${id}`, { name, note });
        setSuccess("Servo updated successfully !");
      } else {
        await axios.post("api/servos", { name, note });
        e.target.reset();
        setError("");
        setName("");
        setNote("");
        setSuccess("Servo added successfully !");
        console.log("đã gửi ok");
      }
    } catch (error) {
      console.log("lỗi: " + error);
      alert("lỗi: " + error.message);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setSuccess("");
    }, 2300);
    return clearTimeout(time);
  }, [id]);

  const title = isEditMode ? "EDIT SERVO" : "ADD SERVO";
  const buttonText = isEditMode ? "UPDATE SYSTEM" : "INITIALIZE SYSTEM";

  return (
    <>
      <div className="robot-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <LinkPage />
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => navigation("/manage/servo")}
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </button>
        </div>
        <div className="robot-header">
          <div className="robot-icon">
            <i className="bi bi-robot"></i>
          </div>
          <h1 className="robot-title">
            <span className="glitch" data-text={title}>
              {title}
            </span>
          </h1>
        </div>
        <form action="" className="robot-form" onSubmit={handleSubmit}>
          <div className="name-micro input-group-robot">
            <label htmlFor="name" className="robot-label">
              <i className="bi bi-cpu-fill"></i>
              Servo Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control robot-input"
                placeholder="Enter servo model..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="input-border"></span>
            </div>
            {error && (
              <span className="error-message text-danger">{error}</span>
            )}
          </div>

          <div className="note-micro input-group-robot">
            <label htmlFor="note" className="robot-label">
              <i className="bi bi-journal-code"></i>
              Technical Notes
            </label>
            <div className="input-wrapper">
              <textarea
                id="note"
                name="note"
                className="form-control robot-input"
                placeholder="Specifications, features, version..."
                rows="4"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <span className="input-border"></span>
            </div>
          </div>

          <button type="submit" className="robot-btn">
            <span className="btn-content">
              <i className="bi bi-lightning-charge-fill"></i>
              {buttonText}
            </span>
            <span className="btn-glow"></span>
          </button>

          {/* success */}
          {success && (
            <div className="alert alert-success text-center mt-3" role="alert">
              {success}
            </div>
          )}
          <div className="tech-lines"></div>
        </form>
      </div>
    </>
  );
}
