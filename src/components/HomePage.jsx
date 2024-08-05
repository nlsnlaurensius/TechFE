import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import userTieIcon from "../assets/userTie.svg";
import searchIcon from "../assets/search.svg";

const SearchByDropdown = ({ searchBy, setSearchBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full md:w-48 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full p-3 px-5 rounded-full text-techno-white bg-white bg-opacity-20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-between"
      >
        <span>{searchBy === "name" ? "Search by Name" : "Search by Division"}</span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-2 bg-techno-dark-green bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg z-50 overflow-hidden">
          {["name", "division"].map((option) => (
            <li
              key={option}
              className={`cursor-pointer p-3 transition-colors duration-200 hover:bg-techno-green hover:bg-opacity-50 ${
                searchBy === option ? "bg-techno-green bg-opacity-70 text-white" : "text-techno-white"
              }`}
              onClick={() => {
                setSearchBy(option);
                setIsOpen(false);
              }}
            >
              Search by {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/");
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsScreenSmall(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchEmployees();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) setUser(userInfo);
  }, [fetchEmployees]);

  useEffect(() => {
    const filtered = employees.filter(employee => 
      employee[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, searchBy, employees]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative min-h-screen flex">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="relative z-10 flex w-full">
        <DashboardElement />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white bg-opacity-5 rounded-[35px] backdrop-blur-[10px] flex-grow overflow-hidden
            ${isScreenSmall ? 'p-4 m-4' : 'p-8 ml-[400px] m-10'}`}
        >
          <motion.div
            className="text-white w-full mx-auto backdrop-blur-[10px] my-5 rounded-2xl flex flex-col items-center justify-center p-6 relative z-30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Employee Directory</h1>
            <div className="flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4 w-full max-w-2xl relative z-30">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-full p-3 pl-10 rounded-full text-techno-white bg-white bg-opacity-20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <img 
                  src={searchIcon} 
                  alt="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>
              <SearchByDropdown searchBy={searchBy} setSearchBy={setSearchBy} />
            </div>
          </motion.div>
          <div className="relative z-20">
            <AnimatePresence>
              {filteredEmployees.map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="relative mx-2 md:mx-10 my-4 p-4 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#284B4D] to-[#FFDC83]/50 opacity-30" />
                    <div className="relative z-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <img src={userTieIcon} alt="User" className="w-10 h-10 mr-4" />
                        <div>
                          <p className="text-xl md:text-2xl truncate">{employee.name}</p>
                          <p className="text-sm md:text-base opacity-80 truncate">{employee.division}</p>
                        </div>
                      </div>
                      {user && (
                        <Link to={`/employee/${employee.id}`} className="ml-auto mt-2 md:mt-0">
                          <button className="bg-opacity-70 bg-techno-green hover:bg-techno-dark-green rounded-full py-1.5 px-3 text-xs md:text-xl font-bold transition duration-300">
                            View Details
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
