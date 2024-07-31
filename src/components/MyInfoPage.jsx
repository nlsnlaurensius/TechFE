import Dashboard from "./elements/Dashboard";
import userbold from "../assets/logo-user-bold.svg";

function MyInfo(){
    return (
        <div className="flex flex-row">
            <Dashboard />
            <div className="flex-grow grid place-content-center md:ml-[390px] text-techno-white bg-techno-white h-screen w-auto">
                <div className="flex flex-col h-[600px] w-[450px] bg-techno-navy rounded-xl">
                    <div className="flex justify-center mt-12">
                        <img src={userbold} className="w-[40%]"/>
                    </div>
                    <div className="mt-8 mb-8 text-[30px] flex flex-row justify-center">
                        <p>My Info</p>
                    </div>
                    <div className="flex flex-col mx-20 gap-8">
                        <div>
                            <p>Name</p>
                            <div className="px-2 h-8 my-2 text-black bg-techno-white">Name</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyInfo;