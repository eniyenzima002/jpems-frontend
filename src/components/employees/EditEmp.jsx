import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmp = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "", maritalStatus: "", designation: "", salary: 0, department: ""
  });
  const [departments, setDepartments] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
    
  useEffect(() => {

      const getDepart = async () => {
          const departments = await fetchDepartments();
          setDepartments(departments);

      }
      getDepart()

  }, [])

    useEffect(() => {

      const fetchEmployee = async () => { 
        // setLoading(true)
        try {
            const response = await axios.get(`/api/employee/${id}`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })

              // console.log("Data", response.data.employee)
            if (response.data.success) {
              // console.log("Second Data", response.data.employee)

              const employee = response.data.employee;
              setEmployee((prev) => ({
                    ...prev,
                  name: employee.userId.name,
                  maritalStatus: employee.maritalStatus,
                  designation: employee.designation,
                  salary: employee.salary,
                  departments: employee.department
                  
                }))
            }
            
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } 
            
        } 
      }
      
      fetchEmployee()

    
    }, [employee.salary, id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch ( error ) {
            if (error.response.data.error && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error.")
            }
        }
    }

  return (
    <>{departments && employee ? (
        <div className="flex flex-col items-center px-10 gap-2 h-screen bg-slate-900 text-slate-300">
            <div className="w-full lg:w-5/6 m-auto my-4 border-b">
                <h2 className="pb-1">Hi, <span className="capitalize">{ user.name }</span></h2>
                <h2>Role: <span className="text-sm text-yellow-400">{ user.role }</span></h2>
                <p className="text-sm font-light py-1">Welcome, this page serves to edit employees.</p>
            </div>
            <div className="w-full lg:w-5/6 m-auto my-0">Please, edit an employee.</div>
            {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
            <form
                onSubmit={handleSubmit}
                className="w-full lg:w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-2 m-auto my-2 shadow-2xl"
            >
                
                <div className="pb-4">
                    <div className="pb-2 text-sm">Name</div>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter name..."
                        value={employee.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Marital Status</div>
                    <select 
                        name="maritalStatus"
                        value={employee.maritalStatus}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Designation</div>
                    <input 
                        type="text"
                        name="designation"
                        placeholder="Enter designation..."
                        value={employee.designation}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>


                <div className="pb-4">
                    <div className="pb-2 text-sm">Salary</div>
                    <input 
                        type="number"
                        name="salary"
                        placeholder="Enter salary..."
                        value={employee.salary}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>
                
                <div className="pb-4 col-span-2">
                    <div className="pb-2 text-sm">Department</div>
                    <select 
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Department</option>
                        {departments?.map(department => (
                            <option key={department._id} value={ department._id}>{ department.depart}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="border-2 col-span-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                > 
                    Edit Employee
                </button>

            </form>
        </div>
      
      ) : <div>Loading...</div>}</>
    )
}
export default EditEmp