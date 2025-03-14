import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaRegTimesCircle,
  FaUsers,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import axios from "axios";

const AdminBoard = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => { 
            // setLoading(true)
            try {
                const summary = await axios.get("https://jpems-api.vercel.app/api/dashboard/summary", {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log(summary.data)
                setSummary(summary.data)

            } catch (error) {
                if (error.response.data.error && !error.response.data.success) {
                    alert(error.response.data.error);
                } 
                console.log(error.message)
            } 
        }
        fetchSummary()
        
    }, [])

    if (!summary) {
        return <div className="px-7 bg-slate-900 h-screen">Loading...</div>
    }


  return (
    <div className="px-7 bg-slate-900 h-screen">
      <h2 className="text-xl py-7 text-slate-300">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <SummaryCard
          icon={<FaUsers />}
          text="Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Salaries"
          number={`$${summary.totalSalary}`}
          color="bg-rose-600"
        />
      </div>
      <div className="mt-7 ">
        <h2 className="text-xl pb-5 text-amber-200">Activities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Inquire Applied"
            number={summary.inquireSummary.appliedFor}
            color="bg-cyan-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Inquire Approved"
            number={summary.inquireSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Inquire Pending"
            number={summary.inquireSummary.pending}
            color="bg-purple-600"
          />
          <SummaryCard
            icon={<FaRegTimesCircle />}
            text="Inquire Rejected"
            number={summary.inquireSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};
export default AdminBoard;
