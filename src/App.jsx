import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import PrivateRoute from "./utils/PrivateRoute"
import RoleBasedRoutes from "./utils/RoleBasedRoutes"
import AdminBoard from "./components/adminDashboard/AdminBoard"
import Departments from "./components/departments/Departments"
import AddDepartment from "./components/departments/AddDepartment"
import EditDepartment from "./components/departments/EditDepartment"
import Employees from "./components/employees/Employees"
import AddEmp from "./components/employees/AddEmp"
import ViewEmp from "./components/employees/ViewEmp"
import EditEmp from "./components/employees/EditEmp"
import AddSalary from "./components/salary/AddSalary"
import ViewSalary from "./components/salary/ViewSalary"
import EmployeeBoard from "./components/EmployeeDashboard/EmployeeBoard"
// import InquireList from "./components/Inquire/inquireList"
import AddInquire from "./components/Inquire/AddInquire"
import Settings from "./components/EmployeeDashboard/Settings"
import InquireTable from "./components/Inquire/InquireTable"
import InquireDetail from "./components/Inquire/InquireDetail"
import InquireList from "./components/Inquire/InquireList"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login /> } />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoute>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoute>
        }
        >
          <Route index element={<AdminBoard />} />
          <Route path="/admin-dashboard/departments" element={<Departments />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />

          <Route path="/admin-dashboard/employees" element={<Employees />} />
          <Route path="/admin-dashboard/add-employee" element={<AddEmp />} />
          <Route path="/admin-dashboard/employees/:id" element={<ViewEmp />} />
          <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmp />} />
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />

          <Route path="/admin-dashboard/salaries/add" element={<AddSalary />} />
          <Route path="/admin-dashboard/inquires" element={<InquireTable />} />
          <Route path="/admin-dashboard/inquire/:id" element={<InquireDetail />} />
          <Route path="/admin-dashboard/employees/inquire/:id" element={<InquireList />} />
          <Route path="/admin-dashboard/settings" element={<Settings />} />

        </Route>
        
        <Route path="/employee-dashboard" element={
          <PrivateRoute>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>
          </PrivateRoute>

        } >
          <Route index element={<EmployeeBoard />} />
          <Route path="/employee-dashboard/profile/:id" element={<ViewEmp />} />
          
          <Route path="/employee-dashboard/inquires/:id" element={ <InquireList /> } />
          <Route path="/employee-dashboard/add-inquire" element={<AddInquire />} />
          
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />

          <Route path="/employee-dashboard/settings" element={<Settings />} />
         
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
export default App