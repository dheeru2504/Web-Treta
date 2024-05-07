import employeeModel from '../models/employeeModel.js'



export const createEmployeeController = async (req, res) => {
    console.log("entered create controller")
    try {
        // console.log('getting users')
        const { id, employee_name, employee_salary, employee_age, profile_image } = req.body;
        // console.log("entered controller")
        //validation
        switch (true) {
            case !employee_name:
                return res.status(500).send({ error: "name is Required" });
            case !employee_salary:
                return res.status(500).send({ error: "salary is Required" });
            case !employee_age:
                return res.status(500).send({ error: "age is Required" });

        }

        const employee = new employeeModel({ ...req.body });

        await employee.save();
        console.log(employee);
        res.status(200).send({
            success: true,
            message: "Employee Created Successfully",
            employee,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating User",
        });
    }
}


// //Get  Users
export const getemployeeController = async (req, res) => {
    try {

        // console.log("first")
        const employees = await employeeModel.find();
        // .sort({ createdAt: -1 });


        // console.log(employees)
        res.status(200).send({
            success: true,
            message: "All Employees",
            employees,

        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting employees",
            error: error.message,
        });
    }
};


// Function to dynamically sort and filter employees based on validated query parameters from the frontend
export const sortAndFilterEmployees = async (req, res) => {
    try {
        // Fetch the sort criteria from the query parameter
        const sortBy = req.query.sortBy || 'first_name'; // Default to 'firstName'
        const sortOrder = 1;  // Default to ascending

        // Prepare the sorting object for MongoDB
        let sortObject = {};
        if (['first_name', 'last_name'].includes(sortBy)) {
            // For name-based sorting, we will sort in memory using JavaScript
            // We default to sorting by employee_name first to ensure data is consistently ordered before splitting and sorting
            sortObject.employee_name = 1;
        } else if (sortBy === 'salary') {
            // Directly use MongoDB to sort by salary
            sortObject.employee_salary = sortOrder;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid sort field specified"
            });
        }

        // Fetch employees sorted by salary directly from MongoDB
        const employees = await employeeModel.find().sort(sortObject);

        // If sorting by firstName or lastName, apply additional in-memory sorting
        if (['first_name', 'last_name'].includes(sortBy)) {
            employees.sort((a, b) => {
                // Split names into first and last names
                const nameA = a.employee_name.split(" ");
                const nameB = b.employee_name.split(" ");
                const firstNameA = nameA[0];
                const lastNameA = nameA[nameA.length - 1];
                const firstNameB = nameB[0];
                const lastNameB = nameB[nameB.length - 1];

                if (sortBy === 'last_name') {
                    return sortOrder * lastNameA.localeCompare(lastNameB);
                } else {
                    return sortOrder * firstNameA.localeCompare(firstNameB);
                }
            });
        }

        // Send the sorted list of employees
        res.status(200).json({
            success: true,
            message: `Employees sorted successfully by ${sortBy}`,
            employees
        });
    } catch (error) {
        console.error('Error sorting employees:', error);
        res.status(500).send({
            success: false,
            message: 'Error sorting employees',
            error: error.message
        });
    }
};

// //delete user
export const deleteEmployeeController = async (req, res) => {
    // console.log("entered delete controller")

    try {
        const result = await employeeModel.findOneAndDelete({ _id: req.params._id })


        if (!result) {
            // No employee found with the given ID, or already deleted
            return res.status(404).send({
                success: false,
                message: "Employee not found or already deleted",
            });
        }

        res.status(200).send({
            success: true,
            message: "user Deleted successfully",
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting user",
            error,
        });
    }
};

// Function to search for employees based on multiple fields
export const searchEmployees = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};

        // Add name search to query if provided
        if (name) {
            // Use regex for partial match and case insensitivity
            query.employee_name = { $regex: new RegExp(name, 'i') };
        }


        // Fetch employees from the database based on the constructed query
        const employees = await employeeModel.find(query);

        // Send a 200 OK response along with the found employees
        res.status(200).send({
            success: true,
            message: "Employees found successfully",
            employees
        });
    } catch (error) {
        // Log the error and send a 500 Internal Server Error response
        console.error("Error searching for employees:", error);
        res.status(500).send({
            success: false,
            message: "Error in searching for employees",
            error: error.message
        });
    }
};
