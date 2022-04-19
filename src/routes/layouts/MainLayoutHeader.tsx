import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

const routes = [
  { text: 'Home', to: '/' },
  { text: 'Link 1', to: '/link1' },
  { text: 'Link 2', to: '/link2' },
  { text: 'Link 3', to: '/link3' },
];

const MainLayoutHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-rose-700 h-16 flex sticky top-0 shadow shadow-rose-700/80 z-20">
      <div className="w-2/5 flex-shrink-0 text-white flex items-center justify-start px-4 md:px-8">
        <button
          type="button"
          className="md:hidden border-2 border-white rounded px-2"
          onClick={() => setShowMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={[
            'transition-all duration-300 ease-in-out',
            'inset-0 fixed md:static bg-rose-700/80 md:bg-transparent',
            showMenu ? 'opacity-100' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto',
          ].join(' ')}
        >
          <button
            type="button"
            className="md:hidden absolute top-0 right-0 p-4 text-3xl text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <nav className="h-full w-full flex items-center justify-center">
            <ul className="flex gap-8 text-white flex-col md:flex-row">
              {
                routes.map(({ text, to }) => (
                  <li key={text} className="my-4 md:my-0">
                    <NavLink
                      to={to}
                      className={({ isActive }) => (isActive ? 'font-black' : '')}
                      onClick={() => setShowMenu(false)}
                    >
                      { text }
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-shrink-0 w-1/5 flex justify-center relative">
        <Link
          to="/"
          className="w-20 max-w-full aspect-square rounded-full bg-rose-700 absolute shadow shadow-rose-800"
        >
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-2/5 flex-shrink-0">
        &nbsp;
      </div>
    </header>
  );
};

export default MainLayoutHeader;
