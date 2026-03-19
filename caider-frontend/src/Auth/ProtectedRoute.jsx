import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/*
--------- Tạo 1 midleware ở phía Frontend ----------
User muốn vào trang
      
ProtectedRoute chạy trước
      
gọi API kiểm tra login
      
Nếu đã login cho vào trang
Nếu chưa login redirect về /login
*/

export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false); // vì api ban đầu chưa gọi nên là false

  useEffect(() => {
    // chạy khi component được mount, chạy lần đâu 1 lần khi load trang
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check");
        console.log("status: " + response.data);
        if (response.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.log("error: " + error);
        setIsAuth(false);
      } finally {
        // finally luôn chạy, nếu là false => ko load nữa tức đánh dấu api đã xong
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /*
  chưa check xong auth thì load tiếp
  Tránh tình huống:
    Trang load
    
    isAuth vẫn false
    
    redirect nhầm về login
  */

  if (loading)
    return <div className="text-center">Checking authentication...</div>;

  return isAuth ? children : <Navigate to="/login" replace />;
  // nếu isAuth = true thì trả về chilren còn ko thì sẽ đá về trang login
}
