import DashboardElement from "./elements/DashboardElement";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../assets/Background.svg";

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
  }, []);

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex flex-row">
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="relative z-10 flex w-full">
        <DashboardElement />
        {isScreenSmall}
        <div
          className={`bg-[#FFFFFF] bg-opacity-5 h-auto m-10 rounded-[35px] backdrop-blur-[10px] flex relative w-full ${isScreenSmall ? 'p-4' : 'p-8'} ${isScreenSmall ? 'mx-4' : 'ml-[400px]  mx-10'}`}
        >
          {user ? (
            <ol className="overflow-auto w-full">
              <div className="text-white w-full mx-auto backdrop-blur-[10px] my-10 rounded-2xl flex items-center justify-center h-[50px]">
                <p className="text-[20px]">Click to View Employee Detail</p>
              </div>
              {data.map((employee) => (
                <li key={employee.id} className="mx-10 h-[70px] my-4 p-3 flex font-bold flex-col m-2">
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
            <p className="text-[20px] text-white font-bold mx-auto">Please log in to view employees</p>
          )}
        </div>
      </div>
    </div>
  );
}
