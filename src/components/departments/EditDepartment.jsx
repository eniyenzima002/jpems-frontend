import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const EditDepartment = () => {
    const { id } = useParams();
    const [departments, setDepartments] = useState([]);
    const [editDepartLoading, setEditDepartLoading] = useState(false)
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const fetchDepartments = async () => { 
            setEditDepartLoading(true)

            try {
                const response = await axios.get(`https://jpems-api.vercel.app/api/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    setDepartments(response.data.department)
                }
                
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                
            } finally {
                setEditDepartLoading(false)
            }
        }

        fetchDepartments()
    }, [id])

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartments({ ...departments, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/api/department/${id}`, departments, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch ( error ) {
            if (error.response.data.error && !error.response.data.success) {
                alert(error.response.data.error);
            } 
        }
    }

    return (
        <>{editDepartLoading ? <div>Loading...</div> : 
            <div className="flex flex-col items-center gap-4 h-screen bg-slate-900">
                <div className="w-full md:w-1/2 m-auto my-12 border-b">
                    <h2 className="pb-2">Hi, <span className="capitalize">{ user.name }</span></h2>
                    <h2>Role: <span className="text-sm text-yellow-400">{ user.role }</span></h2>
                    <p className="text-sm font-light py-2">Welcome, this page serves to edit a department.</p>
                </div>
                <div className="w-full md:w-1/2 m-auto my-0">Please, edit.</div>
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
                            value={departments.depart}
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
                            value={departments.description}
                            onChange={handleChange}
                            className="w-full bg-transparent p-2 text-sm focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                            rows="6"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="border-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                    > 
                        Edit
                    </button>

                </form>
            </div>
        }</>
    )
}
export default EditDepartment