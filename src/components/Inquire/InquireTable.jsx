import { useEffect, useState } from "react"
import axios from "axios";
import { InquireButtons } from "../../utils/ActionButtons";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/InquireTableCol";

const InquireTable = () => {
    const [inquire, setInquire] = useState(null);
    const [filteredInquire, setFilteredInquire] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => { 
        const fetchInquires = async () => { 
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:3001/api/inquire", {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
    
                if (response.data.success) {
                    // console.log(response.data)
                    let sno = 1;
                    const data = await response.data.inquires.map((inquire) => (
                        {
                            _id: inquire._id,
                            sno: sno++,
                            employeeId: inquire.employeeId.employeeId,
                            name: inquire.employeeId.userId.name,
                            inquireType: inquire.inquireType,
                            depart: inquire.employeeId.department.depart,
                            days: new Date(inquire.endDate).getDate() - new Date(inquire.startDate).getDate(),
                                status: inquire.status,
                                action: (<InquireButtons _id={inquire._id} />)
                        }
                    ))
                    setInquire(data);
                    setFilteredInquire(data);
                }
                
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                
            } finally {
                setLoading(false)
            }
        }
        fetchInquires()
    }, [])

    const filterByInput = (e) => {
        const data = inquire.filter((inquiry) => inquiry.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredInquire(data);
    }

    const filterByButton = (status) => {
        const data = inquire.filter((inquiry) => inquiry.status.toLowerCase().includes(status.toLowerCase()))
        setFilteredInquire(data);
    }
    
    // console.log("From table:", inquire);

    return (
        <>
            {(loading || filteredInquire === null) ? <div className="px-7 bg-slate-900 h-screen">Loading...</div> : 
            <div className="px-7 bg-slate-900 h-screen">
                <div>
                    <h2 className="text-xl py-7 text-slate-300">Inquiries</h2>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by emp ID"
                        className="bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                        onChange={filterByInput}
                    />
                    <div className="text-lg">
                            <button className="border-2 border-slate-500 bg-slate-500 py-1 px-3 rounded-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                                onClick={filterByInput}
                            >
                            All
                        </button>
                            <button className="border-2 border-slate-500 bg-slate-500 py-1 px-3 ml-3 rounded-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                                onClick={() => filterByButton("Pending")}
                            >
                            Pending
                        </button>
                            <button className="border-2 border-slate-500 bg-slate-500 py-1 px-3 mx-2 rounded-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                                onClick={() => filterByButton("Approved")}
                            >
                            Approved
                        </button>
                            <button className="border-2 border-slate-500 bg-slate-500 py-1 px-3 rounded-lg shadow-2xl hover:bg-slate-600 hover:border-slate-600"
                                onClick={() => filterByButton("Rejected")}
                            >
                            Rejected
                        </button>
                    </div>
                </div>
                
                <div className="my-3">
                    <DataTable columns={columns} data={filteredInquire} pagination/>
                </div>
            </div>
            }
        </>
    )
}
export default InquireTable