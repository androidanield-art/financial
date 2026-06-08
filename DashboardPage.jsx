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
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Dashboard</h1>

      <div className="mb-8">
        <a href="https://www.nfse.gov.br/EmissorNacional/" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Emitir Nota Fiscal (NFS-e)
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Faturamento Bruto (Mês)">
          <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(faturamentoBrutoMes)}
          </p>
        </Card>
        <Card title="Recebimentos Confirmados">
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(recebimentosConfirmados)}
          </p>
        </Card>
        <Card title="Despesas (Mês)">
          <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
            {formatCurrency(despesasMes)}
          </p>
        </Card>
        <Card title="Lucro Líquido">
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {formatCurrency(lucroLiquido)}
          </p>
        </Card>
        <Card title="Saldo em Caixa">
          <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
            {formatCurrency(saldoCaixa)}
          </p>
        </Card>
        <Card title="Salário Disponível">
          <p className="text-2xl font-semibold text-teal-600 dark:text-teal-400">
            {formatCurrency(salarioDisponivel)}
          </p>
        </Card>
        <Card title="Reserva de Emergência">
          <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {formatCurrency(valorReservaEmergencia)}
          </p>
        </Card>
        <Card title="Meta de Faturamento (Mês)">
          <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            {formatCurrency(settings.monthlyGoal)}
          </p>
        </Card>
        <PaydayIndicator canPay={possoMePagarHoje} />
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
