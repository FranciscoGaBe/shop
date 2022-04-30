import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import MainLayout from './routes/layouts/MainLayout';

const Router = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default Router;
