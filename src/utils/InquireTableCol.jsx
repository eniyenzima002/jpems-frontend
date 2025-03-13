export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Inquire Type",
        selector: (row) => row.inquireType,
        width: "140px",
    },
    {
        name: "Department",
        selector: (row) => row.depart,
        width: "170px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px",
    },
    {
        name: "ACTIONS",
        selector: (row) => row.action
    },
]