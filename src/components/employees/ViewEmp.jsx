import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PImage from "../../assets/p.png"

const ViewEmp = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => { 
            // setLoading(true)
            try {
                const response = await axios.get(`/api/employee/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    // console.log("Data", response.data.employee)
                    setEmployee(response.data.employee)
                }
                
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                
            } 
        }

        fetchEmployee()
        
    }, [id])

    return (
        <div  className="px-7 bg-slate-900 h-screen">{employee ? (
            <div className="px-7 bg-slate-900 h-screen">
            <div>
                <h2 className="text-xl py-7 text-slate-300">Employee Details</h2>
            </div>
            <div className="flex shadow-2xl shadow-slate-950 rounded-lg capitalize text-slate-400 font-extralight">
                <div className="border w-1/4 bg-slate-300">
                { employee.userId.profileImage === null ? (
                    <img
                        src={`https://jpems-api.vercel.app/${employee.userId.profileImage}`}
                        className="object-cover w-full h-full"
                    />
                    
                ) : (
                    <img src={PImage} 
                    className="object-cover w-full h-full" />
                )}
                </div>
                <div className="flex-1 border-r border-t border-b rounded-r-lg px-3 py-2">
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Name:</p>
                            <p className="font-medium">{ employee.userId.name }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">ID:</p>
                            <p className="font-medium">{ employee.employeeId }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Date of birth:</p>
                            <p className="font-medium">
                                { new Date(employee.dob).toLocaleDateString() }
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Gender:</p>
                            <p className="font-medium">{ employee.gender }</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-5">
                            <p className="text-lg font-bold">Department:</p>
                            <p className="font-medium">
                                { employee.department.depart }
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Marital Status:</p>
                            <p className="font-medium">{ employee.maritalStatus }</p>
                        </div>
                    </div> 
                </div>
                
            </div>
        </div>
        ) : (<div>Loading...</div>) }</div>

    )
}
export default ViewEmp