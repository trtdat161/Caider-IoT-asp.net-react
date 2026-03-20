import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// cấu hình kèm cookie cho global
// axios.defaults.withCredentials = true;
/* 
để axios tự động gửi cookie kèm theo mỗi request sau này
Thuộc tính bật/tắt việc gửi kèm cookie trong mỗi request => true là bật, false là tắt
*/

import { Welcome } from "./layout/Welcome.jsx";
import { Dashboard } from "./home/Dashboard.jsx";
import { DashboardManage } from "./layout/DashboardManage.jsx";
import { ManagehardWare } from "./dashboard/ManagehardWare.jsx";
import { Microcontroller } from "./dashboard/Microcontroller.jsx";
import { Expansiveboard } from "./dashboard/Expansiveboard.jsx";
import { Motor } from "./dashboard/Motor.jsx";
import { Servo } from "./dashboard/Servo.jsx";
import { ExpansiveForm } from "./component/ExpansiveForm.jsx";
import { MicrocontrollerForm } from "./component/MicrocontrollerForm.jsx";
import { MotorForm } from "./component/MotorForm.jsx";
import { ServoForm } from "./component/ServoForm.jsx";
import { Login } from "./form/Login.jsx";
import { Register } from "./form/Register.jsx";
import { ForgotPassword } from "./form/ForgotPassword.jsx";
import { ProtectedRoute } from "./Auth/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* còn cái login */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />  dòng này là ban đầu chưa có midleware */}
        {/* bọc component cần midleware vào trong */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* ----- Outlet dùng phải bọc mấy thằng con bên trong như này ----- */}
        {/* <Route path="/manage" element={<DashboardManage />}> dòng này là ban đầu chưa có midleware
        bảo vệ luôn cả dashboard này tránh ko cần đi qua dash chính mà gõ url */}
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <DashboardManage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagehardWare />} />
          <Route path="hardware" element={<ManagehardWare />} />
          <Route path="microcontroller" element={<Microcontroller />} />
          {/* crud microcontroller */}
          <Route
            path="add-or-up-microcontroller"
            element={<MicrocontrollerForm />}
          />
          <Route
            path="add-or-up-microcontroller/:id"
            element={<MicrocontrollerForm />}
          />

          <Route path="expansiveboard" element={<Expansiveboard />} />
          {/* crud expansive form */}
          <Route path="add-or-up-expansive" element={<ExpansiveForm />} />
          <Route path="add-or-up-expansive/:id" element={<ExpansiveForm />} />

          <Route path="servo" element={<Servo />} />
          {/* crud servo form */}
          <Route path="add-or-up-servo" element={<ServoForm />} />
          <Route path="add-or-up-servo/:id" element={<ServoForm />} />

          <Route path="motor" element={<Motor />} />
          {/* crud motor form */}
          <Route path="add-or-up-motor" element={<MotorForm />} />
          <Route path="add-or-up-motor/:id" element={<MotorForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
