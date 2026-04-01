import React, { useEffect, useState } from "react";
import CaiderScan from "./CaiderScan";
import "../css/dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

export function Dashboard() {
  const [expansive, setExpansive] = useState("");
  const [micro, setMicro] = useState("");
  const [motor, setMotor] = useState("");
  const [servo, setServo] = useState("");
  const [connect, setConnect] = useState(false);

  // OK : state thông báo thay thế alert
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();
  const manageHardware = () => {
    navigate("/manage");
  };

  const data = async () => {
    try {
      const [responseExp, responseMicro, responseServos, responseMotors] =
        await Promise.all([
          axios.get(`${API_URL}/api/expansiveboards`),
          axios.get(`${API_URL}/api/microcontrollers`),
          axios.get(`${API_URL}/api/servos`),
          axios.get(`${API_URL}/api/motors`),
        ]);
      setExpansive(responseExp.data.items[0]?.name || "no data");
      setMicro(responseMicro.data.items[0]?.name || "no data");
      setMotor(responseMotors.data.items[0]?.name || "no data");
      setServo(responseServos.data.items[0]?.name || "no data");
    } catch (error) {
      console.log("lỗi: " + error);
    }
  };

  const connectCaider = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/mqtt/connect`, {
        functionName: "connect",
      });
      if (response.data.success) {
        setConnect(true);
        // thay alert bằng setMessage
        setMessage({ text: " Kết nối thành công ", type: "success " });
      } else {
        setConnect(false);
        // thay alert bằng setMessage
        setMessage({ text: " Kết nối thất bại! ", type: "error " });
      }
    } catch (error) {
      setConnect(false);
      // thay alert bằng setMessage
      setMessage({ text: ` Lỗi kết nối: ${error.message}`, type: "error " });
    }
  };

  const handleWaveHello = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/mqtt/command`, {
        functionName: "wave",
      });
      if (response.data.success) {
        // thay alert bằng setMessage
        setMessage({ text: " Caider vẫy tay ", type: "success " });
      } else {
        // thay alert bằng setMessage
        setMessage({ text: " Gửi lệnh thất bại! ", type: "error " });
      }
    } catch (error) {
      // thay alert bằng setMessage
      setMessage({ text: `Lỗi khi gửi: ${error.message}`, type: "error " });
    }
  };

  const stopWaveHello = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/mqtt/stop`);
      if (response.data.success) {
        // thay alert bằng setMessage
        setMessage({ text: " Đã dừng Caider ", type: "success " });
      } else {
        // thay alert bằng setMessage
        setMessage({ text: " Lỗi khi dừng! ", type: "error " });
      }
    } catch (error) {
      // thay alert bằng setMessage
      setMessage({ text: ` Lỗi khi gửi: ${error.message}`, type: "error " });
    }
  };

  const defaultCaider = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/mqtt/default`, {
        functionName: "default",
      });
      if (response.data.success) {
        // thay alert bằng setMessage
        setMessage({
          text: " Caider về trạng thái mặc định! ",
          type: "success",
        });
      } else {
        // thay alert bằng setMessage
        setMessage({ text: " Thất bại! ", type: "error" });
      }
    } catch (error) {
      // thay alert bằng setMessage
      setMessage({ text: ` Lỗi khi gửi: ${error.message}`, type: "error" });
    }
  };

  const Logout = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/logout`);
      const result = response.data;
      console.log("message: " + result.message);
      if (result) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      setMessage({ text: `Lỗi khi logout: ${error.message}`, type: "error" });
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex flex-column">
        <div className="flex-grow-1 d-flex flex-column">
          <header className="row">
            <div className="d-flex justify-content-between">
              <div className="status-caider p-2">
                <div>Caider Control Dashboard</div>
                <small>Robot Management System</small>
              </div>
              <div>
                <nav className="p-3">
                  <button className="gear-btn" onClick={manageHardware}>
                    <span className="me-2">caider manager</span>
                    <i className="bi bi-gear-wide-connected"></i>
                  </button>
                  <button
                    className="gear-btn"
                    onClick={Logout}
                    title="Logout"
                    aria-label="Logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </header>

          <div className="row flex-grow-1">
            <div className="col-md-12">
              <header>
                <h2 className="title text-center my-3">caider welcome boss</h2>
              </header>
            </div>
          </div>

          <main className="row flex-grow-1">
            <aside className="col-md-3 display-left">
              <div className="infomation">
                <div className="info1">
                  <div>robot name: Caider</div>
                  <div>protocol: MQTT</div>
                  <div>status: {connect ? "Connected" : "Disconnected"}</div>
                </div>
                <div className="info2 p-2">
                  <CaiderScan />
                </div>
              </div>
            </aside>

            <div className="col-md-6 btn-main">
              <div>
                <div className="d-flex justify-content-center my-3 btn-connect">
                  <button onClick={connectCaider}>Connect with Caider</button>
                </div>
                <div>
                  <div className="d-flex justify-content-center my-3 btn-connect gap-3">
                    <button
                      className="btn-primary"
                      onClick={handleWaveHello}
                      disabled={!connect}
                    >
                      caider waved
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={stopWaveHello}
                      disabled={!connect}
                    >
                      stop waving
                    </button>
                  </div>
                  <div className="d-flex justify-content-center my-3 btn-connect">
                    <button
                      className="btn-primary"
                      onClick={defaultCaider}
                      disabled={!connect}
                    >
                      caider default
                    </button>
                  </div>
                </div>

                {/* OK : hiển thị thông báo thay thế alert, chỉ hiện khi có text */}
                <div
                  className="border rounded p-3 mt-3"
                  style={{
                    background: "#000",
                    minHeight: "48px", // luôn chiếm chỗ → nút không bị đẩy
                  }}
                >
                  <div
                    style={{
                      color: message.type === "success" ? "#4ade80" : "#f87171",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      textAlign: "center",
                      // không dùng marginTop nữa vì đã có p-2 của div cha
                    }}
                  >
                    {message.text
                      ? (message.type === "success" ? "DONE" : "ERROR") +
                        message.text
                      : ""}
                  </div>
                </div>
                {/* ------- */}
              </div>
            </div>

            <aside className="col-md-3 display-right">
              <div className="text-center p-2">device caider</div>
              <ul className="list-box">
                <li>expansive: {expansive}</li>
                <li>micro controller: {micro}</li>
                <li>servo: {servo}</li>
                <li>step motor: {motor}</li>
                <li>Mode: hacking wifi</li>
              </ul>
              <hr />
              <div>
                <div
                  className="hacker-console"
                  style={{
                    background: "#080808ff",
                    color: "#0f0",
                    fontFamily: "monospace",
                    fontSize: 12,
                    padding: 12,
                    borderRadius: 6,
                    height: 280,
                    overflow: "hidden",
                    boxShadow: "inset 0 0 12px rgba(0,255,0,0.08)",
                    border: "1px solid white",
                  }}
                >
                  <div
                    className="hc-lines"
                    style={{
                      display: "inline-block",
                      animation: "hc-scroll 8s linear infinite",
                      whiteSpace: "pre",
                    }}
                  >
                    <div>boot sequence ... ok</div>
                    <div>link established: 192.168.0.42</div>
                    <div>handshake: AES-256 ... SUCCESS</div>
                    <div>spawn caider-agent</div>
                    <div>sensors: OK | motors: OK | mqtt: CONNECTED</div>
                    <div>uploading payload.bin ... 100%</div>
                    <div>exec: ./agent --stealth</div>
                    <div>clearing traces ... done</div>
                    <div>monitoring loop ...</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>waiting for commands</div>
                    <div>101010110101010110101</div>
                    <div>1010101101010101101</div>
                    <div>10101011010101011</div>
                    <div>10101011010101</div>
                    <div>10101011010</div>
                    <div>10101010</div>
                    <div>10101</div>
                    <div>1</div>
                    <div>0</div>
                    <div>... ... ...</div>
                  </div>
                  <style>{`
                    @keyframes hc-scroll {
                      0% { transform: translateY(100%); }
                      100% { transform: translateY(-100%); }
                    }
                    .hacker-console .hc-lines > div { line-height: 1.4; padding: 1px 0; }
                    .hacker-console .hc-lines > div::before { content: "> "; color: #7cff7c; }
                  `}</style>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
