import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-rose-800 z-10"
      role="figure"
      aria-label="error"
    >
      <div className="text-center">
        <p className="text-4xl font-semibold mb-8 text-white px-2">
          Seems like something went wrong...
        </p>
        <button
          className={`
              text-2xl font-medium px-4 py-1 rounded
              bg-white hover:bg-rose-800
              text-rose-800 hover:text-white
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
