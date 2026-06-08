import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-screen bg-[#050505] selection:bg-indigo-500/30 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-10 w-full min-h-screen flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;