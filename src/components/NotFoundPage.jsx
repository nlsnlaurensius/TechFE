import React from 'react';
import { Link } from 'react-router-dom';
import coverBackground from '../assets/Background.svg';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${coverBackground})` }}>
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-techno-white sm:text-7xl">404</h1>
        <p className="mt-4 text-lg text-techno-white">Oops, the page you are looking for could not be found.</p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="bg-techno-gold hover:bg-techno-dark-gold text-white flex items-center justify-center rounded-[35px] w-[200px] h-[55px] text-xl font-bold"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
