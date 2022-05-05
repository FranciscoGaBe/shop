import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CartPage from './routes/CartPage';
import CategoryPage from './routes/CategoryPage';
import HomePage from './routes/HomePage';
import MainLayout from './routes/layouts/MainLayout';
import SigninPage from './routes/SigninPage';
import ProductPage from './routes/ProductPage';
import SearchPage from './routes/SearchPage';
import SignupPage from './routes/SignupPage';
import AccountPage from './routes/AccountPage';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default Router;
