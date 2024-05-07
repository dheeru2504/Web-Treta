import express from "express";
import { createEmployeeController, deleteEmployeeController, getemployeeController, searchEmployees, sortAndFilterEmployees } from "../controllers/employeeControllers.js";


const router = express.Router();


//Create new User
router.post("/create-employee", createEmployeeController);

//get All Users
router.get("/get-employees", getemployeeController);

// //filter all employees
router.get("/sortfilter", sortAndFilterEmployees);

// //get search result
router.get("/search", searchEmployees);

// //delete Users
router.delete("/delete-employee/:_id", deleteEmployeeController);

export default router;