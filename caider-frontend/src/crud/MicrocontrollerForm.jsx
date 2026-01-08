import axios from "axios";
import "../css/addOrUp.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkPage } from "./LinkPage";

export function MicrocontrollerForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetMicro = async () => {
        try {
          const response = await axios.get(`/api/microcontrollers/${id}`);
          setName(response.data.name || "");
          setNote(response.data.note || "");
        } catch (error) {
          console.error("lỗi khi lấy dữ liệu:", error);
          alert("Lỗi khi lấy dữ liệu microcontroller: " + error.message);
        }
      };
      fetMicro();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Tên vi điều khiển là bắt buộc !");
      return;
    }
    try {
      if (isEditMode) {
        await axios.put(`/api/microcontrollers/${id}`, {
          name,
          note,
        });
        setSuccess("Microcontroller updated successfully !");
      } else {
        const response = await axios.post("/api/microcontrollers", {
          name,
          note,
        });
        setError("");
        setName("");
        setNote("");
        e.target.reset();
        setSuccess("Microcontroller added successfully !");
        console.log("Đã gửi ok: " + response.data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi: " + error.message);
    }
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setSuccess("");
    }, 2300);
    return () => clearTimeout(time);
  }, [success]); // success đổi -> timeout xảy ra = gọi
  // cho vào [] chỉ chạy khi data mình chỉ định thay đổi, code ổn định

  const title = isEditMode ? "EDIT MICROCONTROLLER" : "ADD MICROCONTROLLER";
  const buttonText = isEditMode ? "UPDATE SYSTEM" : "INITIALIZE SYSTEM";
  return (
    <>
      <div className="robot-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <LinkPage />
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => navigation("/manage/microcontroller")}
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
              Microcontroller Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control robot-input"
                placeholder="Enter microcontroller model..."
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
