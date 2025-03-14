import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EmployeeActionsButtons } from "../../utils/ActionButtons"
import axios from "axios"
import DataTable from "react-data-table-component"
import { columns } from "../../utils/EmployeeHelper"
import PImage from "../../assets/p.png"

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    const onDeleteEmployee = (id) => {
        const data = employees.filter(employee => employee._id !== id);
        setEmployees(data)
    }

    useEffect(() => {
        const fetchEmployees = async () => { 
            setEmpLoading(true)
            try {
                const response = await axios.get("https://jpems-api.vercel.app/api/employee", {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((employee) => (
                        {
                            _id: employee._id,
                            sno: sno++,
                            depart: employee.department.depart,
                            name: employee.userId.name,
                            dob: new Date(employee.dob).toLocaleDateString(),
                            profileImage: <img src={PImage} className="rounded-full h-12 w-12 object-cover border" />,
                            action: (<EmployeeActionsButtons _id={employee._id} onDeleteEmployee={ onDeleteEmployee } />)
                        }
                    ))
                    setEmployees(data)
                    setFilteredEmployees(data);
                }
                
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                
            } finally {
                setEmpLoading(false)
            }
        }
        fetchEmployees();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEmployeeFilter = (e) => { 
        const records = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredEmployees(records);
    }
    // console.log("From Employee", employees) => `https://jpems-api.vercel.app/${employee.userId.profileImage}`
    return (
        <>
            {empLoading ? <div>Loading...</div> : 
            <div className="px-7 bg-slate-900 h-screen">
                <div>
                    <h2 className="text-xl py-7 text-slate-300">Departments</h2>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search By Dep Name"
                        onChange={handleEmployeeFilter}
                        className="bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                    <Link
                        to="/admin-dashboard/add-employee"
                        className="border-2 border-slate-500 bg-slate-500 py-1 px-3 rounded-lg text-slate-200 text-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                    >Add New Employee</Link>
                    </div>
                    <div className="py-7">
                        <DataTable columns={columns} data={filteredEmployees} pagination />
                    </div>
            </div>
            
            }
        </>
    )
}
export default Employees