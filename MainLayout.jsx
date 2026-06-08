import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-indigo-500/30 font-sans w-full">
      <Sidebar />
      <main className="flex-1 lg:ml-64 min-h-screen relative flex flex-col items-center">
        <div className="w-full max-w-7xl p-6 md:p-10 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;