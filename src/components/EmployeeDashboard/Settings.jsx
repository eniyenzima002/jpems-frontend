import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (settings.newPassword !== settings.confirmPassword) {
            setError("Password not matched.")
        } else {
            try {
                const response = await axios.put(
                        "http://localhost:3001/api/settings/change-password",
                        settings, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("");

                }

            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    setError(error.response.data.error);
                } else {
                    setError("Server Error.");
                }
            }
        }
    }

    return (
        <div className="h-screen bg-slate-900 text-slate-300">

            {/* Welcome */}
            <div className="">
                <div className="flex flex-col items-center gap-7 py-7 h-full rounded-lg">
                    <h2 className="w-full md:w-3/4 md:text-2xl font-light text-center">
                        Welcome to <span className="text-amber-200">Fundi</span>-<span className="text-rose-300">Maendeleo</span> Farm
                    </h2>
                    {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 m-auto shadow-2xl">
                        <div className="pb-4">
                            <input 
                                type="password" 
                                name="oldPassword"
                                onChange={handleChange}
                                placeholder="Old password..."
                                required
                                className="w-full bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                            />
                        </div>
                        <div className="pb-4">
                            <input 
                                type="password" 
                                name="newPassword"
                                onChange={handleChange}
                                placeholder="New password..."
                                required
                                className="w-full bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                            />
                        </div>
                        <div className="pb-4">
                            <input 
                                type="password" 
                                name="confirmPassword"
                                onChange={handleChange}
                                placeholder="Confirm password..."
                                required
                                className="w-full bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="border-2 border-slate-500 w-full p-1 rounded-lg text-slate-400 text-lg shadow-2xl shadow-teal-700"
                        >
                            Login
                        </button>
                    </form>

                </div>

            </div>
        </div>
    )
}
export default Settings