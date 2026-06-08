import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFinancial } from './FinancialContext';
import { LayoutDashboard, ArrowUpRight, ArrowDownLeft, Settings, LogOut, Moon, Sun } from 'lucide-react';

const Sidebar = () => {
  const { toggleDarkMode, settings, signOut } = useFinancial();
  
  const linkClass = ({ isActive }) => 
    `flex items-center gap-3 p-3.5 rounded-2xl transition-all font-bold text-sm ${
      isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 p-8 flex flex-col h-screen sticky top-0 z-20">
      <div className="mb-12 pl-2">
        <h2 className="text-2xl font-black text-white tracking-tighter">MEI<span className="text-indigo-500">.</span></h2>
      </div>
      
      <nav className="space-y-2 flex-1">
        <NavLink to="/" className={linkClass}><LayoutDashboard size={18} /> Dashboard</NavLink>
        <NavLink to="/entradas" className={linkClass}><ArrowUpRight size={18} /> Entradas</NavLink>
        <NavLink to="/despesas" className={linkClass}><ArrowDownLeft size={18} /> Despesas</NavLink>
        <NavLink to="/configuracoes" className={linkClass}><Settings size={18} /> Ajustes</NavLink>
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 transition-all hover:scale-[1.02]"
        >
          <span>Aparência</span>
          <span>{settings.darkMode ? '🌙 Escuro' : '☀️ Claro'}</span>
        </button>
        <button 
          onClick={signOut}
          className="w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl text-xs font-bold text-left transition-all"
        >
          Sair da conta
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;