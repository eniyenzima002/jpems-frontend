import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const { user } = useAuth();
  const [salary, setSalary] = useState({
    employeeId: null, baseSalary: 0, allowance: 0, deduction: 0, payDay: null
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
    
  useEffect(() => {

      const getDepart = async () => {
          const departments = await fetchDepartments();
          setDepartments(departments);

      }
      getDepart()

  }, [])
    
    const handleDepartment = async (e) => {
        const emp = await getEmployees(e.target.value);
        setEmployees(emp)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://jpems-api.vercel.app/api/salary/add`, salary, {
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
    <>{departments && salary ? (
        <div className="flex flex-col items-center px-10 gap-2 h-screen bg-slate-900 text-slate-300">
            <div className="w-full lg:w-5/6 m-auto my-4 border-b">
                <h2 className="pb-1">Hi, <span className="capitalize">{ user.name }</span></h2>
                <h2>Role: <span className="text-sm text-yellow-400">{ user.role }</span></h2>
                <p className="text-sm font-light py-1">Welcome, this page serves to add salaries.</p>
            </div>
            <div className="w-full lg:w-5/6 m-auto my-0">Please, add a salary.</div>
            {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
            <form
                onSubmit={handleSubmit}
                className="w-full lg:w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-2 m-auto my-2 shadow-2xl"
              >
                  
                  <div className="pb-4">
                    <div className="pb-2 text-sm">Department</div>
                    <select 
                        name="department"
                        onChange={handleDepartment}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Department</option>
                        {departments?.map(department => (
                            <option key={department._id} value={ department._id}>{ department.depart}</option>
                        ))}
                    </select>
                  </div>

                  {/* employee */}
                <div className="pb-4">
                    <div className="pb-2 text-sm">Employee</div>
                    <select 
                          name="employeeId"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Employee</option>
                        {employees?.map(emp => (
                            <option key={emp._id} value={ emp._id}>{ emp.employeeId}</option>
                        ))}
                    </select>
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Base salary</div>
                    <input 
                        type="number"
                        name="baseSalary"
                        placeholder="Enter base salary..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>


                <div className="pb-4">
                    <div className="pb-2 text-sm">Allowance</div>
                    <input 
                        type="number"
                        name="allowance"
                        placeholder="Enter allowance..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                 </div>
                  
                <div className="pb-4">
                    <div className="pb-2 text-sm">Deduction</div>
                    <input 
                        type="number"
                        name="deduction"
                        placeholder="Enter Deduction..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>
                
                <div className="pb-4">
                    <div className="pb-2 text-sm">Pay day</div>
                    <input 
                        type="date"
                        name="payDay"
                        placeholder="Enter pay day..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <button
                    type="submit"
                    className="border-2 col-span-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                > 
                    Add Salary
                </button>

            </form>
        </div>
      
      ) : <div>Loading...</div>}</>
    )
}
export default AddSalary