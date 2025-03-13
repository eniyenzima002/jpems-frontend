import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default EmployeeDashboard;
