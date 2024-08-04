import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import AddEmployee from "./components/AddEmployeePage";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import EmployeeDetails from "./components/EmployeeDetailsPage";
import MyInfo from "./components/MyInfoPage";
import NotFoundPage from "./components/NotFoundPage"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
