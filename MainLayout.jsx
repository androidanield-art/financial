import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full max-w-7xl p-4 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;