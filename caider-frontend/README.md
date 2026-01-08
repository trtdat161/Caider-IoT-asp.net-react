# Tên Dự Án: Caider IoT Dashboard

## Mô tả

Đây là một ứng dụng IoT điều khiển robot và quản lý quản lý các phần cứng có trên robot. Như là quản lý microcontroller, motor, servo và expansive board. Frontend sử dụng React với Vite, backend là ASP.NET Core API, tích hợp MQTT Client kết nối đến broker để gửi/nhận lệnh điều khiển robot (near real-time)

## Công nghệ sử dụng

- Frontend: React, Vite, bootstrap, CSS
- Backend: ASP.NET Core, C#
- Cơ sở dữ liệu: SQL Server
- IoT: MQTT

## Tính năng chính

- Điều khiển robot và quản lý thiết bị trên robot qua dashboard
- CRUD operations cho các thành phần (microcontrol, motor, servo,...)
- Giao diện responsive
- Tích hợp MQTT để điều khiển thời gian thực

## Cài đặt và chạy

1. Clone repo: `git clone <link-repo>`
2. Cài đặt dependencies:
   - Frontend: `cd caider-frontend && npm install`
   - Backend: `cd WebApplication1 && dotnet restore`
3. Chạy:
   - Frontend: `npm run dev`
   - Backend: `dotnet run`

## Demo Video

Xem video demo dự án tại đây:
https://www.youtube.com/watch?v=Fhyi5ZbmBuc
