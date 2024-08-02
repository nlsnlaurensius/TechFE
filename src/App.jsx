import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/HomePage";
import AddEmployee from "./components/AddEmployeePage";
import Login from "./components/LoginPage";
import Register from "./components/RegistrationPage";
import EmployeeDetails from "./components/EmployeeDetailsPage";
import MyInfo from "./components/MyInfoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/add-employee" element={<AddEmployee/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/employee/:id" element={<EmployeeDetails/>}/>  
          <Route path="/my-info" element={<MyInfo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
