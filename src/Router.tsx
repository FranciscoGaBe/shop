import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './routes/CategoryPage';
import HomePage from './routes/HomePage';
import MainLayout from './routes/layouts/MainLayout';
import ProductPage from './routes/ProductPage';
import SearchPage from './routes/SearchPage';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default Router;
