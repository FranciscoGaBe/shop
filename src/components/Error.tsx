import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      role="figure"
      aria-label="error"
    >
      <div className="text-center">
        <p className="text-4xl font-semibold mb-8 text-rose-800 px-2">
          Seems like something went wrong...
        </p>
        <button
          className={`
              text-2xl font-medium px-4 py-1 rounded
              bg-rose-800 hover:bg-gray-100
              text-white hover:text-rose-800
              transition-color duration-300 ease-in-out
            `}
          type="button"
          onClick={() => { navigate(0); }}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default Error;
