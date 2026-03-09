import { useEffect, useRef, useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [done, setDone] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const timeRef = useRef(null);
  /*  
  tạo 1 useRef để lưu lại giá trị id của setTimeout,
  tránh bị lỗi khi component unmount mà timeout vẫn chạy
  */

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

  const LoginAction = async (e) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };

    // username
    if (!form.username) {
      newErrors.username = "username không được để trống !";
    } else if (form.username.length < 4) {
      newErrors.username = "username ít nhất 4 ký tự !";
    }

    // Password
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

    // kiểm tra lại xem còn cái nào rỗng ko và còn cái nào có lỗi k
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", {
        username: form.username,
        password: form.password,
      });
      console.log("data: " + response.data);
      // const result = response.data;

      // localStorage.setItem("access_token", result.access_token); // access_token key của BE
      // console.log("Saved token:", localStorage.getItem("access_token"));

      // dùng cookie
      axios.defaults.withCredentials = true;
      /* 
      để axios tự động gửi cookie kèm theo mỗi request sau này
      Thuộc tính bật/tắt việc gửi kèm cookie trong mỗi request => true là bật, false là tắt
      */
      setDone(true);
      setLoginError("");
      timeRef.current = setTimeout(() => {
        navigate("/dashboard");
      }, 2300);
    } catch (err) {
      console.log("lỗi: " + err.error);
      setLoginError(" username or password faild");
      setDone(false);
    } finally {
      setLoading(false); // dù login thành công hay thất bại thì cũng phải tắt loading
    }
  };

  // cleanup function để clear timeout khi component unmount, tránh lỗi setState trên component đã unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

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
          <div className="text-center">
            <button type="submit" className="w-100 mt-2">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {done && (
            <div className="alert alert-success mt-3" role="alert">
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
