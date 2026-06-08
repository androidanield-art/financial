import React from 'react';
import { useFinancial } from './FinancialContext';
import Card from './Card';
import PaydayIndicator from './PaydayIndicator';
import { ArrowUpRight, ArrowDownRight, Wallet, Target } from 'lucide-react';

const DashboardPage = () => {
  const {
    currentMonthRevenue,
    received,
    paidExpenses,
    netProfit,
    availableBalance,
    availableSalary,
    emergencyReserve,
    canPayToday,
    nextBills
  } = useFinancial();

  const format = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  return (
    <div className="w-full max-w-7xl space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">VISÃO GERAL</h1>
          <p className="text-slate-400 mt-2 font-medium">Sua saúde financeira em tempo real.</p>
        </div>
        <a 
          href="https://www.nfse.gov.br/EmissorNacional/" 
          target="_blank" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/20"
        >
          Emitir NFS-e
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Total', val: currentMonthRevenue, color: 'text-white', icon: ArrowUpRight },
          { label: 'Já Recebido', val: received, color: 'text-emerald-400', icon: Wallet },
          { label: 'Despesas', val: paidExpenses, color: 'text-rose-500', icon: ArrowDownRight },
          { label: 'Salário Livre', val: availableSalary, color: 'text-indigo-400', icon: Target },
        ].map((item, i) => (
          <Card key={i} className="border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-4 text-slate-500">
              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              <item.icon size={16} />
            </div>
            <p className={`text-3xl font-black tracking-tighter ${item.color}`}>{format(item.val)}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-1">
           <PaydayIndicator canPay={canPayToday} />
        </div>
        <Card title="Status do Caixa" className="lg:col-span-2">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Lucro Líquido</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{format(netProfit)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Saldo em Caixa</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{format(availableBalance)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Reserva Emergência</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{format(emergencyReserve)}</p>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Contas a Vencer (Próximos Dias)">
          {nextBills && nextBills.length > 0 ? (
            <ul>
              {nextBills.slice(0, 5).map((item, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.description} ({item.type})
                  </span>
                  <span className={`font-medium ${item.type === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>
                    {format(item.value)}
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
