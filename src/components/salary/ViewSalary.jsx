import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ViewSalary = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);

    let sno = 1;

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`/api/salary/${id}/${user.role}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                // console.log(response.data)
                if (response.data.success) {
                    setSalaries(response.data.salary)
                    setFilteredSalaries(response.data.salary)
                }
            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    
        fetchSalaries()
    }, [id, user.role])

    const filterSalaries = (q) => { 
        const filteredRecords = salaries.filter((leave) => leave.employeeId.toLowerCase().includes(q.toLocaleLowerCase()));
        setFilteredSalaries(filteredRecords);
    }

    return (
        <>
            {filterSalaries === null ? (<div>Loading....</div>) : (
                <div className="px-7 bg-slate-900 h-screen">
                <div>
                    <h2 className="text-xl py-7 text-slate-300">Employee Salary Details</h2>
                </div>
                <div className="flex justify-between items-center pb-3">
                    <input
                        type="text"
                        placeholder="Search By Emp ID"
                        onChange={filterSalaries}
                        className="bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                    
                    </div>
                    
                    {filteredSalaries?.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries?.map((salary) => (
                                    <tr
                                        key={salary._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{ sno++ }</td>
                                        <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                        <td className="px-6 py-3">
                                            ${ salary.baseSalary}
                                        </td>
                                        <td className="px-6 py-3">
                                            ${ salary.allowance}
                                        </td>
                                        <td className="px-6 py-3">${salary.deduction}</td>
                                        <td className="px-6 py-3">${salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            { new Date(salary.payDay).toLocaleDateString()}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <div className="py-3">No Employee records.</div>}
            </div>
            )}
        </>
    )
}
export default ViewSalary