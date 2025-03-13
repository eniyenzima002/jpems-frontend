import axios from "axios";

export const fetchDepartments = async () => { 

    let departments;

    try {
        const response = await axios.get("http://localhost:3001/api/department", {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.data.success) {
            return departments = response.data.departments
        }
        
    } catch (error) {
        if (error.response.data.error && !error.response.data.success) {
            alert(error.response.data.error);
        } 
        
    }

    return departments;

}

export const getEmployees = async (id) => { 

    let employees;

    try {
        const response = await axios.get(`http://localhost:3001/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })

        // console.log(response)
        if (response.data.success) {
            employees = response.data.employees
        }
        
    } catch (error) {
        if (error.response.data.error && !error.response.data.success) {
            alert(error.response.data.error);
        } 
        
    }

    return employees;

}

export const columns = [
    {
        name: "ID",
        selector: (row) => row.sno,
        width: "100px"
    },
    {
        name: "NAME",
        selector: (row) => row.name,
        sortable: true,
        width: "200px",
    },
    {
        name: "IMAGE",
        selector: (row) => row.profileImage,
        width: "120px",
    },
    {
        name: "DEPARTMENT",
        selector: (row) => row.depart,
        width: "200px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "200px",
    },
    {
        name: "ACTIONS",
        selector: (row) => row.action,
    },
]
