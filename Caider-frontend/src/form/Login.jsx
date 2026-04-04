import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

export function Login() {
  const [done, setDone] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false); // 👈 thêm

  const timeRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 👇 thêm function này
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotMsg(true);

    setTimeout(() => {
      setShowForgotMsg(false);
    }, 3000);
  };

  const LoginAction = async (e) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };

    if (!form.username) {
      newErrors.username = "username không được để trống !";
    } else if (form.username.length < 4) {
      newErrors.username = "username ít nhất 4 ký tự !";
    }

    if (!form.password) {
      newErrors.password = "Password không được để trống";
    } else if (form.password.length < 6) {
      newErrors.password = "Password ít nhất 6 ký tự";
    } else if (!/(?=.*[a-z])/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ thường";
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ hoa";
    } else if (!/(?=.*\d)/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ số";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: form.username,
        password: form.password,
      });

      console.log("data: " + response.data);

      setDone(true);
      setLoginError("");

      timeRef.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2300);
    } catch (err) {
      console.log("lỗi: " + err.error);
      setLoginError(" username or password faild");
      setDone(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <form onSubmit={LoginAction} className="border rounded shadow p-4">
          <h2 className="text-center text-light">LOGIN</h2>
          <hr />

          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              username
            </label>
            <br />
            <input
              type="text"
              name="username"
              value={form.username}
              placeholder="username"
              className="form-control"
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error-message text-danger">
                {errors.username}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="form-label text-light">
              password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="password"
              className="form-control"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message text-danger">
                {errors.password}
              </span>
            )}
          </div>

          {/* Forgot password đặt đúng chỗ */}
          <div className="text-end mt-1">
            <a
              href="#"
              onClick={handleForgotPassword}
              style={{ fontSize: "14px" }}
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center">
            <button type="submit" className="w-100 mt-2">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* thông báo forgot */}
          {showForgotMsg && (
            <div className="alert alert-warning mt-3 text-center" role="alert">
              Chức năng này đang phát triển 🚧
            </div>
          )}

          {done && (
            <div className="alert alert-success mt-3 text-center" role="alert">
              Login successful!
            </div>
          )}

          {loginError && (
            <div className="alert alert-danger mt-3" role="alert">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
