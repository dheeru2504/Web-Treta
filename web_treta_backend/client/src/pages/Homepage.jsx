import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";

const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [sortCriterion, setSortCriterion] = useState(""); // Default sorting by name

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors
      const { data } = await axios.get(
        "http://localhost:5050/api/employee/get-employees"
      );

      setEmployees(data.employees);
      setIsLoading(false); // Stop loading
      // console.log(data);
      // console.log("first");

      // console.log(data.employees);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again."); // Set error message
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to split the full name into first and last names
  const splitName = (fullName) => {
    const parts = fullName.trim().split(" ");
    const lastName = parts.pop(); // removes last element and returns it
    const firstName = parts.join(" "); // join the remaining parts which could be the first and middle names
    return { firstName, lastName };
  };

  // Handle search input changes and fetch data based on search
  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    if (!searchValue.trim()) {
      fetchData(); // Fetch all data if the search is cleared or only space characters
      return; // Exit if no search term is provided
    }
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const { data } = await axios.get(
        "http://localhost:5050/api/employee/search",
        {
          params: { name: searchValue },
        }
      );
      // console.log(searchValue);
      setEmployees(data.employees); // Update with searched data
      setIsLoading(false); // Stop loading
      // console.log(employees);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError("Failed to search. Please try again."); // Set error message
      setIsLoading(false); // Stop loading
    }
  };

  const handleFilterChange = (e) => {
    setSortCriterion(e.target.value);
  };

  useEffect(() => {
    if (!sortCriterion) return; // Avoid fetching if sortCriterion is not set

    setIsLoading(true);
    setError(null);

    const fetchDataSorted = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5050/api/employee/sortfilter",
          {
            params: { sortBy: sortCriterion },
          }
        );
        setEmployees(data.employees);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sorted data:", error);
        setError("Failed to sort. Please try again.");
        setIsLoading(false);
      }
    };

    fetchDataSorted();
  }, [sortCriterion]); // Effect runs when sortCriterion changes

  const deleteEmployee = async (_id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `http://localhost:5050/api/employee/delete-employee/${_id}`
      );
      if (data.success) {
        // Filter out the employee from the list
        const updatedEmployees = employees.filter(
          (employee) => employee._id !== _id
        );
        setEmployees(updatedEmployees);
        setIsLoading(false);
      } else {
        setError("Failed to delete the employee.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete the employee.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-24 mt-24 flex align-middle">
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search employees..."
            className="border-1 p-1 border-gray-200 rounded-md"
          />
        </div>

        <div className="">
          <form>
            <label className="mx-3 cursor-pointer ">
              <input
                type="radio"
                value="first_name"
                checked={sortCriterion === "first_name"}
                onChange={handleFilterChange}
                className="mx-2"
              />
              First_Name
            </label>
            <label className="mx-3 cursor-pointer">
              <input
                type="radio"
                value="last_name"
                checked={sortCriterion === "last_name"}
                onChange={handleFilterChange}
                className="mx-2"
              />
              Last_Name
            </label>
            <label className="mx-3 cursor-pointer">
              <input
                type="radio"
                value="salary"
                checked={sortCriterion === "salary"}
                onChange={handleFilterChange}
                className="mx-2"
              />
              Salary
            </label>
          </form>
        </div>
        <div className="mx-20">
          <Link
            to="/add_employee"
            className="border-2 p-1 bg-yellow-300 rounded-md text-white font-bold  relative "
          >
            Add Employee
          </Link>
        </div>
      </div>
      <div className="m-24 ">
        {isLoading ? (
          <p>Loading...</p> // Show loading status
        ) : error ? (
          <p>{error}</p> // Show error message
        ) : (
          <div className="border-2">
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Salary</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const { firstName, lastName } = splitName(
                    employee.employee_name
                  );
                  return (
                    <tr key={employee._id}>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>${employee.employee_salary}</td>
                      <td>{employee.employee_age}</td>
                      <td>
                        <button
                          onClick={() => deleteEmployee(employee._id)}
                          className="border-1 rounded-md bg-red-700 p-1 text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
