import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
