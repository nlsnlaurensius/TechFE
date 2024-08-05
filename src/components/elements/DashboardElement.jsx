import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from '../../assets/logo-office-manager.svg';
import profile from '../../assets/my-info.svg';
import add from '../../assets/add-person.svg';
import home from '../../assets/home.svg';
import boldProfile from '../../assets/bold-my-info.svg';
import boldAdd from '../../assets/bold-add-person.svg';
import boldHome from '../../assets/bold-home.svg';
import login from '../../assets/login.svg';
import logout from '../../assets/logout.svg';
import burger from '../../assets/burger-icon.svg';
import close from '../../assets/close-icon.svg';

function DashboardElement() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);
    const [showDashboard, setShowDashboard] = useState(!isScreenSmall);

    const controls = useAnimation();

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isScreenSmall) {
            controls.start({ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : -100 });
        } else {
            controls.stop();
        }
    }, [showDashboard, isScreenSmall, controls]);

    const toggleDashboard = () => {
        setShowDashboard(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        console.log("Berhasil Logout");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
            {isScreenSmall && !showDashboard ? (
                <motion.div
                    className="fixed bg-techno-black bg-opacity-50 rounded-br-xl h-[70px] w-[70px] z-50 top-0 left-0 "
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button onClick={toggleDashboard} className="flex justify-center items-center h-full w-full">
                        <img src={burger} alt="menu" />
                    </button>
                </motion.div>
            ) : (
                <div className='fixed px-6 h-screen w-[350px] md:bg-techno-black bg-opacity-85 flex flex-col justify-between z-50'>
                    <div className="hidden md:flex flex-col gap-4">
                        <div className="mt-6 mb-10 flex flex-row gap-4 cursor-pointer" onClick={() => navigate("/")} >
                            <div className='w-[50px] flex justify-center'>
                                <img src={logo} alt="logo" />
                            </div>
                            <p className="flex flex-col justify-center font-bold text-techno-white text-[24px] font-roboto">OfficeManager</p>
                        </div>
                        <div className="flex flex-row gap-4 cursor-pointer" onClick={() => navigate("/home")}>
                            <div className='h-[30px] w-[50px] flex justify-center'>
                                <img src={home} alt="home" />
                            </div>
                            <p className="flex flex-col justify-center text-techno-white text-[18px]">Home</p>
                        </div>
                        <div className="flex flex-row gap-4 cursor-pointer" onClick={() => navigate("/my-info")}>
                            <div className='h-[30px] w-[50px] flex justify-center'>
                                <img src={profile} alt="profile" />
                            </div>
                            <p className="flex flex-col justify-center text-techno-white text-[18px]">My Info</p>
                        </div>
                        <div className="flex flex-row gap-4 cursor-pointer" onClick={() => navigate("/add-employee")}>
                            <div className='h-[30px] w-[50px] flex justify-center'>
                                <img src={add} alt="add employee" />
                            </div>
                            <p className="flex flex-col justify-center text-techno-white text-[18px]">Add Employee</p>
                        </div>
                    </div>

                    {!isLoggedIn ? (
                        <button>
                            <div className="mb-10 py-2 hidden md:flex justify-center border-2 rounded-full border-techno-white text-techno-white text-[20px]" onClick={() => navigate("/login")}>Login / Register</div>
                        </button>
                    ) : (
                        <button>
                            <div className="mb-10 py-2 hidden md:flex justify-center border-2 rounded-full border-techno-white text-techno-white text-[20px]" onClick={handleLogout}>Logout</div>
                        </button>
                    )}
                </div>
            )}

            {isScreenSmall && showDashboard && (
                <motion.div
                    className="fixed py-6 h-screen w-[70px] bg-techno-black bg-opacity-85 flex flex-col gap-4 justify-between z-50 top-0 left-0"
                    initial={{ y: -100, opacity: 0 }}
                    animate={controls}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className='flex flex-col gap-8 cursor-pointer'>
                        <button onClick={toggleDashboard} className="flex justify-center">
                            <img src={close} alt="close" />
                        </button>
                        <div className='h-0.5 mx-0 bg-techno-white'></div>
                        <div className='flex px-2' onClick={() => navigate("/home")}>
                            <img src={boldHome} alt="home" />
                        </div>
                        <div className='flex px-2' onClick={() => navigate("/my-info")}>
                            <img src={boldProfile} alt="profile" />
                        </div>
                        <div className='flex px-2' onClick={() => navigate("/add-employee")}>
                            <img src={boldAdd} alt="add employee" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 cursor-pointer'>
                        {!isLoggedIn ? (
                            <div className='flex px-2' onClick={() => navigate("/login")}>
                                <img src={login} alt="login" />
                            </div>
                        ) : (
                            <div className='flex px-2' onClick={handleLogout}>
                                <img src={logout} alt="logout" />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </>
    )
}

export default DashboardElement;
