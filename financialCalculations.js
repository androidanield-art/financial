export const calculateFinances = (revenues, expenses, commitments, settings) => {
  const now = new Date();
  const todayStr = new Date().toLocaleDateString('en-CA');
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // --- 1. REGIME DE CAIXA (DINHEIRO QUE ENTROU/SAIU DE FATO) ---
  const realizedRevenue = revenues
    .filter(r => r.status === 'Recebido')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const paidExpenses = expenses
    .filter(e => e.status === 'Pago')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const cashBalance = realizedRevenue - paidExpenses;

  // --- 2. REGIME DE COMPETÊNCIA (O QUE PERTENCE A ESTE MÊS) ---
  const totalMonthlyRevenue = revenues
    .filter(r => {
      // Garante parsing correto ignorando fuso horário para o mês atual
      const d = new Date(r.date + 'T12:00:00');
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const totalFixedCosts = commitments.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  const variableExpenses = expenses
    .filter(e => {
      const d = new Date(e.date + 'T12:00:00');
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const totalExpectedCosts = totalFixedCosts + variableExpenses;
  const netProfit = totalMonthlyRevenue - totalExpectedCosts;

  // --- 3. ANÁLISE DE SAÚDE E PENDÊNCIAS ---
  const overdueExpenses = expenses
    .filter(e => e.status === 'Pendente' && e.date < todayStr)
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const upcomingExpenses = expenses
    .filter(e => e.status === 'Pendente' && e.date >= todayStr)
    .reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Reserva de Emergência (Prudência: Calculada sobre o faturamento recebido)
  const emergencyReserve = realizedRevenue * (settings.emergencyReservePercentage / 100);
  
  // Saldo Operacional Livre (O que sobra após prever TODAS as contas do mês e a reserva)
  const operationalBalance = cashBalance - (totalExpectedCosts - paidExpenses) - emergencyReserve;

  // Pró-labore Disponível (Limitado pelo lucro real e pelo dinheiro em caixa)
  const proLaboreCalculated = netProfit > 0 ? netProfit * (settings.withdrawalPercentage / 100) : 0;
  const proLabore = Math.max(0, Math.min(proLaboreCalculated, operationalBalance));

  // --- 4. DADOS PARA O GRÁFICO (FLUXO DIÁRIO) ---
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const timelineData = Array.from({ length: Math.ceil(daysInMonth / 5) }, (_, i) => {
    const dayLimit = (i + 1) * 5;
    const revUntil = revenues
      .filter(r => {
        const d = new Date(r.date + 'T12:00:00');
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && d.getDate() <= dayLimit && r.status === 'Recebido';
      })
      .reduce((acc, curr) => acc + Number(curr.value), 0);
    const expUntil = expenses
      .filter(e => {
        const d = new Date(e.date + 'T12:00:00');
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && d.getDate() <= dayLimit && e.status === 'Pago';
      })
      .reduce((acc, curr) => acc + Number(curr.value), 0);
    
    return {
      name: `Dia ${dayLimit}`,
      receita: revUntil,
      saldo: revUntil - expUntil
    };
  });

  return { 
    realizedRevenue,
    paidExpenses,
    overdueExpenses,
    upcomingExpenses,
    cashBalance,
    emergencyReserve, 
    proLabore,
    netProfit,
    canPayToday: operationalBalance > 0 && cashBalance > 0,
    totalFixedCosts,
    timelineData
  };
};