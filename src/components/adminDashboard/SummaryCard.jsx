const SummaryCard = ({ icon, text, number, color }) => {
    return (
        <div className="rounded flex bg-slate-300 text-slate-800 shadow-2xl">
            <div
                className={`text-3xl flex justify-center items-center ${color} text-slate-200 px-4`}
            >{icon}</div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">{ text }</p>
                <p className="text-lg font-bold">{ number }</p>
            </div>
        </div>
    )
}
export default SummaryCard