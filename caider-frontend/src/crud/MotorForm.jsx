import { useNavigate, useParams } from "react-router-dom";
import "../css/addOrUp.css";
import { LinkPage } from "./LinkPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigation } from "lucide-react";

export function MotorForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    const data = async () => {
      if (isEditMode) {
        try {
          const response = await axios.get(`/api/motors/${id}`);
          setName(response.data.name || "");
          setNote(response.data.note || "");
        } catch (error) {
          console.log("lỗi khi lấy dữ liệu: " + error);
          alert("lỗi khi lấy dữ liệu:: " + error.message);
        }
      }
    };
    data();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("tên động cơ motor là bắt buộc !");
      return;
    }
    try {
      if (isEditMode) {
        await axios.put(`/api/motors/${id}`, { name, note });
        setSuccess("Motor updated successfully !");
      } else {
        const response = await axios.post("/api/motors", { name, note });
        e.target.reset();
        setError("");
        setName("");
        setNote("");
        setSuccess("Motor added successfully !");
        console.log("gửi ok: " + response.data);
      }
    } catch (error) {
      console.log("lỗi: " + error);
      alert("lỗi: " + error.message);
    }
  };

  const title = isEditMode ? "EDIT MOTOR" : "ADD MOTOR";
  const buttonText = isEditMode ? "UPDATE SYSTEM" : "INITIALIZE SYSTEM";

  return (
    <>
      <div className="robot-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <LinkPage />
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => navigation("/manage/motor")}
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
              Motor Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control robot-input"
                placeholder="Enter motor model..."
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
