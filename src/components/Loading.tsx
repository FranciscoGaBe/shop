import React from 'react';
import logo from '../logo.svg';

const Loading: React.FC = () => (
  <div className="bg-rose-800/90 flex items-center justify-center fixed inset-0 z-10">
    <div className="text-center text-white">
      <img className="w-80 animate-pulse" src={logo} alt="Logo" />
    </div>
  </div>
);

export default Loading;
