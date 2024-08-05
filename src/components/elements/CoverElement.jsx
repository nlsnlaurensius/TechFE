// src/components/elements/CoverElement.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-office-manager.svg';

export default function CoverElement() {
  const navigate = useNavigate();

  return (
    <div className="hidden xl:flex flex-row ml-[50px] justify-center font-roboto" onClick={() => navigate("/home")}>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col mt-[200px] gap-8">
          <motion.div 
            className="flex flex-row justify-center gap-8" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <img src={logo} className="w-[160px] h-[160px]" alt="Office Manager Logo" />
            <p className="flex flex-col justify-center text-[72px] font-bold text-techno-white">OfficeManager</p>
          </motion.div>
          <motion.p 
            className="flex flex-row justify-center text-[32px] font-semibold text-techno-white"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
          >
            A Company Employee Management Website
          </motion.p>
        </div>
        <motion.p 
          className="flex flex-row mb-[100px] justify-center text-[18px] font-semibold text-techno-white"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
        >
          Developed by Jonathan F. K. - Nelson L. - Wesley F. O.
        </motion.p>
      </div>
    </div>
  );
}