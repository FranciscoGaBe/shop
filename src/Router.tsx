import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import MainLayout from './routes/layouts/MainLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
