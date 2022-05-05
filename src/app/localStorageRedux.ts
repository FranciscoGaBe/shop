import { addProduct } from '../services/cart';
import { CartProduct, User } from '../services/types';
import {
  addUser, clearError, clearSuccess, login,
} from '../services/user';
import { store } from './store';

const debounceTimeout = 1000;
let timeout = 0;

const debounce = (callback: () => void) => {
  window.clearTimeout(timeout);
  timeout = window.setTimeout(() => callback(), debounceTimeout);
};

const subscribeToStore = (myStore: typeof store) => {
  myStore.subscribe(() => {
    const { user, cart } = myStore.getState();
    const { users, authUser } = user;
    const { products } = cart;

    debounce(() => {
      window.localStorage.setItem('authUser', JSON.stringify(authUser));
      window.localStorage.setItem('users', JSON.stringify(users));
      window.localStorage.setItem('products', JSON.stringify(products));
    });
  });
};

const hidrateStore = (myStore: typeof store) => {
  const storageUser = window.localStorage.getItem('authUser');
  const authUser: User = storageUser === 'undefined' ? undefined : JSON.parse(storageUser as string);
  const users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
  const products: CartProduct[] = JSON.parse(window.localStorage.getItem('products') || '[]');

  users.forEach((user) => {
    myStore.dispatch(addUser({ ...user, passwordConfirm: user.password }));
  });

  products.forEach((product) => {
    myStore.dispatch(addProduct(product));
  });

  if (authUser) myStore.dispatch(login(authUser));
  myStore.dispatch(clearSuccess());
  myStore.dispatch(clearError());
};

const localStorageRedux = (myStore: typeof store) => {
  hidrateStore(myStore);
  subscribeToStore(myStore);
};

export default localStorageRedux;
