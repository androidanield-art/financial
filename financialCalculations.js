export const calculateFinances = (revenues, expenses, commitments, settings) => {
  const now = new Date();
  const todayDay = now.getDate();
  const todayStr = now.toISOString().split('T')[0];

  const received = revenues
    .filter(r => r.status === 'Recebido')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const paidExpenses = expenses
    .filter(e => e.status === 'Pago')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const pendingExpenses = expenses
    .filter(e => e.status === 'Pendente')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const overdueExpenses = expenses
    .filter(e => e.status === 'Pendente' && e.date < todayStr)
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const upcomingExpenses = expenses
    .filter(e => e.status === 'Pendente' && e.date >= todayStr)
    .reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Compromissos fixos (templates mensais)
  const totalFixedCosts = commitments.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Identifica compromissos que vencem nos próximos 5 dias ou já venceram este mês
  const urgentCommitments = commitments.filter(c => 
    c.due_day <= todayDay || (c.due_day <= todayDay + 5)
  );

  // Reserva de Emergência (sobre o faturamento recebido)
  const emergencyReserve = received * (settings.emergencyReservePercentage / 100);
  
  // Saldo em conta hoje (Líquido disponível)
  const cashBalance = received - paidExpenses;

  // LÓGICA DE SAÚDE FINANCEIRA:
  // Saldo Operacional Real = Saldo em conta - (Contas Pendentes + Custos Fixos Projetados + Reserva)
  // Isso garante que você só se pague se o dinheiro "sobrar" de verdade após todas as obrigações conhecidas.
  const operationalBalance = cashBalance - pendingExpenses - totalFixedCosts - emergencyReserve;

  // Renda Pró-labore = A porcentagem do lucro que o MEI retira para viver
  const proLabore = Math.max(0, operationalBalance * (settings.withdrawalPercentage / 100));

  // Indicador "Posso me pagar hoje?"
  const canPayToday = operationalBalance > 0;

  return { 
    received, 
    paidExpenses,
    pendingExpenses,
    overdueExpenses,
    upcomingExpenses,
    cashBalance,
    emergencyReserve, 
    proLabore,
    canPayToday, 
    totalFixedCosts,
    urgentCommitmentsCount: urgentCommitments.length 
  };
};