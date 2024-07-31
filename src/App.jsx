import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/HomePage";
import AddEmployee from "./components/AddEmployeePage";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import EmployeeDetails from "./components/EmployeeDetailsPage";
import MyInfo from "./components/MyInfoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/add" element={<AddEmployee/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/employee-details" element={<EmployeeDetails/>}/>  
          <Route path="/my-info" element={<MyInfo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
