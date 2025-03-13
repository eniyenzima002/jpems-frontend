import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        depart: '',
        description: ''
    })
    const [error, setError] = useState(null)

    const { user } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/department/add", department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
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
        <div className="flex flex-col items-center gap-4 h-screen bg-slate-900">
            <div className="w-full md:w-1/2 m-auto my-12 border-b">
                <h2 className="pb-2">Hi, <span className="capitalize">{ user.name }</span></h2>
                <h2>Role: <span className="text-sm text-yellow-400">{ user.role }</span></h2>
                <p className="text-sm font-light py-2">Welcome, this page serves to add a department.</p>
            </div>
            <div className="w-full md:w-1/2 m-auto my-0">Please, add a department.</div>
            {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-1/2 m-auto my-7 shadow-2xl"
            >
                
                <div className="pb-4">
                    <div className="pb-2 text-sm">Department Name</div>
                    <input 
                        type="text"
                        name="depart"
                        placeholder="Enter Department name..."
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                <div className="pb-2 text-sm">Description</div>
                    <textarea 
                        name="description" 
                        placeholder="Description..."
                        onChange={handleChange}
                        className="w-full bg-transparent p-2 text-sm focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        rows="6"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="border-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                > 
                    Add a Department
                </button>

            </form>
        </div>
    )
}
export default AddDepartment