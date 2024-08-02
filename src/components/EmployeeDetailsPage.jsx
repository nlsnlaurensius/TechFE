import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import profile from "../assets/employeeProfile.svg";

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) return <div>Error loading employee: {error.message}</div>;

  if (!employee) return <div>Employee does not exist.</div>;

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
    
        <div className="relative z-10 flex justify-center">
      <div className="bg-[#FFFFFF] bg-opacity-5 w-[850px] h-auto m-10 rounded-[35px] backdrop-blur-[10px] flex flex-col p-8 ml-40 text-white relative ">
      <p className="text-[25px] mx-auto font-sans font-bold">Employee Detail Info</p>
      <img src={profile} className="w-[200px] h-[200px] mx-auto mt-2" />
      <p className="ml-20">Name</p>
      <div className="border border-[#BFBFBF] bg-[#284B4D] text-white rounded-[45px] p-4 w-auto mx-9 mb-4 mt-3"><h1 className="text-[18px]">{employee.name}</h1></div>
      <p className="ml-20">Division</p>
      <div className="border border-[#BFBFBF] bg-[#284B4D] text-white rounded-[45px] p-4 w-auto mx-9 mb-4 mt-3"><p className="text-[18px]">{employee.division}</p></div>
      <p className="ml-20">Salary</p>
      <div className="border border-[#BFBFBF] bg-[#284B4D] text-white rounded-[45px] p-4 w-auto mx-9 mb-4 mt-3"><p className="text-[18px]">{employee.salary}</p></div>
      </div>
    </div>
    </div>

  );
}
