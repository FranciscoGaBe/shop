import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MainLayout from './routes/layouts/MainLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
