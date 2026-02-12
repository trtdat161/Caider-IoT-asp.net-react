import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// unmount nghĩa là component bị hủy, TỨC NẾU CHUYỂN TRANG THÌ NÓ SẼ BỊ UNMOUNT
export function Welcome() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // kiểm tra component còn sống hay không (MẶC ĐỊNH TRUE LÀ CÒN)
    let timeoutId = null;

    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/auth/bootstrap");

        // Kiểm tra component còn sống không
        if (!isMounted) {
          console.log("Component welcome đã chết, không cập nhật state nữa");
          return;
        }

        const result = response.data;
        if (result.status) {
          console.log("Admin tồn tại, tiến hành login");
          // setTimeout 2s
          timeoutId = setTimeout(() => {
            if (isMounted) {
              // Check lại trước khi navigate
              navigate("/login");
            }
          }, 2000);
        } else {
          console.log("Chưa có admin, đăng ký");
          timeoutId = setTimeout(() => {
            if (isMounted) {
              navigate("/register");
            }
          }, 2000);
        }
      } catch (err) {
        if (isMounted) {
          setError("error: " + err.message);
          console.error("lỗi: ", err.message);
        }
      }
    };

    checkAdmin();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId); // Hủy timer nếu user rời trang
      }
    };
  }, [navigate]); // cho navigate vào [] vì đang trong useEffect, đây là rule của React
  /*
  Hàm được return trong useEffect sẽ chạy khi:
  - Component unmount COMPONENT BỊ HỦY (chuyển trang)
  - useEffect cho phép trả về một function -> React gọi function đó khi cần dọn dẹp.
  */

  return (
    <>
      <h1>welcome you, boss</h1>
      {/* Animation của bạn sẽ ở đây */}
    </>
  );
}
