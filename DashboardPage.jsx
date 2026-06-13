import React from 'react';
import { useFinancial } from './FinancialContext';
import Card from './Card';
import PaydayIndicator from './PaydayIndicator';
import { ArrowUpRight, ArrowDownRight, Wallet, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const {
    currentMonthRevenue,
    received,
    cashBalance,
    paidExpenses,
    netProfit,
    proLabore,
    emergencyReserve,
    canPayToday,
    nextBills,
    totalFixedCosts
  } = useFinancial();

  const format = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  // Dados fictícios para o gráfico (em um sistema real, viriam do banco)
  const chartData = [
    { name: 'Sem 1', receita: currentMonthRevenue * 0.2, despesa: paidExpenses * 0.3 },
    { name: 'Sem 2', receita: currentMonthRevenue * 0.5, despesa: paidExpenses * 0.4 },
    { name: 'Sem 3', receita: currentMonthRevenue * 0.8, despesa: paidExpenses * 0.7 },
    { name: 'Sem 4', receita: currentMonthRevenue, despesa: paidExpenses },
  ];

  return (
    <div className="w-full space-y-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <h1 className="text-8xl font-black text-white tracking-tighter italic leading-none text-gradient">OVERVIEW</h1>
          <p className="text-slate-500 mt-6 text-xl font-medium tracking-tight max-w-xl leading-relaxed">Sua inteligência financeira condensada em um único painel de alta performance.</p>
        </div>
        <a 
          href="https://www.nfse.gov.br/EmissorNacional/" 
          target="_blank" 
          className="bg-white text-black px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
        >
          Emitir NFS-e
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Faturamento', val: currentMonthRevenue, color: 'text-white', icon: ArrowUpRight },
          { label: 'Em Caixa', val: cashBalance, color: 'text-emerald-400', icon: Wallet },
          { label: 'Gastos + Fixos', val: paidExpenses + totalFixedCosts, color: 'text-rose-400', icon: ArrowDownRight },
          { label: 'Renda Pró-labore', val: proLabore, color: 'text-indigo-400', icon: Target },
        ].map((item, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700">
              <item.icon size={24} className={item.color} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">{item.label}</p>
            <p className={`text-5xl font-black tracking-tighter ${item.color} tabular-nums`}>{format(item.val)}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
           <PaydayIndicator canPay={canPayToday} />
        </div>
        <Card title="Status do Caixa" className="lg:col-span-8">
           <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Lucro Líquido</p>
                <p className="text-2xl font-black text-white tracking-tight">{format(netProfit)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Reserva de Segurança</p>
                <p className="text-2xl font-black text-indigo-400 tracking-tight">{format(emergencyReserve)}</p>
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
        <Card title="Fluxo de Caixa Mensal">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10}} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="#4f46e5" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
