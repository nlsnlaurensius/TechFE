import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import background from "../assets/Background.svg";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

      <div className="bg-[#FFFFFF] bg-opacity-5 w-[650px] h-[481px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white">
        <b className="text-[40px] mx-auto mt-20 font-sans">Login</b>

        <form onSubmit={handleLogin} className="flex flex-col items-center mt-10">
          <div className="mb-6">
            <label htmlFor="name" className="block text-[20px] mb-2"></label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#BFBFBF] bg-opacity-10 w-[420px] h-[55px] rounded-[45px] text-white text-lg px-10 border border-[#BFBFBF]"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[20px] mb-2"></label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#BFBFBF] bg-opacity-10 w-[420px] h-[55px] rounded-[45px] text-white text-lg px-10 border border-[#BFBFBF]"
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mt-10 space-y-4 text-center">
            <p className="text-white underline cursor-pointer hover:text-gray-300 transition-colors" onClick={() => navigate("/register")}>
              Need an account? Register here
            </p>

            <button type="submit" className="bg-[#6F90AF] p-2 px-6 rounded-2xl hover:bg-[#5A7A9A] transition-colors" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
