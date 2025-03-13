import { useAuth } from "../context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center h-16 bg-slate-900 text-slate-200 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 px-7">
      <p className="uppercase text-lime-300">
        Dash<span className="text-amber-200">board</span>
      </p>
      <div className="flex items-center gap-1 relative">
        <div className="flex flex-col text-sm justify-end items-end">
          <div>
            <span className="text-yellow-200 font-bold">Hi</span>, {user.name}
          </div>
          <span className="text-sm/[5px] text-lime-600">
            {user && <div>{user.role}</div>}
          </span>
        </div>
        <FaRegUserCircle size={33} className="text-slate-400" />
        <div className="bg-green-500 h-3 w-3 absolute right-0 bottom-5 rounded-full"></div>
      </div>
    </div>
  );
};

export default Navbar;
