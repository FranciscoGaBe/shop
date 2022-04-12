import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayoutFooter from './MainLayoutFooter';
import MainLayoutHeader from './MainLayoutHeader';

const MainLayout: React.FC = () => (
  <div className="pb-16">
    <MainLayoutHeader />
    <main className="bg-gray-100 relative z-10">
      <Outlet />
    </main>
    <MainLayoutFooter />
  </div>
);

export default MainLayout;
