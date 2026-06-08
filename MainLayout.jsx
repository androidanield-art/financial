import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-indigo-500/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-10 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;