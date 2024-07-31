import profile from '../../assets/logo-my-info.svg';
import add from '../../assets/logo-add-person.svg';
import home from '../../assets/logo-home.svg';
import login from '../../assets/logo-login.svg';
import logout from '../../assets/logo-logout.svg';
import burger from '../../assets/burger-icon.svg';
import close from '../../assets/close-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dashboard(){
    const navigate = useNavigate();

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

    const [showDashboard, setShowDashboard] = useState(!isScreenSmall);

    const toggleDashboard = () => {
        setShowDashboard(!showDashboard);
    };

    return (
        <>
            {isScreenSmall && !showDashboard ? (
                <div className="fixed p-4 bg-techno-navy rounded-br-xl">
                    <button onClick={toggleDashboard} className="">
                        <img src={burger} />
                    </button>
                </div>
            ) : (
            <div className='fixed px-6 h-screen w-[390px] md:bg-techno-navy flex flex-col justify-between'>
                <div className="hidden md:flex flex-col">
                    <div className="mt-6 mb-2 text-techno-white">
                        <p className="flex justify-center text-[30px]">Dashboard</p>
                    </div>

                    <div className='h-0.5 mb-4 bg-techno-white'></div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row' onClick={() => navigate("/my-info")}>
                            <img src={profile} />
                            <p className="my-auto text-techno-white ml-5 text-[20px]">
                                My Info
                            </p>
                        </div>
                        <div className='flex flex-row' onClick={() => navigate("/add")}>
                            <img src={add} />
                            <p className="my-auto text-techno-white ml-5 text-[20px]">
                                Add Employee
                            </p>
                        </div>
                        <div className='flex flex-row' onClick={() => navigate("/home")}>
                            <img src={home} />
                            <p className="my-auto text-techno-white ml-5 text-[20px]">
                                Home
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className='mb-4 hidden md:flex flex-row justify-between'>
                    <div className='flex flex-col' onClick={() => navigate("/login")}>
                        <img src={login}/>
                        <p className="text-techno-white text-[20px]">Login</p>
                    </div>
                    <div className='flex flex-col'>
                        <img src={logout}/>
                        <p className="text-techno-white text-[20px]">Logout</p>
                    </div>
                </div>
            </div>
            )}

            {isScreenSmall && showDashboard && (
                <div className="fixed px-6 py-6 h-screen w-[100px] bg-techno-navy flex flex-col gap-4 justify-between">
                    <div className='flex flex-col gap-4'>
                        <button onClick={toggleDashboard} className="flex justify-center">
                            <img src={close} />
                        </button>
                        <div className='h-0.5 bg-techno-white'></div>
                        <div className='flex' onClick={() => navigate("/my-info")}>
                            <img src={profile} />
                        </div>
                        <div className='flex' onClick={() => navigate("/add")}>
                            <img src={add} />
                        </div>
                        <div className='flex' onClick={() => navigate("/home")}>
                            <img src={home} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex' onClick={() => navigate("/login")}>
                            <img src={login}/>
                        </div>
                        <div className='flex'>
                            <img src={logout}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard;