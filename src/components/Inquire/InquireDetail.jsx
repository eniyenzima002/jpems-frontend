import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import PImage from "../../assets/p.png"

const InquireDetail = () => {
    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null)
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquire = async () => { 
            // setLoading(true)
            try {
                const response = await axios.get(`/api/inquire/detail/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    // console.log("From response", response.data.inquire)
                    setInquiry(response.data.inquire)
                }
                
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                
            } 
        }

        fetchInquire()
        
    }, [id])

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`/api/inquire/${id}`, { status }, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.data.success) {
                navigate("/admin-dashboard/inquires")
            }
            
        } catch (error) {
            if (error.response.data.error && !error.response.data.success) {
                alert(error.response.data.error);
            } 
            
        } 
    }

    
    return (
        <>{inquiry ? (
            <div className="px-7 bg-slate-900 h-screen">
            <div>
                <h2 className="text-xl py-7 text-slate-300">Inquire Details</h2>
            </div>
            <div className="flex shadow-2xl shadow-slate-950 rounded-lg capitalize text-slate-400 font-extralight">
                <div className="border w-1/3 lg:w-1/4 bg-slate-300">
                { inquiry.employeeId.userId.profileImage === null ? (
                    <img
                        src={`https://jpems-api.vercel.app/${inquiry.employeeId.userId.profileImage}`}
                        className="object-cover w-full h-full"
                    />
                    
                ) : (
                    <img src={PImage} 
                    className="object-cover w-full h-full" />
                )}
                </div>
                <div className="flex-1 border-r border-t border-b rounded-r-lg px-3 py-2">
                    <div>
                        <div className="flex space-x-3 items-center mb-5">
                            <p className="text-lg font-bold">Name:</p>
                            <p className="font-medium">{ inquiry.employeeId.userId.name }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 items-center mb-5">
                            <p className="text-lg font-bold">ID:</p>
                            <p className="font-medium">{ inquiry.employeeId.employeeId }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 items-center mb-5">
                            <p className="text-lg font-bold">Inquire Type:</p>
                            <p className="font-medium">
                                { inquiry.inquireType }
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Reason:</p>
                            <p className="font-medium">{  inquiry.reason }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 items-center mb-5">
                            <p className="text-lg font-bold">Department:</p>
                            <p className="font-medium">
                                { inquiry.employeeId.department.depart }
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 items-center">
                            <p className="text-lg font-bold">Start Date:</p>
                            <p className="font-medium">{ new Date(inquiry.startDate).toLocaleDateString() }</p>
                        </div>
                    </div> 
                    <div>
                        <div className="flex space-x-3 items-center">
                            <p className="text-lg font-bold">End Date:</p>
                            <p className="font-medium">{ new Date(inquiry.endDate).toLocaleDateString() }</p>
                        </div>
                    </div> 
                    <div className="mt-2">
                        <div className="flex space-x-3 font-normal items-center">
                            <p className="text-lg text-amber-300 font-bold">
                                {inquiry.status === "Pending" ? "Action:" : "Status:"}
                            </p>
                            {inquiry.status === "Pending" ? (
                                <div>
                                        <button
                                            className="border-2 border-teal-500 py-1 px-2 rounded-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600 mr-3"
                                            onClick={() => changeStatus(inquiry._id, "Approved")}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="border-2 border-red-500 py-1 px-3 rounded-lg shadow-2xl hover:bg-red-500 text-gray-200"
                                            onClick={() => changeStatus(inquiry._id, "Rejected")}
                                        >
                                            Reject
                                        </button>      
                                </div>
                            ) : (
                                <p className="font-medium">{ inquiry.status }</p>
                            )}
                        </div>
                    </div> 
                </div>
                
            </div>
        </div>
        ) : (<div>Loading...</div>) }</>

    )
}
export default InquireDetail