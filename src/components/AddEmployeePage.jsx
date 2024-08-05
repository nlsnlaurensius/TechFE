import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const handleAddEmployee = async () => {
    setError("");

    if (!name || !division || !salary) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(salary) || Number(salary) <= 0) {
      setError("Salary must be a positive number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/employee/add", {
        name,
        division,
        salary,
      });
      console.log("Employee added:", response.data);
      setNotification(`Added ${name} as an Employee`);
      setName("");
      setDivision("");
      setSalary("");

      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("There was an error adding the employee:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      setUser(null);
    } else {
      setUser(userInfo);
    }
  }, []);

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
      <div className={`bg-white bg-no-repeat bg-opacity-5 w-[90%] max-w-[600px] h-[550px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white ${isScreenSmall ? '' : 'ml-[600px]'}`}>
        <AnimatePresence>
          {notification && (
            <motion.div
              className="bg-techno-gold text-white text-center mt-5 p-2 px-4 rounded-[5px] fixed top-5 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {notification}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="bg-red-600 text-white text-center mt-5 p-2 px-4 rounded-[5px] fixed top-5 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {!user ? (
          <div className="flex flex-col justify-center items-center h-full mt-10">
            <motion.p
              className="text-xl md:text-2xl text-white font-bold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Please log in to add an employee
            </motion.p>
          </div>
        ) : (
          <>
            <p className="text-4xl justify-center text-center mx-auto mt-10 font-bold">Add New Employee</p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center mt-10">
              <AnimatePresence>
                <motion.div
                  className="mb-6 relative w-[90%] max-w-[450px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-white"
                    placeholder="Name"
                    required
                  />
                  <i className="absolute left-3 top-1/2 transform -translate-y-1/2 fas fa-user text-white"></i>
                </motion.div>

                <motion.div
                  className="mb-6 relative w-[90%] max-w-[450px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    id="division"
                    type="text"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="bg-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-white"
                    placeholder="Division"
                    required
                  />
                  <i className="absolute left-3 top-1/2 transform -translate-y-1/2 fas fa-building text-white"></i>
                </motion.div>

                <motion.div
                  className="mb-6 relative w-[90%] max-w-[450px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    id="salary"
                    type="text"
                    value={salary}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSalary(value);
                      }
                    }}
                    className="bg-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-white"
                    placeholder="Salary (Rupiah)"
                    required
                  />
                  <i className="absolute left-3 top-1/2 transform -translate-y-1/2 fas fa-money-bill text-white"></i>
                </motion.div>
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={handleAddEmployee}
                className="bg-techno-gold p-2 px-6 rounded-[45px] w-[90%] max-w-[450px] h-[55px] mb-3 hover:bg-techno-dark-gold transition-colors text-xl font-bold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4 }}
              >
                Add
              </motion.button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
