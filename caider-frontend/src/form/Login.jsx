import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [form, setForm] = [
    {
      username: "",
      password: "",
    },
  ];
  const [errors, setErrors] = useState[{}];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const LoginAction = async (e) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };

    // username
    if (!form.username) {
      newErrors.username = "username không được để trống !";
    } else if (form.username.length < 4) {
      newErrors.username = "username phải hơn 4 ký tự !";
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

    // kiểm tra lại xem còn cái nào rỗng ko và còn cái nào có lỗi k
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        username: form.username,
        password: form.password,
      });
      console.log("data: " + response.data);
      const result = response.data;

      localStorage.setItem("access_token", result.access_token); // access_token key của BE
    } catch (err) {
      console.log("lỗi: " + err.error);
    }
  };

  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        {/* error */}

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
              id="username"
              placeholder="username"
              className="form-control"
              onChange={handleChange}
            />
            {errorUsername && (
              <span className="error-message text-danger">{errorUsername}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="form-label text-light">
              password
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="form-control"
              onChange={handleChange}
            />
            {errorPassword && (
              <span className="error-message text-danger">{errorPassword}</span>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="w-100 mt-2">
              login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
