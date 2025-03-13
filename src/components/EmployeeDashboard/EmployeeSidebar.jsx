import { NavLink } from "react-router-dom";
import { FaCogs, FaFileAlt, FaMoneyBillWave, FaTachometerAlt, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import {useAuth} from "../../context/AuthContext"

const EmployeeSidebar = () => {
    const { logout, user } = useAuth();
    return (
        <div className="bg-slate-900 flex flex-col justify-between text-slate-300 font-light h-screen fixed left-0 top-0 bottom-0 space-y-4 w-64 border-r border-gray-700 bg-opacity-50 backdrop-blur-md shadow-lg">
            <div>
                <div className="h-16 flex items-center justify-start w-full px-5">
                    <h3 className="text-center font-normal uppercase">
                        Fundi <span className="text-rose-200 capitalize">Maeldeleo</span> MS
                    </h3>
                </div>
                <div className="px-4">
                    <NavLink to="/employee-dashboard"
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`} end
                    >
                        <FaTachometerAlt className="text-lime-200 text-xl" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to={`/employee-dashboard/profile/${user._id}`}
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`}
                    >
                        <FaUserTie className="text-purple-500 text-xl" />
                        <span>Profile</span>
                    </NavLink>

                    {/* <NavLink to="/employee-dashboard/leaves"
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`}
                    >
                        <FaBuilding className="text-purple-500 text-xl" />
                        <span>Leaves</span>
                    </NavLink> */}

                    <NavLink to={`/employee-dashboard/inquires/${user._id}`}
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`}
                    >
                        <FaFileAlt className="text-slate-300 text-xl" />
                        <span>Inquire</span>
                    </NavLink>

                    <NavLink to={`/employee-dashboard/salary/${user._id}`}
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`}
                    >
                        <FaMoneyBillWave className="text-green-500 text-xl" />
                        <span>Salary</span>
                    </NavLink>

                    <NavLink to="/employee-dashboard/settings"
                        className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-3 py-2.5 px-4 rounded  text-sm`}
                    >
                        <FaCogs className="text-teal-500 text-xl"/>
                        <span>Settings</span>
                    </NavLink>
                </div>

            </div>
            <div
                className="flex items-center gap-2 py-12 px-4 cursor-pointer text-lime-300 hover:text-lime-500"
            >
                <RiLogoutCircleLine className="text-2xl"/>
                <span className="text-sm" onClick={logout}>Logout</span>
            </div>
        </div>
    )
}
export default EmployeeSidebar