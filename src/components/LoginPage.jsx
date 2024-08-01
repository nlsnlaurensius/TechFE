import Dashboard from "./elements/Dashboard";

function Login(){
    return (
        <div className="flex flex-row">
            <Dashboard />
            <div className="flex-grow grid place-content-center md:ml-[350px] text-techno-white bg-techno-white h-screen w-auto">
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col h-[500px] w-[450px] bg-techno-navy rounded-l-xl">
                        <div className="flex flex-row justify-center">
                            <p className="mt-8 mb-8 text-[30px]">Login Page</p>
                        </div>
                        <form className="flex flex-col mx-20 gap-8">
                            <div>
                                <p>Name</p>
                                <input type="textbox" className="px-2 h-8 my-2 w-full text-black bg-techno-white"></input>
                            </div>
                            <div>
                                <p>Password</p>
                                <input type="textbox" className="px-2 h-8 my-2 w-full text-black bg-techno-white"></input>
                            </div>
                        </form>
                        <div className="flex flex-row justify-center">
                            <button type="submit" className="mt-16 w-20 h-12 bg-techno-sky rounded-xl">Add</button>
                        </div>
                    </div>
                    <div className="h-[500px] w-[150px] bg-techno-sky rounded-r-xl"></div>
                </div>
            </div>
        </div>
    )
}

export default Login;