import Dashboard from "./elements/Dashboard";

function AddEmployee(){
    return (
        <div className="flex flex-row">
            <Dashboard />
            <div className="flex-grow grid place-content-center md:ml-[390px] text-techno-white bg-techno-white h-screen w-auto">
                <div className="flex flex-col h-[600px] w-[450px] bg-techno-navy rounded-xl">
                    <div className="mt-8 mb-8 text-[30px] flex flex-row justify-center">
                        <p>Add New Employee</p>
                    </div>
                    <form className="flex flex-col mx-20 gap-8">
                        <div>
                            <p>Name</p>
                            <input type="textbox" className="px-2 h-8 my-2 w-full text-black bg-techno-white"></input>
                        </div>
                        <div>
                            <p>Division</p>
                            <input type="textbox" className="px-2 h-8 my-2 w-full text-black bg-techno-white"></input>
                        </div>
                        <div>
                            <p>Salary</p>
                            <input type="textbox" className="px-2 h-8 my-2 w-full text-black bg-techno-white"></input>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center">
                        <button type="submit" className="mt-20 w-20 h-12 bg-techno-sky text-techno-white rounded-xl">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;