import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmp = () => {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {

        const getDepart = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);

        }

        getDepart()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await axios.post("/api/employee/add", formDataObj, {
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
        <div className="flex flex-col items-center px-10 gap-2 h-screen bg-slate-900 text-slate-300">
            <div className="w-full lg:w-5/6 m-auto my-4 border-b">
                <h2 className="pb-1">Hi, <span className="capitalize">{ user.name }</span></h2>
                <h2>Role: <span className="text-sm text-yellow-400">{ user.role }</span></h2>
                <p className="text-sm font-light py-1">Welcome, this page serves to add employees.</p>
            </div>
            <div className="w-full lg:w-5/6 m-auto my-0">Please, add an employee.</div>
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
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>
                <div className="pb-4">
                    <div className="pb-2 text-sm">Email</div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        onChange={handleChange}
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        required
                    />
                </div>
                <div className="pb-4">
                    <div className="pb-2 text-sm">ID</div>
                    <input 
                        type="text"
                        name="employeeId"
                        placeholder="Enter ID..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>
                <div className="pb-4">
                    <div className="pb-2 text-sm">Date of Birth</div>
                    <input 
                        type="date"
                        name="dob"
                        placeholder="Enter Department name..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>
                <div className="pb-4">
                    <div className="pb-2 text-sm">Gender</div>
                    <select 
                        name="gender"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Marital Status</div>
                    <select 
                        name="maritalStatus"
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
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Department</div>
                    <select 
                        name="department"
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

                <div className="pb-4">
                    <div className="pb-2 text-sm">Salary</div>
                    <input 
                        type="number"
                        name="salary"
                        placeholder="Enter salary..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Password</div>
                    <input 
                        type="password"
                        name="password"
                        placeholder="****************"
                        onChange={handleChange}
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        required
                    />
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Role</div>
                    <select 
                        name="role"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">Upload Image</div>
                    <input 
                        type="file"
                        name="image"
                        placeholder="Upload image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full bg-transparent px-2 pt-1.5 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <button
                    type="submit"
                    className="border-2 col-span-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                > 
                    Add New Employee
                </button>

            </form>
        </div>
    )
}
export default AddEmp