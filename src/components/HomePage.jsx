import Dashboard from "./elements/Dashboard";

function Home(){
    return (
        <div className="flex flex-row">
            <Dashboard />
            <div className="flex-grow md:ml-[350px] border-techno-white border-20 bg-techno-sky w-auto h-screen"></div>
        </div>
    )
}

export default Home;