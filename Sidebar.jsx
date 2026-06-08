import React from 'react';
import { Link } from 'react-router-dom';
import { useFinancial } from './FinancialContext';

const Sidebar = () => {
  const { toggleDarkMode, settings, signOut } = useFinancial();
  
  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">M</div>
        <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">MEI Finance</div>
      </div>
      
      <nav className="space-y-2 flex-1 text-sm font-bold">
        <Link to="/" className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">Dashboard</Link>
        <Link to="/entradas" className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">Entradas</Link>
        <Link to="/despesas" className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">Despesas</Link>
        <Link to="/configuracoes" className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">Configurações</Link>
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