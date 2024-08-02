import { useState } from "react";
import DashboardElement from "./elements/DashboardElement";
import axios from "axios";
import background from "../assets/Background.svg";

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  const handleAddEmployee = async () => {
    setError("");
    setNotification("");

    try {
      const response = await axios.post("http://localhost:8000/employee/add", {
        name,
        division,
        salary,
      });

      if (response.status === 200) {
        console.log("Employee added:", response.data);
        setNotification(`Added ${name} as an Employee`);
        setName("");
        setDivision("");
        setSalary("");

        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        throw new Error("Failed to add employee");
      }
    } catch (error) {
      console.error("There was an error adding the employee:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "There was an error adding the employee. Please try again.");
    }
  };

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
      <div className="bg-techno-white bg-opacity-5 w-[600px] h-[550px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white">
        {notification && (
          <div className="bg-techno-gold text-white text-center mt-5 p-2 px-4 rounded-[5px] mx-auto fixed left-1/2 transform -translate-x-1/2 z-50">
            {notification}
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white text-center mt-5 p-2 px-4 rounded-[5px] mx-auto fixed left-1/2 transform -translate-x-1/2 z-50">
            {error}
          </div>
        )}

        <p className="text-[40px] mx-auto mt-10 font-bold">Add New Employee</p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center mt-10">
          <div className="mb-6 relative w-[450px]">
            <label htmlFor="name" className="block text-[20px] mb-2"></label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-techno-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-t-techno-white"
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-6 relative w-[450px]">
            <label htmlFor="division" className="block text-[20px] mb-2"></label>
            <input
              id="division"
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="bg-techno-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-techno-white"
              placeholder="Division"
              required
            />
          </div>

          <div className="mb-6 relative w-[450px]">
            <label htmlFor="salary" className="block text-[20px] mb-2"></label>
            <input
              id="salary"
              type="text"
              value={salary}
              onChange={(e) => {
                // Hanya izinkan input yang berupa angka
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setSalary(value);
                }
              }}
              className="bg-techno-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-4 border border-techno-white"
              placeholder="Salary (Rupiah)"
              required
            />
          </div>

          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={handleAddEmployee}
              className="bg-techno-gold p-2 px-6 rounded-[45px] w-[450px] h-[55px] mb-3 hover:bg-techno-dark-gold transition-colors text-xl font-bold"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
