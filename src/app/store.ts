import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { shopApi } from '../services/shop';
import cartReducer from '../services/cart';
import userReducer from '../services/user';
import localStorageRedux from './localStorageRedux';

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
});

localStorageRedux(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
