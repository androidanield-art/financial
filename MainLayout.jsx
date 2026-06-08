import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Lenis from '@studio-freight/lenis';

const MainLayout = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#020202] selection:bg-white selection:text-black font-sans w-full overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 lg:pl-64 w-full transition-all duration-300">
        <div className="max-w-[1600px] mx-auto p-6 md:p-12 lg:p-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default MainLayout;