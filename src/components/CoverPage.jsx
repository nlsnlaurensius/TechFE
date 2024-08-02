import Dashboard from "./elements/DashboardElement";
import coverBackground from "../assets/cover-background.svg";
import logo from '../assets/logo-office-manager.svg';
import { useNavigate } from 'react-router-dom';

export default function CoverPage() {
const navigate = useNavigate();

    return (
        <div className="flex flex-row justify-center bg-cover bg-no-repeat h-screen w-screen" style={{ backgroundImage: `url(${coverBackground})` }}>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col mt-[250px] gap-8">
                    <div className="flex flex-row justify-center gap-8" onClick={() => navigate("/home")}>
                        <img src={logo} className="w-[160px] h-[160px]"/>
                        <p className="flex flex-col justify-center text-[80px] font-bold text-techno-white">OfficeManager</p>
                    </div>
                    <p className="flex flex-row justify-center text-[36px] font-semibold text-techno-white">A Company Employee Management Website</p>
                </div>
                <p className="flex flex-row mb-[100px] justify-center text-[24px] font-semibold text-techno-white">Developed by Jonathan F. K. - Nelson L. - Wesley F. O.</p>
            </div>
        </div>
        
    )
}