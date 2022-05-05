import {
  faBars, faCartShopping, faChevronDown, faMagnifyingGlass, faTimes, faUser, faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import logo from '../../logo.svg';
import { selectProducts } from '../../services/cart';
import { useGetCategoriesQuery } from '../../services/shop';
import { selectAuthUser } from '../../services/user';

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
      className="my-4 md:my-0 relative mx-4 shrink-0"
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
      <li className="my-4 md:my-0 shrink-0">
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

const HeaderNavSearch: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
    navigate(`/search?q=${value}`);
  };

  return (
    <li className="grow order-first md:order-none">
      <form
        className="flex"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className={`
            grow text-black px-1 py-1 rounded-l border-2 outline-none
            border-rose-600 focus:border-rose-800
            transition-all duration-200 ease-in-out
          `}
          type="text"
          value={value}
          placeholder="Search"
          name="q"
          aria-label="search text"
          onInput={({ target }) => setValue((target as HTMLInputElement).value)}
        />
        <button
          className={`
            shrink-0 px-4 rounded-r bg-rose-600 
            hover:bg-rose-800 focus:bg-rose-800 outline-none
          `}
          type="submit"
          aria-label="search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </li>
  );
};

const HeaderCart: React.FC = () => {
  const [items, setItems] = useState(0);
  const products = useAppSelector(selectProducts).length;

  useEffect(() => {
    if (products > items) setTimeout(() => setItems(products), 1000);
    else if (products < items) setItems(products);
  }, [products, items]);

  return (
    <NavLink
      to="/cart"
      id="cart-link"
      className={({ isActive }) => `
        transition-all duration-200 ease-in-out relative
        flex items-center justify-center h-10 w-10 shadow shadow-rose-800
      text-white border-2 border-white hover:text-rose-700 hover:bg-white
        ${isActive ? 'rounded-lg bg-rose-800' : 'rounded-3xl bg-rose-700'}
      `}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      { !!items && (
        <AnimatePresence>
          <span
            className={`
              flex items-center justify-center rounded-full overflow-hidden
              border-2 border-white text-xs font-semibold text-white
              absolute -bottom-1.5 -right-1.5 bg-rose-900 w-5 h-5
            `}
          >
            <motion.span
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              exit={{ x: 5 }}
              key={items}
            >
              { items }
            </motion.span>
          </span>
        </AnimatePresence>
      ) }
    </NavLink>
  );
};

const HeaderUser: React.FC = () => {
  const user = useAppSelector(selectAuthUser);

  return (
    <>
      <NavLink
        to={user ? '/account' : '/signin'}
        className={({ isActive }) => `
          transition-all duration-200 ease-in-out
          text-white border-2 border-white rounded-full h-10 w-10
          flex items-center justify-center
          shadow shadow-rose-800 md:hidden 
          ${isActive ? 'bg-rose-800' : 'bg-rose-700'}
        `}
      >
        <FontAwesomeIcon icon={user ? faUser : faUserSlash} />
      </NavLink>
      <p className="hidden md:block text-white">
        <span className="mr-2">Welcome,</span>
        <b>
          <Link to={user ? '/account' : '/signin'}>
            { user ? user.name : 'Login' }
          </Link>
        </b>
      </p>
    </>
  );
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
    <header
      className="bg-rose-700 h-16 flex justify-center sticky top-0 shadow shadow-rose-700/80 z-20"
    >
      <div
        className="w-1/2 text-white flex items-center justify-start pl-4 md:pl-8 pr-10 md:pr-16"
      >
        <button
          type="button"
          className="md:hidden border-2 border-white rounded px-2"
          onClick={() => setShowMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={[
            'transition-all duration-300 ease-in-out w-full',
            'inset-0 fixed md:static bg-rose-700 md:bg-transparent',
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
          <nav className="h-full w-full flex items-center justify-center md:justify-start">
            <ul className="flex w-full items-center md:gap-4 text-white flex-col md:flex-row">
              {
                navElements.map((element) => (
                  <HeaderNavElement
                    key={element.text}
                    element={element}
                    onClick={() => setShowMenu(false)}
                  />
                ))
              }
              <HeaderNavSearch onSearch={() => setShowMenu(false)} />
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex justify-center absolute top-0 mx-auto">
        <Link
          to="/"
          className="w-20 max-w-full aspect-square rounded-full bg-rose-700 shadow shadow-rose-800"
        >
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-end gap-4 pr-4 pl-10 md:pr-8 md:pl-16">
        <HeaderUser />
        <HeaderCart />
      </div>
    </header>
  );
};

export default MainLayoutHeader;
