export const calculateFinances = (revenues, expenses, commitments, settings) => {
  const todayDay = new Date().getDate();

  const received = revenues
    .filter(r => r.status === 'Recebido')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const paidExpenses = expenses.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Compromissos fixos (templates mensais)
  const commitmentsTotal = commitments.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  const totalFixedCosts = commitmentsTotal;
  
  // Identifica compromissos que vencem nos próximos 5 dias ou já venceram este mês
  const urgentCommitments = commitments.filter(c => 
    c.due_day <= todayDay || (c.due_day <= todayDay + 5)
  );

  // Reserva de Emergência (sobre o faturamento recebido)
  const emergencyReserve = received * (settings.emergencyReservePercentage / 100);

  // Pró-labore fixo definido nas configurações
  const proLabore = Number(settings.proLabore || 0);

  // Saldo Disponível = Recebido - Despesas Pagas - Reserva - Compromissos Fixos Futuros
  const availableBalance = received - paidExpenses - emergencyReserve - totalFixedCosts - proLabore;

  // Salário Disponível = Saldo Disponível * percentual configurado
  const availableSalary = proLabore + Math.max(0, availableBalance * (settings.withdrawalPercentage / 100));

  // Indicador "Posso me pagar hoje?"
  const canPayToday = availableBalance > 0 && received > (paidExpenses + totalFixedCosts);

  return { 
    received, 
    paidExpenses, 
    emergencyReserve, 
    availableBalance, 
    availableSalary, 
    canPayToday, 
    totalFixedCosts,
    urgentCommitmentsCount: urgentCommitments.length 
  };
};