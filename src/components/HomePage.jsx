import DashboardElement from "./elements/DashboardElement";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../assets/Background.svg";
import backgrounddark from "../assets/background-dark.svg"

export default function HomePage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const handleHomePage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee/");
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleHomePage();
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []); // biar dapet user info dari local storage

  return (
    <div className="bg-[#CED1DA] flex">
      <DashboardElement />
      <div className="bg-[#798DC5] w-[1400px] h-[841px] m-auto rounded-2xl flex-1">
        {user ? (
          <ol className="overflow-auto w-full">
            {data.map((employee) => (
              <li key={employee.id} className="text-white text-[20px] p-3 flex flex-col bg-[#737CCF] m-2 rounded-2xl">
                 <Link to={`/employee/${employee.id}`} className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#284B4D] to-[#FFDC83]/50 rounded-2xl opacity-30"></div>
                      <div className="relative z-10 text-white text-[30px] p-3">
                        <p>{employee.name}</p>
                      </div>
                  </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-[20px] mx-auto mt-10">Please log in to view employees</p>
        )}
      </div>
    </div>
  );
}