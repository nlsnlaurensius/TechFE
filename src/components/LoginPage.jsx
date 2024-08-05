// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import CoverElement from './elements/CoverElement';
import coverBackground from '../assets/cover-background.svg';
import logo from '../assets/logo-office-manager.svg';
import eye from '../assets/eye.svg';
import eyeOff from '../assets/eyeOff.svg';
import user from '../assets/user.svg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/manager/login', {
        name,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row xl:justify-between justify-center bg-cover bg-no-repeat h-screen w-auto" style={{ backgroundImage: `url(${coverBackground})` }}>
      <CoverElement />

      <div className="flex flex-col xl:mr-[50px] justify-center">
        <div className="flex flex-col m-auto gap-4">
          <motion.div 
            className="flex flex-row xl:hidden justify-center gap-4" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <img src={logo} className="w-[80px] h-[80px]" alt="Office Manager Logo" />
            <p className="flex flex-col justify-center text-[36px] font-bold text-techno-white">OfficeManager</p>
          </motion.div>

          <motion.div
            className="bg-techno-white bg-opacity-10 w-[450px] h-[480px] m-auto rounded-[35px] backdrop-blur-[10px] flex flex-col text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <b className="text-[40px] mx-auto mt-10">Login</b>

            <form onSubmit={handleLogin} className="flex flex-col items-center mt-10">
              <div className="mb-6 relative w-[350px]">
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
                  <img src={user} className="absolute right-5 top-4" alt="username" width={22} height={22} />
                </div>
              </div>

              <div className="mb-6 relative w-[350px]">
                <label htmlFor="password" className="block text-[20px] mb-2"></label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
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
                  className="bg-techno-gold p-2 px-6 rounded-[45px] w-[350px] h-[55px] mb-3 hover:bg-techno-dark-gold transition-colors text-xl font-bold" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p 
                  className="text-white underline cursor-pointer hover:text-techno-turquoise transition-colors" 
                  onClick={() => navigate('/register')}
                >
                  Don't have an account? Register here
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}