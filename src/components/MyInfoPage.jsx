import { useEffect, useState } from "react";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import profilepicture from "../assets/profile.svg";
import { motion } from "framer-motion";

export default function MyInfoPage() {
  const [user, setUser] = useState(null);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }

    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDashboard = !isScreenSmall;

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
      <motion.div
        className={`bg-techno-white bg-opacity-5  w-[90%] max-w-[600px] justify-center h-[550px] m-auto  rounded-[35px] backdrop-blur-[10px] flex flex-col text-white ${isScreenSmall ? "" : "ml-[600px]"}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-[40px] mx-auto mt-2 font-sans font-bold">My Profile</p>
        <motion.img src={profilepicture} className="w-[200px] h-[200px] mx-auto mt-5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} />
        <p className="text-[20px] mx-auto mt-10">Currently logged in as</p>
        <div className="mx-20 mt-5 text-center border border-techno-white bg-techno-dark-green bg-gradient-to-r from-techno-gold to-techno-dark-gold text-white rounded-[45px] p-2">
          {user ? <p className="text-[20px] mx-auto">{user.name}</p> : <p className="text-[20px] mx-auto">Guest</p>}
        </div>
      </motion.div>
    </div>
  );
}
