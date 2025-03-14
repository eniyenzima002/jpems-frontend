import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"
import { columns } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios"
import { DepartmentActionsButtons } from "../../utils/ActionButtons";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDeleteDepart = () => {
        fetchDepartments();
    }

    const fetchDepartments = async () => { 
        setDepLoading(true)
        try {
            const response = await axios.get("https://jpems-api.vercel.app/api/department", {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.data.success) {
                let sno = 1;
                const data = await response.data.departments.map((department) => (
                    {
                        _id: department._id,
                        sno: sno++,
                        depart: department.depart,
                        action: (<DepartmentActionsButtons _id={department._id} onDeleteDepart={ onDeleteDepart } />)
                    }
                ))
                setDepartments(data)
                setFilteredDepartments(data);
            }
            
        } catch (error) {
            if (error.response.data.error && !error.response.data.success) {
                alert(error.response.data.error);
            } 
            
        } finally {
            setDepLoading(false)
        }
    }

    useEffect(() => {
        fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filterDepartments = (e) => { 
        const records = departments.filter((dep) => dep.depart.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredDepartments(records);
    }
    
    return (
        <> {depLoading ? <div>Loading...</div> : 

            <div className="px-7 bg-slate-900 h-screen">
                <div>
                <h2 className="text-xl py-7 text-slate-300">Departments</h2>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search By Dep Name"
                        className="bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        onChange={filterDepartments}
                    />
                    <Link
                        to="/admin-dashboard/add-department"
                        className="border-2 border-slate-500 bg-slate-500 py-1 px-3 rounded-lg text-slate-200 text-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                    >Add New Department</Link>
                </div>

                <div className="mt-7 rounded shadow-2xl">
                    <DataTable columns={columns} data={filteredDepartments} pagination />
                </div>
            </div>
        }
        </>
    )
}
export default Departments