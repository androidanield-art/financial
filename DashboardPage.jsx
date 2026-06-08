// src/pages/DashboardPage.jsx
import React from 'react';
import { useFinancial } from './FinancialContext';
import Card from './Card'; // Assumindo que Card está na raiz ou ajuste conforme necessário
import PaydayIndicator from './PaydayIndicator'; 

const DashboardPage = () => {
  const {
    faturamentoBrutoMes,
    recebimentosConfirmados,
    despesasMes,
    lucroLiquido,
    saldoCaixa,
    salarioDisponivel,
    valorReservaEmergencia,
    contasAVencer,
    settings,
    possoMePagarHoje,
  } = useFinancial();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-indigo-500 font-bold text-sm uppercase tracking-widest mb-2">Visão Geral</p>
          <h1 className="text-4xl font-black text-white tracking-tight">Dashboard</h1>
        </div>

        <a href="https://www.nfse.gov.br/EmissorNacional/" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center px-6 py-4 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-indigo-500/5 text-sm">
          Emitir Nota Fiscal (NFS-e)
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Faturamento Bruto (Mês)">
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
            {formatCurrency(faturamentoBrutoMes)}
          </p>
        </Card>
        <Card title="Recebimentos Confirmados">
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
            {formatCurrency(recebimentosConfirmados)}
          </p>
        </Card>
        <Card title="Despesas (Mês)">
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tighter">
            {formatCurrency(despesasMes)}
          </p>
        </Card>
        <Card title="Salário Disponível">
          <p className="text-3xl font-black text-amber-500 tracking-tighter">
            {formatCurrency(salarioDisponivel)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-1">
           <PaydayIndicator canPay={possoMePagarHoje} />
        </div>
        <Card title="Status do Caixa" className="lg:col-span-2">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Lucro Líquido</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(lucroLiquido)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Saldo em Caixa</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(saldoCaixa)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Reserva Emergência</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(valorReservaEmergencia)}</p>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Contas a Vencer (Próximos Dias)">
          {contasAVencer.length > 0 ? (
            <ul>
              {contasAVencer.slice(0, 5).map((item, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.description} ({item.type})
                  </span>
                  <span className={`font-medium ${item.type === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(item.value)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhuma conta a vencer próxima.</p>
          )}
        </Card>
        {/* Placeholder para gráficos */}
        <Card title="Gráfico de Evolução Mensal">
          <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
            (Gráfico virá aqui - ex: Chart.js ou Recharts)
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
