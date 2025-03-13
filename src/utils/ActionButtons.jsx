import axios from "axios";
import { FaRegEdit, FaRegTrashAlt, FaMoneyBillWave, FaEye } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const DepartmentActionsButtons = ({ _id, onDeleteDepart }) => {
    const navigate = useNavigate();

    
    
    const handleDelete = async (id) => {
        const confirm = window.confirm("Delete! Are you sure?");

        if (confirm) {
                try {
                    const response = await axios.delete(`http://localhost:3001/api/department/${id}`, {
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    })
        
                    if (response.data.success) {
                        onDeleteDepart()
                        // window.location.reload()
                    }
                    
                } catch (error) {
                    if (error.response.data.error && !error.response.data.success) {
                        alert(error.response.data.error);
                    } 
                    
            }

        }
    }

    // useEffect(() => {
    //     handleDelete()
        
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [handleDelete()])

    return (
        <div className="flex space-x-3">
            <button
                className="bg-cyan-600 px-4 py-2 rounded text-slate-100"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                <FaRegEdit />
            </button>
            <button
                className="px-4 py-2 rounded text-slate-100 bg-red-600"
                onClick={() => handleDelete(_id)}
            >
                <FaRegTrashAlt />
            </button>
        </div>
    )
}

// EMPLOYEE BUTTONS
export const EmployeeActionsButtons = ({ _id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-4 py-2 rounded text-slate-100 bg-amber-600"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >
                <FaEye />
            </button>

            <button
                className="bg-cyan-600 px-4 py-2 rounded text-slate-100"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
            >
                <FaRegEdit />
            </button>

            <button
                className="px-4 py-2 rounded text-slate-100 bg-green-600"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
            >
                <FaMoneyBillWave />
            </button>

            <button
                className="px-3 py-1 rounded text-slate-100 bg-rose-600 text-xl"
                onClick={() => navigate(`/admin-dashboard/employees/inquire/${_id}`)}
            >
                <TbUserQuestion />
            </button>

        </div>
    )
}

// INQUIRES BUTTONS
export const InquireButtons = ({ _id }) => {
    const navigate = useNavigate();

    const handleInquireView = (id) => {
        navigate(`/admin-dashboard/inquire/${id}`)
    }

    return (
        <div className="flex space-x-3">
            <button
                className="px-4 py-2 rounded text-slate-100 bg-amber-600"
                onClick={() => handleInquireView(_id)}
            >
                <FaEye />
            </button>

            
            {/* <button
                className="px-4 py-2 rounded text-slate-100 bg-red-600"
                onClick={() => handleDelete(_id)}
            >
                <FaRegTrashAlt />
            </button> */}

        </div>
    )
}