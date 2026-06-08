import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#050505] selection:bg-indigo-500/30">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;