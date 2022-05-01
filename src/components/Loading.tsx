import React from 'react';
import logo from '../logo.svg';

const Loading: React.FC = () => (
  <div
    className="flex items-center justify-center fixed inset-0"
    role="figure"
    aria-label="loading"
  >
    <div className="text-center text-white bg-rose-800 rounded-full relative">
      <img className="w-80 animate-pulse" src={logo} alt="Logo" />
    </div>
  </div>
);

export default Loading;
