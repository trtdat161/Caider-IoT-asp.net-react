import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function DashboardManage() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <Sidebar />
        <div className="content-manage">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
