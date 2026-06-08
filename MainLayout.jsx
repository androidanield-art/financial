import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-indigo-500/30 font-sans w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 lg:pl-64 w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;