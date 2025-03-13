import { FaUser } from "react-icons/fa"
import { useAuth } from "../../context/AuthContext"

const SummaryCard = () => {
    const { user } = useAuth();

    return (
        <div className="rounded flex bg-slate-300 text-slate-800 shadow-2xl">
            <div
                className={`text-3xl flex justify-center items-center bg-teal-600 text-slate-200 px-4`}
            >
                <FaUser />
            </div>
            <div className="pl-4 py-1 font-serif">
                <p className="text-lg font-bold">Hi { user.name },</p>
                <p className="text-2xl text-teal-800 font-semibold">Welcome back!</p>
            </div>
        </div>
    )
}
export default SummaryCard