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
