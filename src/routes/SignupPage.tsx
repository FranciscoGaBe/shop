import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FormInput from '../components/FormInput';
import Heading from '../components/Heading';
import {
  addUser,
  clearError, clearSuccess, selectAuthUser, selectUserError, selectUserSuccess,
} from '../services/user';

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const error = useAppSelector(selectUserError);
  const success = useAppSelector(selectUserSuccess);
  const authUser = useAppSelector(selectAuthUser);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser, navigate]);

  useEffect(() => {
    if (!success) return;
    dispatch(clearSuccess());
    navigate('/signin');
  }, [success, navigate, dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addUser({ name, password, passwordConfirm }));
  };

  const handleInput = (callback: (value: string) => void) => (value: string) => {
    callback(value);
    dispatch(clearError());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-4">
      <form
        className="bg-white shadow p-4 rounded-lg pointer-events-auto text-center w-96 max-w-full"
        onSubmit={handleSubmit}
      >
        <Heading level={1}>Sign Up</Heading>
        <div className="mb-8 mt-4 px-2">
          <FormInput type="text" value={name} name="Name" onInput={handleInput(setName)} />
          <FormInput type="password" value={password} name="Password" onInput={handleInput(setPassword)} />
          <FormInput
            type="password"
            value={passwordConfirm}
            name="Confirm password"
            onInput={handleInput(setPasswordConfirm)}
          />
        </div>
        <div className="relative">
          <AnimatePresence>
            { !!error && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -25, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              className="font-semibold text-red-700 overflow-hidden absolute top-0 left-0 right-0"
            >
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span className="ml-2">
                { error }
              </span>
            </motion.div>
            ) }
          </AnimatePresence>
          <button
            className={`
              w-full bg-rose-600 hover:bg-rose-800 text-white
              font-bold py-2 rounded-lg relative
            `}
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
