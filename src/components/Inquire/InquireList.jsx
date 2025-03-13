import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const InquireList = () => {
    const [inquiries, setInquiries] = useState([])
    const { id } = useParams();
    const { user } = useAuth();

    let sno = 1;

    useEffect(() => {
        const fetchInquire = async () => {
            try {
                const response = await axios.get(`/api/inquire/${id}/${user.role}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                // console.log("Hello Inquire:", response.data)
                if (response.data.success) {
                    setInquiries(response.data.inquire)
                }
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);

                }
            }
        }

        fetchInquire();

    }, [id, user.role])

    // console.log("Hello Inquire:", inquiries)
    
    return (
        
        <div className="px-7 bg-slate-900 h-screen">
            <div>
                <h2 className="text-xl py-7 text-slate-300">Inquiries</h2>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search inquire"
                    className="bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                />
                {user.role === "employee" && 
                    <Link
                        to="/employee-dashboard/add-inquire"
                        className="border-2 border-slate-500 bg-slate-500 py-1 px-3 rounded-lg text-slate-200 text-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                    >Send New Inquire</Link>  
                }
                
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="px-6 py-3">SNO</th>
                        <th className="px-6 py-3">Inquire</th>
                        <th className="px-6 py-3">Starts</th>
                        <th className="px-6 py-3">Ends</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries?.map((inquire) => (
                        <tr
                            key={inquire._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-3">{ sno++ }</td>
                            <td className="px-6 py-3">{inquire.inquireType}</td>
                            <td className="px-6 py-3">
                                { new Date(inquire.startDate).toLocaleDateString() }
                            </td>
                            <td className="px-6 py-3">{new Date(inquire.endDate).toLocaleDateString()}</td>
                        <td className="px-6 py-3">{`${inquire.reason.slice(0, 50)}...`}</td>
                            <td className="px-6 py-3 text-amber-500">{inquire.status}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}
export default InquireList