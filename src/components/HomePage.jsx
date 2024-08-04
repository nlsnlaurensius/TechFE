import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/");
      setEmployees(response.data);
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
            className="text-white w-full mx-auto backdrop-blur-[10px] my-5 rounded-2xl flex items-center justify-center h-[50px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl">
              {user ? "Click to View Employee Detail" : "Please log in to view employee details"}
            </p>
          </motion.div>
          <AnimatePresence>
            {employees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative mx-2 md:mx-10 h-[70px] my-4 p-3 font-bold rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#284B4D] to-[#FFDC83]/50 opacity-30" />
                  <div className="relative z-10 text-white text-2xl md:text-3xl p-3">
                    {user ? (
                      <Link to={`/employee/${employee.id}`} className="block">
                        <p>{employee.name}</p>
                      </Link>
                    ) : (
                      <p>{employee.name}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
