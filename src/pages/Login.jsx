import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TimeLogo from "../assets/logo.png"
import LogoFundi from "../assets/logo-fundi.png"
import Chicken from "../assets/chicken.avif"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const { login } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async (e) => { 
        e.preventDefault()

        try {
            const response = await axios.post("https://jpems-api.vercel.app/api/auth/login",
                {email, password}
            );

            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard")
                } else {
                    navigate("/employee-dashboard")
                }
            }
            
        } catch (error) {
            if (error.response.data.error && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error.")
            }
        }
    }
    
    return (

        <main className="h-screen w-full z-50 bg-slate-900">
            <div className="h-screen">
                {/* Logo */}
                <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between items-center bg-gray-800 pb-5 md:px-7 md:py-4">
                    <div className="flex items-center gap-2">
                        <img src={TimeLogo} alt="logo" width={"30px"} className="object-cover" />
                        <h2>Fundi-Maendeleo</h2>
                    </div>
                    <div>
                        <img src={LogoFundi} alt="main logo" width={"240px"} className="object-cover" />
                    </div>
                </div>

                {/* Welcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center px-4 md:px-12 py-12 md:py-20">
                    <div className="flex flex-col items-center gap-7 py-7 h-full rounded-lg">
                        <h2 className="w-full md:w-3/4 md:text-2xl font-light text-center">
                            Welcome to <span className="text-amber-200">Fundi</span>-<span className="text-rose-300">Maendeleo</span> Farm
                        </h2>
                        {error && <p className="text-red-500 py-1 px-1 bg-red-100 text-sm">{ error }</p>}
                        <form onSubmit={handleSubmit} className="w-full md:w-1/2 m-auto shadow-2xl">
                            <div className="pb-4">
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email..."
                                    required
                                    className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                                />
                            </div>
                            <div className="pb-4">
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password..."
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
                    <div>
                        <img src={Chicken} alt="chicken" className="object-cover w-full rounded-lg shadow-2xl shadow-slate-700" />
                    </div>
                </div>
            </div>
        </main>
        
    )
}

export default Login