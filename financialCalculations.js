export const calculateFinances = (revenues, expenses, commitments, settings) => {
  const todayDay = new Date().getDate();

  const received = revenues
    .filter(r => r.status === 'Recebido')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const paidExpenses = expenses
    .filter(e => e.status === 'Pago')
    .reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Compromissos fixos (templates mensais)
  const commitmentsTotal = commitments.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  const totalFixedCosts = commitmentsTotal;
  
  // Identifica compromissos que vencem nos próximos 5 dias ou já venceram este mês
  const urgentCommitments = commitments.filter(c => 
    c.due_day <= todayDay || (c.due_day <= todayDay + 5)
  );

  // Reserva de Emergência (sobre o faturamento recebido)
  const emergencyReserve = received * (settings.emergencyReservePercentage / 100);
  
  // Saldo em conta hoje (Líquido disponível)
  const cashBalance = received - paidExpenses;

  // Saldo Operacional = O que sobra para dividir entre MEI e Empresa
  const operationalBalance = cashBalance - totalFixedCosts - emergencyReserve;

  // Renda Pró-labore = A porcentagem do lucro que o MEI retira para viver
  const proLabore = Math.max(0, operationalBalance * (settings.withdrawalPercentage / 100));

  // Indicador "Posso me pagar hoje?"
  const canPayToday = operationalBalance > 0 && received > (paidExpenses + totalFixedCosts);

  return { 
    received, 
    paidExpenses,
    cashBalance,
    emergencyReserve, 
    proLabore,
    canPayToday, 
    totalFixedCosts,
    urgentCommitmentsCount: urgentCommitments.length 
  };
};