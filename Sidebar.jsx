import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useFinancial } from './FinancialContext';
import { LayoutDashboard, ArrowUpRight, ArrowDownLeft, Settings, LogOut, Moon, Sun, Wallet } from 'lucide-react';

const Sidebar = () => {
  const { toggleDarkMode, settings, signOut } = useFinancial();
  const location = useLocation();
  
  const linkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-1 ring-white/10' 
        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
    }`;

  return (
    <aside className="w-64 bg-[#080808] border-r border-white/5 p-6 flex flex-col h-screen sticky top-0 z-20">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">MEI Finance</h2>
      </div>
      
      <nav className="space-y-1.5 flex-1">
        <NavLink to="/" className={linkClass}><LayoutDashboard size={18} /> Dashboard</NavLink>
        <NavLink to="/entradas" className={linkClass}><ArrowUpRight size={18} /> Entradas</NavLink>
        <NavLink to="/despesas" className={linkClass}><ArrowDownLeft size={18} /> Despesas</NavLink>
        <NavLink to="/configuracoes" className={linkClass}><Settings size={18} /> Configurações</NavLink>
      </nav>

      <div className="mt-auto space-y-1 pt-6 border-t border-white/5">
        <button 
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-all text-xs font-bold"
        >
          <span className="flex items-center gap-2">
            {settings.darkMode ? <Moon size={14} /> : <Sun size={14} />} Tema
          </span>
          <span className="opacity-50">{settings.darkMode ? 'Dark' : 'Light'}</span>
        </button>
        <button 
          onClick={signOut}
          className="w-full flex items-center gap-2 p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl text-xs font-bold transition-all"
        >
          <LogOut size={14} /> Sair da conta
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;