import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import EntriesPage from './EntriesPage';
import ExpensesPage from './ExpensesPage';
import { useFinancial } from './FinancialContext';

function App() {
  const { user } = useFinancial();

  if (!user) return <LoginPage />;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="entradas" element={<EntriesPage />} />
        <Route path="despesas" element={<ExpensesPage />} />
        <Route path="configuracoes" element={<div className="dark:text-white">Tela de Configurações (Em breve)</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;