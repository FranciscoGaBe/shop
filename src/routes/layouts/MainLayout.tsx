import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

const mainRoutes = [
  { text: 'Home', to: '/' },
  { text: 'Link 1', to: '/link1' },
  { text: 'Link 2', to: '/link2' },
  { text: 'Link 3', to: '/link3' },
];

const footerLinks = [
  { icon: 'github', to: 'https://github.com/FranciscoGaBe/shop' },
  { icon: 'linkedin', to: 'https://www.linkedin.com/in/francisco-garrido-679084198/' },
];

const MainLayout: React.FC = () => (
  <div className="h-full flex flex-col">
    <header className="flex-shrink-0 bg-neutral-400 border-b border-neutral-500">
      <div className="px-8 py-4 flex items-center justify-between">
        <img className="w-20" src={logo} alt="Logo" />
        <nav>
          <ul className="flex gap-8 font-bold">
            {
            mainRoutes.map(({ text, to }) => (
              <li key={text}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? 'text-red-700' : 'text-white')}
                >
                  { text }
                </NavLink>
              </li>
            ))
          }
          </ul>
        </nav>
      </div>
    </header>
    <main className="flex-grow bg-gray-200">
      <Outlet />
    </main>
    <footer className="flex-shrink-0 bg-rose-700 text-white">
      <div className="flex items-center justify-between px-8 py-4">
        <p>© Francisco Garrido Bear</p>
        <ul className="flex gap-8 font-bold">
          {
            footerLinks.map(({ icon, to }) => (
              <li key={icon}>
                <a href={to} target="_blank" rel="noreferrer">{ icon }</a>
              </li>
            ))
          }
        </ul>
      </div>
    </footer>
  </div>
);

export default MainLayout;
