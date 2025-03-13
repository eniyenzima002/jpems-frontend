import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddInquire = () => {
    const { user } = useAuth();
    // add a comment here
    const [inquire, setInquire] = useState({
        userId: user._id,
    });
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquire((prevState) => ({ ...prevState, [name]: value }));
    }
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/inquire/add", inquire, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                navigate(`/employee-dashboard/inquires/${user._id}`)
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
        <div className="px-7 bg-slate-900 h-screen">
            <div className="text-xl py-7 text-slate-300 border-b">
                <p>Hi  <span className="text-sm">{ user.name }</span>,</p>
                <p>Role: <span className="text-xs text-amber-200 capitalize">{ user.role }</span></p>
                <h2 className="text-sm">Please, add an Inquire</h2>
            </div>
            {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
            <form
                onSubmit={handleSubmit}
                className="w-full lg:w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-2 m-auto my-2 py-5 shadow-2xl"
              >

                <div className="pb-4 col-span-2">
                    <div className="pb-2 text-sm">Employee</div>
                    <select 
                        name="inquireType"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    >
                        <option value="">Select Type</option>
                        <option value="Sick">Sick</option>
                        <option value="Personal">Personal</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Resign">Resign</option>
                        <option value="Funds">Funds</option>
                        <option value="Work">Work</option>
                        <option value="Food">Food</option>
                        <option value="Recommendation">Recommendation</option>
                    </select>
                </div>
                
                <div className="pb-4">
                    <div className="pb-2 text-sm">When It Begins</div>
                    <input 
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        placeholder="Enter pay day..."
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                    <div className="pb-2 text-sm">When it Ends</div>
                    <input 
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        placeholder="Enter pay day..."
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4 col-span-2">
                <div className="pb-2 text-sm">Reason</div>
                    <textarea 
                        name="reason" 
                        onChange={handleChange}
                        placeholder="Description..."
                        className="w-full bg-transparent p-2 text-sm focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        rows="4"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="border-2 col-span-2 border-slate-500 bg-slate-900 hover:bg-slate-800 w-full p-1 rounded-lg text-slate-300 text-lg shadow-2xl shadow-teal-700"
                > 
                    Submit
                </button>

            </form>
        </div>
    )
}
export default AddInquire