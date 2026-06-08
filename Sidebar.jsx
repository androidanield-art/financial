import React from 'react';
import { Link } from 'react-router-dom';
import { useFinancial } from './FinancialContext';

const Sidebar = () => {
  const { toggleDarkMode, settings } = useFinancial();
  
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col h-screen sticky top-0">
      <div className="text-xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">MEI Finance</div>
      <nav className="space-y-4 flex-1">
        <Link to="/" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Dashboard</Link>
        <Link to="/entradas" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Entradas</Link>
        <Link to="/despesas" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Despesas</Link>
        <Link to="/configuracoes" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Configurações</Link>
      </nav>
      <button 
        onClick={toggleDarkMode}
        className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
      >
        {settings.darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
      </button>
    </aside>
  );
};
export default Sidebar;