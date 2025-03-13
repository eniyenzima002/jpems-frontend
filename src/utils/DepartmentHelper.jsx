export const columns = [
    {
        name: "ID",
        selector: (row) => row.sno
    },
    {
        name: "DEPARTMENT",
        selector: (row) => row.depart,
        sortable: true
    },
    {
        name: "ACTIONS",
        selector: (row) => row.action
    },
]

