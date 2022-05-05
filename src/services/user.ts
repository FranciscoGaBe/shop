import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from './types';

interface ChangePasswordPayload {
  oldPassword: string,
  newPassword: string,
  passwordConfirm: string
}

interface UserState {
  authUser: User | undefined,
  users: User[],
  error: string,
  success: boolean
}

const initialState: UserState = {
  users: [],
  authUser: undefined,
  error: '',
  success: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User & { passwordConfirm: string }>) => {
      const { name, password, passwordConfirm } = action.payload;
      if (name.length < 3) {
        state.error = 'Name must be at least 3 characters';
        return;
      }
      if (name.length > 20) {
        state.error = 'Name can\'t exceed 20 characters';
        return;
      }
      if (password.length < 6) {
        state.error = 'Password must be at least 6 characters';
        return;
      }
      if (password.length > 32) {
        state.error = 'Password can\'t exceed 32 characters';
        return;
      }
      if (password !== passwordConfirm) {
        state.error = 'Passwords don\'t match';
        return;
      }
      if (state.users.find((user) => user.name === action.payload.name)) {
        state.error = 'Name is not available, try another one';
        return;
      }
      state.users.push(action.payload);
      state.success = true;
      state.error = '';
    },
    changePassword: (state, action: PayloadAction<ChangePasswordPayload>) => {
      const { oldPassword, newPassword, passwordConfirm } = action.payload;

      if (!state.authUser) return;

      if (oldPassword !== state.authUser.password) {
        state.error = 'Incorrect password';
        return;
      }
      if (newPassword.length < 6) {
        state.error = 'Password must be at least 6 characters';
        return;
      }
      if (newPassword.length > 32) {
        state.error = 'Password can\'t exceed 32 characters';
        return;
      }
      if (newPassword !== passwordConfirm) {
        state.error = 'Passwords don\'t match';
        return;
      }

      const user = state.users.find(({ name }) => name === (state.authUser as User).name);
      if (user) user.password = newPassword;
      state.authUser.password = newPassword;
      state.success = true;
      state.error = '';
    },
    login: (state, action: PayloadAction<User>) => {
      const { name, password } = action.payload;
      const user = state.users.find(({ name: username }) => username === name);

      if (!user) {
        state.error = 'Incorrect name';
        return;
      }
      if (password !== user.password) {
        state.error = 'Incorrect password';
        return;
      }

      state.authUser = user;
      state.success = true;
    },
    logout: (state) => {
      state.authUser = undefined;
    },
    clearError: (state) => {
      state.error = '';
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  login, logout, clearError, clearSuccess, addUser, changePassword,
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectAuthUser = (state: RootState) => state.user.authUser;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserSuccess = (state: RootState) => state.user.success;

export default userSlice.reducer;
