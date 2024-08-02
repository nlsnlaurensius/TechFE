import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import eye from "../assets/eye.svg";
import eyeOff from "../assets/eyeOff.svg";
import user from "../assets/user.svg";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/manager/register", {
        name,
        password,
      });

      if (response.status === 201) {
        console.log("Registration successful", response.data);
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />
      
      <div className="bg-techno-white bg-opacity-5 w-[600px] h-[570px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white">
        <b className="text-[40px] mx-auto mt-10 ">Register</b>

        <form onSubmit={handleRegister} className="flex flex-col items-center mt-10">
          <div className="mb-6">
            <label htmlFor="name" className="block text-[20px] mb-2"></label>
            <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-techno-white bg-opacity-10 w-[450px] h-[55px] rounded-[45px] text-white text-lg px-10 border border-t-techno-white"
              placeholder="Username"
              required
            />
            <img
              src={user}
              className="absolute right-5 top-4 "
              alt="username"
              width={22}
              height={22}
            />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[20px] mb-2"></label>
           <div className="relative">
           <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-techno-white bg-opacity-10 w-[450px] h-[55px] rounded-[45px] text-white text-lg px-10 border border-techno-white"
              placeholder="Password"
              required
            />
            <img
              src={showPassword ? eyeOff : eye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4 cursor-pointer "
              alt="Toggle Password Visibility"
              width={24}
              height={24}
            />
           </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-[20px] mb-2"></label>
            <div className="relative">
            <input 
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-techno-white bg-opacity-10 w-[450px] h-[55px] rounded-[45px] text-white text-lg px-10 border border-techno-white mb-0"
              placeholder="Confirm Password"
              required
            />
            <img
              src={showConfirmPassword ? eyeOff : eye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-4 cursor-pointer "
              alt="Toggle Password Visibility"
              width={24}
              height={24}
            />
            
            </div>
          </div>

          {error && <p className="text-red-400 mb-1 font-bold">{error}</p>}

          <div className="mt-2 space-y-3 text-center">
            <button type="submit" className="bg-techno-gold p-2 px-6 rounded-[45px] w-[450px] h-[55px] mb-3 hover:bg-techno-dark-gold transition-colors text-xl font-bold" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="text-white underline cursor-pointer hover:text-techno-turquoise transition-colors " onClick={() => navigate("/login")}>
              Already have an account? Login here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
