import logo from '../../assets/logo-office-manager.svg';
import profile from '../../assets/my-info.svg';
import add from '../../assets/add-person.svg';
import home from '../../assets/home.svg';
import detail from '../../assets/detail-person.svg';
import boldProfile from '../../assets/bold-my-info.svg';
import boldAdd from '../../assets/bold-add-person.svg';
import boldHome from '../../assets/bold-home.svg';
import boldDetail from '../../assets/bold-detail-person.svg';
import login from '../../assets/login.svg';
import logout from '../../assets/logout.svg';
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
                <div className="fixed p-4 bg-techno-black rounded-br-xl h-[100px] w-[100px]">
                    <button onClick={toggleDashboard} className="">
                        <img src={burger} />
                    </button>
                </div>
            ) : (
            <div className='fixed px-6 h-screen w-[350px] md:bg-techno-black flex flex-col justify-between'>
                <div className="hidden md:flex flex-col gap-4">
                    <div className="mt-6 mb-10 flex flex-row gap-4">
                        <div className='w-[50px] flex justify-center'>
                            <img src={logo} />
                        </div>
                        <p className="flex flex-col justify-center font-bold text-techno-white text-[24px]">OfficeManager</p>
                    </div>
                    <div className="flex flex-row gap-4" onClick={() => navigate("/home")}>
                        <div className='h-[30px] w-[50px] flex justify-center'>
                            <img src={home} />
                        </div>
                        <p className="flex flex-col justify-center text-techno-white text-[18px]">Home</p>
                    </div>
                    <div className="flex flex-row gap-4" onClick={() => navigate("/my-info")}>
                        <div className='h-[30px] w-[50px] flex justify-center'>
                            <img src={profile} />
                        </div>
                        <p className="flex flex-col justify-center text-techno-white text-[18px]">My Info</p>
                    </div>
                    <div className="flex flex-row gap-4" onClick={() => navigate("/add")}>
                        <div className='h-[30px] w-[50px] flex justify-center'>
                            <img src={add} />
                        </div>
                        <p className="flex flex-col justify-center text-techno-white text-[18px]">Add Employee</p>
                    </div>
                    <div className="flex flex-row gap-4" onClick={() => navigate("/detail")}>
                        <div className='h-[30px] w-[50px] flex justify-center'>
                            <img src={detail} />
                        </div>
                        <p className="flex flex-col justify-center text-techno-white text-[18px]">Employee Detail</p>
                    </div>
                </div>

                <button>
                    <div className="mb-10 py-2 hidden md:flex justify-center border-2 rounded-full border-techno-white text-techno-white text-[20px]" onClick={() => navigate("/login")}>Login / Register</div>
                </button>
            </div>
            )}

            {isScreenSmall && showDashboard && (
                <div className="fixed py-6 h-screen w-[100px] bg-techno-black flex flex-col gap-4 justify-between">
                    <div className='flex flex-col gap-8'>
                        <button onClick={toggleDashboard} className="flex justify-center">
                            <img src={close} />
                        </button>
                        <div className='h-0.5 mx-5 bg-techno-white'></div>
                        <div className='flex px-7' onClick={() => navigate("/home")}>
                            <img src={boldHome} />
                        </div>
                        <div className='flex px-7' onClick={() => navigate("/my-info")}>
                            <img src={boldProfile} />
                        </div>
                        <div className='flex px-7' onClick={() => navigate("/add")}>
                            <img src={boldAdd} />
                        </div>
                        <div className='flex px-7' onClick={() => navigate("/detail")}>
                            <img src={boldDetail} />
                        </div>
                        
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex px-7' onClick={() => navigate("/login")}>
                            <img src={login}/>
                        </div>
                        {/* <div className='flex'>
                            <img src={logout}/>
                        </div> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard;