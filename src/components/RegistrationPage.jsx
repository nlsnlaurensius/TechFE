import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <DashboardElement />
      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Register</p>
        <form onSubmit={handleRegister} className="flex flex-col items-center mt-10">
          <div className="mb-6">
            <label htmlFor="name" className="block text-[20px] mb-2">
              Name
            </label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[20px] mb-2">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded" required />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-[20px] mb-2">
              Confirm Password
            </label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded" required />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mt-10 space-y-4 text-center">
            <p className="text-white underline cursor-pointer hover:text-gray-300 transition-colors" onClick={() => navigate("/login")}>
              Already have an account? Login here
            </p>
            <button type="submit" className="bg-[#6F90AF] p-2 px-6 rounded-2xl hover:bg-[#5A7A9A] transition-colors" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
