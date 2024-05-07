import React, { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    employee_name: "",
    employee_salary: "",
    employee_age: "",
    profile_image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5050/api/employee/create-employee",
        employeeData
      );
      alert("Employee added successfully!");
      setEmployeeData({
        employee_name: "",
        employee_salary: "",
        employee_age: "",
        profile_image: "",
      });
    } catch (error) {
      console.error("Failed to add employee:", error);
      setError("Failed to add employee. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="m-24">
        {error && <p className="error">{error}</p>}
        <div className="flex justify-center m-4">
          <h1>Add Employee</h1>
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="m-2">
              <label>
                Name:
                <input
                  type="text"
                  name="employee_name"
                  value={employeeData.employee_name}
                  onChange={handleChange}
                  required
                  className=" p-1 m-1"
                  placeholder="Name"
                />
              </label>
            </div>

            <div className="m-2">
              <label>
                Salary:
                <input
                  type="number"
                  name="employee_salary"
                  value={employeeData.employee_salary}
                  onChange={handleChange}
                  required
                  className=" p-1 m-1"
                  placeholder="Salary"
                />
              </label>
            </div>
            <div className="m-2">
              <label>
                Age:
                <input
                  type="number"
                  name="employee_age"
                  placeholder="Age"
                  value={employeeData.employee_age}
                  onChange={handleChange}
                  required
                  className=" p-1 m-1"
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="border-1 p-1 bg-blue-400 text-white rounded-md m-5"
              >
                {isLoading ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
