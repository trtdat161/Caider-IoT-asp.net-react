import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5073",
        changeOrigin: true,
        // secure: false, // dùng khi https nhưng cũng hên xui
      },
    },
  },
});
// cấu hình vte dev sever làm trung gian (proxy) để chuyển tiếp các request từ FE đến BE
// tránh lỗi CORS khi frontend và backend chạy trên các cổng khác nhau

/*
 * ĐIỀU QUAN TRỌNG:  cấu hình proxy này ko chỉ làm gọn url khi call api mà còn
  thay đổi cách browser nhìn request, và chính điều đó làm cookie tự gửi

  nên dùng proxy khi dev vì gọi api chuỗi ngắn và
  5173 → 5173 → 5073
  Browser chỉ thấy 5173.
 */
