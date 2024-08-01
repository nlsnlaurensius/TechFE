import React, { useEffect, useState } from "react";
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

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />

      <div className="bg-[#FFFFFF] bg-opacity-5 w-[650px] h-[481px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white">
        <p className="text-[40px] mx-auto mt-10 font-sans font-bold">My Profile</p>
        <img src={profilepicture} className="w-[200px] h-[200px] mx-auto mt-10" />
        <>
        {user ? (
          <p className="text-[20px] mx-auto mt-10">Currently logged in as {user.name}</p>
        ) : (
          <p className="text-[20px] mx-auto mt-10">Currently logged in as Guest</p>
        )}
        </>
      </div>
    </div>
  );
}
