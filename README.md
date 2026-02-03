# Caider — IoT Robot Management (Admin-only)

Ngắn gọn: ứng dụng điều khiển và quản lý phần cứng robot Caider (microcontroller, expansive board, servo, motor) và gửi lệnh thời gian thực qua MQTT.

# Tech stack

- Frontend: React + Vite
- Backend: ASP.NET (Minimal API) + EF Core
- DB: SQL Server
- IoT: MQTT (broker: broker.hivemq.com:1883)

Quick start

1. Frontend
   - cd caider-frontend
   - npm install
   - npm run dev
2. Backend
   - cấu hình connection string trong `appsettings.json`
   - cd Caider-backend/CaiderBackend
   - dotnet restore
   - dotnet run

Notes (quan trọng)

- Dự án thiết kế cho 1 admin duy nhất: `Register` chỉ cho phép tạo admin khi hệ thống chưa có tài khoản.
- Authentication: FE đăng nhập → BE trả `access_token` (JWT)
- Entity mapping: `DataContext` ánh xạ bảng DB → models (ví dụ `created_at` ↔ `CreatedAt`). Hiện dùng mapping trực tiếp lên entity do schema đơn giản.
- MQTT: `MqttService` tách riêng vì kết nối persistent (publish/subscribe), broker mặc định là `broker.hivemq.com:1883`.

Short interview notes (nói nhanh khi phỏng vấn)

- Mapping: "Models ánh xạ trực tiếp cột DB (ví dụ created_at → CreatedAt)."
- Minimal API: "Chọn Minimal API vì project dành cho 1 admin — gọn nhẹ và dễ maintain."
- DataContext: "DataContext định nghĩa DbSet và mapping tên cột để khớp DB và model."
- MQTT: "MQTT tách riêng vì persistent connection; backend publish/subscribe với broker.hivemq.com:1883."
- Auth/JWT: "FE lấy token khi login, token được dùng cho mọi request bảo vệ tài nguyên; hết hạn thì login lại."

## Demo Video

Xem video demo dự án tại đây:
https://www.youtube.com/watch?v=Fhyi5ZbmBuc
