import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardElement from "./elements/DashboardElement";

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
    <div className="bg-[#CED1DA] flex h-screen">
        <DashboardElement />
      <div className="m-auto bg-[#798DC5] w-[622px] h-[675px] rounded-2xl flex flex-col text-white p-8">
        <h1 className="text-[30px] mb-8">{employee.name}</h1>
        <p className="text-[20px] mb-4">Division: {employee.division}</p>
        <p className="text-[20px]">Salary: {employee.salary}</p>
      </div>
    </div>
  );
}
