import { useState } from "react";
import "../css/addOrUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // validate
    const newErrors = { username: "", email: "", password: "" };

    // username
    if (!form.username) {
      newErrors.username = "username không được để trống !";
    } else if (form.username.length < 4) {
      newErrors.username = "username phải hơn 4 ký tự !";
    }

    // email
    if (!form.email) {
      newErrors.email = "email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password không được để trống";
    } else if (form.password.length < 6) {
      newErrors.password = "Password tối đa 6 ký tự";
    } else if (!/(?=.*[a-z])/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ thường";
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ hoa";
    } else if (!/(?=.*\d)/.test(form.password)) {
      newErrors.password = "Password phải có ít nhất 1 chữ số";
    }
    setErrors(newErrors);

    // kiểm tra lại lần nữa xem còn nào để trống và có lỗi ko thì mới insert
    if (Object.values(newErrors).some((error) => error !== "")) {
      // error !== "" lỗi ko rỗng tức là có lỗi
      return;
    }

    // đăng ký
    try {
      const response = await axios.post("/api/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      const result = response.data;
      if (result) {
        console.log("đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      console.log("lỗi: " + error);
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
              name="username"
              value={form.username}
              onChange={handleChange}
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
              name="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              value={form.password}
              onChange={handleChange}
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
