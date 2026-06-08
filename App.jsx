import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="entradas" element={<div className="dark:text-white">Tela de Entradas (Em breve)</div>} />
        <Route path="despesas" element={<div className="dark:text-white">Tela de Despesas (Em breve)</div>} />
        <Route path="configuracoes" element={<div className="dark:text-white">Tela de Configurações (Em breve)</div>} />
      </Route>
    </Routes>
  );
}

export default App;