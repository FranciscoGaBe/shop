import {
  faBars, faCartShopping, faChevronDown, faTimes, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';
import { useGetCategoriesQuery } from '../../services/shop';

interface NavElement {
  text: string,
  to: string,
  type: 'LINK' | 'DROPDOWN',
  items?: null | { text: string, to: string }[]
}

interface HeaderNavElementProps {
  element: NavElement,
  onClick: () => void
}

const HeaderNavDropdown: React.FC<HeaderNavElementProps> = ({ element, onClick }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const dropdownControls = useAnimation();

  const onItemClick = () => {
    setShow(false);
    onClick();
  };

  useEffect(() => {
    const clickOutside = (event: PointerEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;
      setShow(false);
    };

    window.addEventListener('pointerdown', clickOutside);

    return () => {
      window.removeEventListener('pointerdown', () => clickOutside);
    };
  }, []);

  useEffect(() => {
    const animate = async () => {
      if (show) {
        await dropdownControls.start({
          left: -24,
          right: -24,
        });
        await dropdownControls.start({
          height: 200,
          paddingTop: 40,
        });
      } else {
        await dropdownControls.start({
          height: 0,
          paddingTop: 32,
        });
        await dropdownControls.start({
          left: 0,
          right: 0,
          overflow: 'hidden',
        });
      }
    };
    animate();
  }, [show, dropdownControls]);

  return (
    <li
      ref={ref}
      className="my-4 md:my-0 relative mx-4"
    >
      <button type="button" className="w-full px-3 py-1 relative z-10" onClick={() => setShow(!show)}>
        <span className="mr-2">{ element.text }</span>
        <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
      </button>
      <motion.ul
        animate={dropdownControls}
        className="absolute top-0 whitespace-nowrap bg-rose-800 rounded-lg shadow"
      >
        {
          element.items && element.items.map(({ text, to }, index) => (
            <li
              key={text}
            >
              <NavLink
                to={to}
                className={({ isActive }) => `
                  block px-4 py-2 capitalize
                  transition-colors duration-300 ease-in-out
                  hover:bg-rose-700
                  ${isActive ? 'font-black' : ''}
                  ${index === 0 ? '' : ''}
                  ${index === ((element.items as []).length - 1) ? '' : ''}
                `}
                onClick={() => onItemClick()}
              >
                { text }
              </NavLink>
            </li>
          ))
            }
      </motion.ul>
    </li>
  );
};

const HeaderNavElement: React.FC<HeaderNavElementProps> = ({ element, onClick }) => {
  if (element.type === 'LINK') {
    return (
      <li className="my-4 md:my-0">
        <NavLink
          to={element.to}
          className={({ isActive }) => (isActive ? 'font-black' : '')}
          onClick={() => onClick()}
        >
          { element.text }
        </NavLink>
      </li>
    );
  }
  if (element.type === 'DROPDOWN') return <HeaderNavDropdown element={element} onClick={onClick} />;
  return null;
};

const MainLayoutHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data } = useGetCategoriesQuery();

  const navElements = useMemo<NavElement[]>(() => {
    const categoryItems = !data ? null : data.map((category) => ({
      text: category,
      to: `category/${category}`,
    }));

    return [
      { text: 'Home', to: '/', type: 'LINK' },
      {
        text: 'Categories', to: '#', type: 'DROPDOWN', items: categoryItems,
      },
    ];
  }, [data]);

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
            <ul className="flex items-center md:gap-4 text-white flex-col md:flex-row">
              {
                navElements.map((element) => (
                  <HeaderNavElement
                    key={element.text}
                    element={element}
                    onClick={() => setShowMenu(false)}
                  />
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
      <div className="w-2/5 flex-shrink-0 flex items-center justify-end gap-4 px-4 md:px-8">
        <button
          type="button"
          className={[
            'text-white border-2 border-white rounded-full h-10 w-10',
            'shadow shadow-rose-800 md:hidden',
          ].join(' ')}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <p className="hidden md:block text-white">
          Welcome,
          {' '}
          <b>User</b>
        </p>
        <button
          type="button"
          className={[
            'text-white border-2 border-white rounded-full h-10 w-10',
            'shadow shadow-rose-800',
          ].join(' ')}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </header>
  );
};

export default MainLayoutHeader;
