import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] selection:bg-indigo-500/30">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;