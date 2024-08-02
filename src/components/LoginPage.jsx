import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";
import eye from "../assets/eye.svg";
import eyeOff from "../assets/eyeOff.svg";
import user from "../assets/user.svg";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/manager/login", {
        name,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        // untuk sementara simpen di local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen flex" style={{ backgroundImage: `url(${background})` }}>
      <DashboardElement />

      <div className="bg-techno-white bg-opacity-5 w-[600px] h-[480px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white">
        <b className="text-[40px] mx-auto mt-10">Login</b>

        <form onSubmit={handleLogin} className="flex flex-col items-center mt-10">
          <div className="mb-6 relative w-[450px]">
            <label htmlFor="name" className="block text-[20px] mb-2"></label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-techno-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-16 border border-t-techno-white"
                placeholder="Username"
                required
              />
              <img
                src={user}
                className="absolute right-5 top-4 cursor-pointer"
                alt="username"
                width={22}
                height={22}
              />
            </div>
          </div>

          <div className="mb-6 relative w-[450px]">
            <label htmlFor="password" className="block text-[20px] mb-2"></label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-techno-white bg-opacity-10 w-full h-[55px] rounded-[45px] text-white text-lg pl-10 pr-16 border border-techno-white"
                placeholder="Password"
                required
              />
              <img
                src={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-4 cursor-pointer"
                alt="Toggle Password Visibility"
                width={24}
                height={24}
              />
            </div>
          </div>

          {error && <p className="text-red-800 mb-4">{error}</p>}

          <div className="mt-2 space-y-3 text-center">
            <button
              type="submit"
              className="bg-techno-gold p-2 px-6 rounded-[45px] w-[450px] h-[55px] mb-3 hover:bg-techno-dark-gold transition-colors text-xl font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className="text-white underline cursor-pointer hover:text-techno-turquoise transition-colors" onClick={() => navigate("/register")}>
              Don't have an account? Register here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
