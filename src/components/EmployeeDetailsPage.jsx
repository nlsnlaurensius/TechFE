import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import profile from "../assets/employeeProfile.svg";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);

  const formatSalary = useCallback((salary) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(salary);
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsScreenSmall(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/employee/${id}`, employee);
      setEmployee(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8000/employee/${id}`);
        navigate("/home");
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }
  };

  if (error) return <div className="text-white">Error loading employee: {error.message}</div>;
  if (!employee) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-cover bg-no-repeat min-h-screen flex" style={{ backgroundImage: `url(${background})` }}>
      {<DashboardElement />}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 flex justify-center w-full">
        <div className={`bg-white bg-opacity-5 w-[90%] max-w-[750px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col p-8 text-white ${isScreenSmall ? "" : "ml-[500px]"}`}>
          <h1 className="text-3xl text-center font-bold mb-6">Employee Detail Info</h1>
          <img src={profile} alt="Employee profile" className="w-[200px] h-[200px] mx-auto mb-6" />

          {["name", "division", "salary"].map((field) => (
            <motion.div key={field} whileHover={{ scale: 1.02 }} className="mb-6">
              <label className="block ml-5 font-bold text-lg mb-2 capitalize">{field}</label>
              <div className="border border-[#BFBFBF] bg-[#284B4D] rounded-[45px] p-4 mx-4">
                {isEditing ? (
                  <input type={field === "salary" ? "number" : "text"} name={field} value={employee[field]} onChange={handleChange} className="text-lg px-6 bg-transparent w-full outline-none" />
                ) : (
                  <p className="text-lg px-5">{field === "salary" ? formatSalary(employee[field]) : employee[field]}</p>
                )}
              </div>
            </motion.div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={`rounded-[35px] w-[150px] h-[55px] text-xl font-bold ${isEditing ? "border border-white bg-green-600 bg-opacity-70 hover:bg-green-900" : "border border-white bg-opacity-70 bg-cyan-600 hover:bg-cyan-900"}`}
            >
              {isEditing ? "Save" : "Edit"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDelete} className="border border-white bg-opacity-70 bg-red-600 hover:bg-red-900 rounded-[35px] w-[150px] h-[55px] text-xl font-bold">
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
