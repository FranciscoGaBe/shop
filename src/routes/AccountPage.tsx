import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FormInput from '../components/FormInput';
import Heading from '../components/Heading';
import SectionElement from '../components/SectionElement';
import {
  changePassword,
  clearError, clearSuccess, logout, selectAuthUser, selectUserError, selectUserSuccess,
} from '../services/user';

interface TabsProps {
  value: string,
  onChange: (tab: string) => void
}

const tabs = {
  data: 'Data',
  password: 'Change Password',
} as const;

const Tabs: React.FC<TabsProps> = ({ value, onChange }) => (
  <ul className="flex flex-row md:flex-col px-2 md:px-0 md:py-2 shrink-0">
    {
      Object.entries(tabs).map(([tabValue, text]) => (
        <li
          key={tabValue}
          className="w-full md:px-0"
        >
          <button
            className={`
              transition-all duration-200 ease-in-out
              font-semibold md:text-xl w-full p-2 outline-none
              rounded-t-lg md:rounded-l-lg md:rounded-r-none text-center
              ${value === tabValue ? 'bg-white text-rose-800' : 'bg-rose-800 text-white'}
            `}
            type="button"
            onClick={() => onChange(tabValue)}
          >
            { text }
          </button>
        </li>
      ))
    }
  </ul>
);

const variants: Variants = {
  initial: (isSmall: boolean) => ({
    x: isSmall ? 0 : 150,
    y: 0,
    opacity: 0,
  }),
  animate: (isSmall: boolean) => ({
    x: isSmall ? 0 : -10,
    y: isSmall ? -35 : 0,
    opacity: 1,
  }),
  exit: (isSmall: boolean) => ({
    x: isSmall ? 0 : 150,
    y: 0,
    opacity: 0,
  }),
};

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const error = useAppSelector(selectUserError);
  const success = useAppSelector(selectUserSuccess);
  const [currentTab, setCurrentTab] = useState('data');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) return;
    navigate('/signin');
  }, [user, navigate]);

  useEffect(() => {
    if (!success) return;
    setTimeout(() => dispatch(clearSuccess()), 2000);
  }, [success, dispatch]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    if (media.matches !== isSmall) setIsSmall(media.matches);
    const listener = () => {
      setIsSmall(media.matches);
    };
    media.addEventListener('change', listener);
    return () => { media.removeEventListener('change', listener); };
  }, [isSmall]);

  const handleInput = (callback: (value: string) => void) => (value: string) => {
    callback(value);
    dispatch(clearError());
    dispatch(clearSuccess());
  };

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword, passwordConfirm }));
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return !user ? null : (
    <SectionElement className="px-4">
      <Heading level={1}>
        <span className="text-4xl">Account</span>
      </Heading>
      <div
        className="bg-rose-800 border-4 border-rose-800 rounded-lg shadow flex flex-col md:flex-row mt-4"
      >
        <Tabs value={currentTab} onChange={setCurrentTab} />
        <div className="bg-white rounded-lg py-4 px-4 min-h-fit grow">
          { currentTab === 'data' && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between border-b border-rose-300 px-2 py-1">
                <span className="font-semibold">Name:</span>
                <span>{ user.name }</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-semibold">Extra:</span>
                <span>???</span>
              </div>
              <div className="text-xs text-neutral-400 mt-8">
                There isn&apos;t much information to display for now...
              </div>
              <div className="text-right mt-2">
                <button
                  className={`
                    transition-all duration-200 ease-in-out
                    bg-rose-700 hover:bg-rose-800 rounded relative
                    text-white px-4 py-2 font-semibold text-lg
                  `}
                  type="button"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) }
          { currentTab === 'password' && (
            <form onSubmit={handleChangePassword}>
              <FormInput
                type="password"
                name="Old password"
                value={oldPassword}
                onInput={handleInput(setOldPassword)}
              />
              <FormInput
                type="password"
                name="New password"
                value={newPassword}
                onInput={handleInput(setNewPassword)}
              />
              <FormInput
                type="password"
                name="Confirm password"
                value={passwordConfirm}
                onInput={handleInput(setPasswordConfirm)}
              />
              <div className="text-right mt-8">
                <span className="relative">
                  <div
                    className="absolute top-0 bottom-0 left-0 right-0 md:right-auto flex flex-col justify-center"
                  >
                    <AnimatePresence custom={isSmall}>
                      { (error || success) && (
                        <motion.p
                          key={success ? 'success' : error}
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          custom={isSmall}
                          className={`
                            absolute top-0 md:top-auto right-0 whitespace-nowrap
                            ${success ? 'text-green-700' : 'text-red-700'}
                          `}
                        >
                          <FontAwesomeIcon icon={success ? faCheck : faTriangleExclamation} />
                          <span className="ml-2 font-semibold">{ success ? 'Password changed' : error }</span>
                        </motion.p>
                      ) }
                    </AnimatePresence>
                  </div>
                  <button
                    className={`
                      transition-all duration-200 ease-in-out
                      bg-rose-700 hover:bg-rose-800 rounded relative
                      text-white px-4 py-2 font-semibold text-lg
                    `}
                    type="submit"
                  >
                    Change password
                  </button>
                </span>
              </div>
            </form>
          ) }
        </div>
      </div>
    </SectionElement>
  );
};

export default AccountPage;
