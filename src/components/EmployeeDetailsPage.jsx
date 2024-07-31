import Dashboard from "./elements/Dashboard";
import user from "../assets/logo-user.svg";

function EmployeeDetails(){
    return (
        <div className="flex flex-row">
            <Dashboard />
            <div className="flex-grow grid place-content-center md:ml-[390px] text-techno-white bg-techno-white h-screen w-auto">
                <div className="flex flex-row justify-center">
                    <div className="flex justify-center h-[600px] w-[250px] rounded-l-xl bg-techno-sky">
                        <img src={user} className="w-[80%]"/>
                    </div>

                    <div className="flex flex-col h-[600px] w-[450px] bg-techno-navy">
                        <div className="mt-8 mb-8 text-[30px] flex flex-row justify-center">
                            <p>Employee</p>
                        </div>
                        <div className="flex flex-col mx-20 gap-8">
                            <div>
                                <p>Name</p>
                                <div className="h-8 my-2 bg-techno-white"></div>
                            </div>
                            <div>
                                <p>Division</p>
                                <div className="h-8 my-2 bg-techno-white"></div>
                            </div>
                            <div>
                                <p>Salary</p>
                                <div className="h-8 my-2 bg-techno-white"></div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            <button className="mt-20 w-20 h-12 bg-techno-sky text-techno-white rounded-xl">Add</button>
                        </div>
                    </div>

                    <div className="h-[600px] w-[50px] rounded-r-xl bg-techno-sky"></div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails;