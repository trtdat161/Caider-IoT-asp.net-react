import { useEffect, useState } from "react";
import "./css/manageDashboard.css";
import { useNavigate } from "react-router-dom";

export function ManagehardWare() {
  const [countMicro, setCountMicro] = useState(0);
  const [countExp, setCountExp] = useState(0);
  const [countServos, setCountServos] = useState(0);
  const [countMotors, setCountMotors] = useState(0);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(""); // Thêm state error
  const navigate = useNavigate();

  const countData = async () => {
    try {
      setLoading(true);
      setError("");

      const [responseMicro, responseExp, responseServos, responseMotors] =
        await Promise.all([
          fetch("/api/microcontrollers"),
          fetch("/api/expansiveboards"),
          fetch("/api/servos"),
          fetch("/api/motors"),
        ]);

      // Kiểm tra nếu có response không ok
      if (
        !responseMicro.ok ||
        !responseExp.ok ||
        !responseServos.ok ||
        !responseMotors.ok
      ) {
        throw new Error("API không phản hồi ");
      }

      const [dataMicro, dataExp, dataServos, dataMotors] = await Promise.all([
        responseMicro.json(),
        responseExp.json(),
        responseServos.json(),
        responseMotors.json(),
      ]);

      // do  BE đã code phân trang nên truy cập object api khác đi
      setCountMicro(dataMicro.items.length || 0);
      setCountExp(dataExp.items.length || 0);
      setCountServos(dataServos.items.length || 0);
      setCountMotors(dataMotors.items.length || 0);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Lỗi khi lấy dữ liệu phần cứng: " + error.message);
      // Đặt về 0 khi lỗi để tránh hiển thị số cũ
      setCountMicro(0);
      setCountExp(0);
      setCountServos(0);
      setCountMotors(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countData();
  }, []);
  return (
    <>
      <main>
        <div className="hardware-header d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <i
              className="bi bi-robot text-white"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <span
              className="fw-semibold text-white"
              style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
            >
              CAIDER HARDWARE
            </span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-sm btn-outline-light"
            style={{ whiteSpace: "nowrap" }}
          >
            <i className="bi bi-house"></i> Home
          </button>
        </div>
        <div className="info-hardware p-1 mt-3 rounded-2">
          {/* Hiển thị loading hoặc error */}
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Đang tải dữ liệu...</p>
            </div>
          )}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 border-0 hardware-card"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(0, 28, 151) 0%, rgb(158, 158, 158) 100%)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-5">
                  <div className="mb-4">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i className="bi bi-cpu" style={{ fontSize: "2rem" }}></i>
                    </div>
                  </div>
                  <div
                    className="fw-semibold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Microcontroller
                  </div>
                  <span className="fw-bold" style={{ fontSize: "3rem" }}>
                    {countMicro}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 border-0 hardware-card"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(143, 231, 0) 0%, #474747ff 100%)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-5">
                  <div className="mb-4">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i
                        className="bi bi-diagram-3"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="fw-semibold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Expansive Board
                  </div>
                  <span className="fw-bold" style={{ fontSize: "3rem" }}>
                    {countExp}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 border-0 hardware-card"
                style={{
                  background:
                    "linear-gradient(135deg, #da2c00ff 30%, #414141ff 100%)",
                  color: "#ffffffff",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-5">
                  <div className="mb-4">
                    <div
                      className="bg-white bg-opacity-50 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i
                        className="bi bi-arrow-repeat"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="fw-semibold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Servo
                  </div>
                  <span className="fw-bold" style={{ fontSize: "3rem" }}>
                    {countServos}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 border-0 hardware-card"
                style={{
                  background:
                    "linear-gradient(135deg, #0e9eb1ff 0%, #424242ff 100%)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-5">
                  <div className="mb-4">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i
                        className="bi bi-gear"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="fw-semibold mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Motor
                  </div>
                  <span className="fw-bold" style={{ fontSize: "3rem" }}>
                    {countMotors}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr
          className="my-5"
          style={{ borderColor: "#00f0ff", borderWidth: "2px" }}
        />
        {/* ------------- video --------------- */}
        <footer className="mt-5 pb-5">
          <div className="position-relative video-container">
            <img
              src="https://i.makeagif.com/media/5-18-2021/UAoFDI.gif"
              alt="CAIDER Futuristic Robot Demo"
              className="w-100 rounded"
              style={{
                objectFit: "cover",
                height: "clamp(300px, 50vh, 600px)",
                boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
              }}
            />
            <div
              className="position-absolute bottom-0 start-0 end-0 text-center pb-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                borderRadius: "0 0 0.5rem 0.5rem",
              }}
            >
              <p
                className="text-white fw-bold mb-0"
                style={{
                  fontSize: "clamp(1rem, 4vw, 1.5rem)",
                  textShadow: "0 2px 10px rgba(0, 240, 255, 0.6)",
                  letterSpacing: "2px",
                }}
              >
                FUTURISTIC ROBOT DEMO
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
