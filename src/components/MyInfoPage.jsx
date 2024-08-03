import { useEffect, useState } from "react";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import profilepicture from "../assets/profile.svg";

export default function MyInfoPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []); // biar dapet user info dari local storage

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

  const [showDashboard] = useState(!isScreenSmall);

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
      {/* thanks gpt for adjusting size wkwkw */}
      {showDashboard} 
      <div className={`bg-[#FFFFFF] bg-opacity-5 w-[650px] h-[481px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white ${isScreenSmall ? '' : 'ml-[600px]'}`} >
        <p className="text-[40px] mx-auto mt-2 font-sans font-bold">My Profile</p>
        <img src={profilepicture} className="w-[200px] h-[200px] mx-auto mt-5" />
        <p className="text-[20px] mx-auto mt-10">Currently logged in as</p>
        <div className="mx-20 mt-5 text-center border border-[#BFBFBF] bg-[#284B4D] bg-gradient-to-r from-[#D3B166] to-[#7B663A] text-white rounded-[45px] p-2">
        <>
        {user ? (
          <p className="text-[20px] mx-auto">{user.name}</p>
        ) : (
          <p className="text-[20px] mx-auto">Guest</p>
        )}
        </>
        </div>
      </div>
    </div>
  );
}
