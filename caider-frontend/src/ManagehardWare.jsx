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
        <div className="d-flex align-items-center justify-content-between gap-3 m-2 border border-white rounded p-2">
          <div>
            <i className="bi bi-robot fs-1 text-white"></i>
            <span className="fs-1 fw-semibold text-white p-3">
              CAIDER HARDWARE MANAGEMENT
            </span>
          </div>
          <button onClick={() => navigate("/")} className="btn btn-secondary">
            Home
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
            <div className="col-md-3 text-center">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #14a1ffff 0%, #3a3a3aff 100%)",
                  color: "white",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-4">
                  <div className="mb-3">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-cpu fs-2"></i>
                    </div>
                  </div>
                  <div className="fw-semibold mb-2">Microcontroller</div>
                  <span className="fs-1 fw-bold">{countMicro}</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #00df70ff 0%, #474747ff 100%)",
                  color: "white",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-4">
                  <div className="mb-3">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-diagram-3 fs-2"></i>
                    </div>
                  </div>
                  <div className="fw-semibold mb-2">Expansive Board</div>
                  <span className="fs-1 fw-bold">{countExp}</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #da2c00ff 30%, #414141ff 100%)",
                  color: "#ffffffff",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-4">
                  <div className="mb-3">
                    <div
                      className="bg-white bg-opacity-50 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-arrow-repeat fs-2"></i>
                    </div>
                  </div>
                  <div className="fw-semibold mb-2">Servo</div>
                  <span className="fs-1 fw-bold">{countServos}</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #0e9eb1ff 0%, #424242ff 100%)",
                  color: "white",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center py-4">
                  <div className="mb-3">
                    <div
                      className="bg-white bg-opacity-25 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className="bi bi-gear fs-2"></i>
                    </div>
                  </div>
                  <div className="fw-semibold mb-2">Motor</div>
                  <span className="fs-1 fw-bold">{countMotors}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* ------------- video --------------- */}
        <div className="mt-4 p-2">
          <div className="position-relative">
            <img
              src="https://i.makeagif.com/media/5-18-2021/UAoFDI.gif"
              alt="CAIDER Futuristic Robot Demo"
              className="w-100 rounded shadow-lg"
              style={{
                objectFit: "cover",
                height: "50vh",
                minHeight: "300px",
              }}
            />
            <div className="position-absolute bottom-0 start-0 end-0 text-center pb-3">
              <p
                className="text-white fw-bold fs-4 mb-0"
                style={{ textShadow: "2px 2px 8px black" }}
              >
                Futuristic Robot Demo
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
