export const calculateFinances = (revenues, expenses, commitments, settings) => {
  const received = revenues
    .filter(r => r.status === 'Recebido')
    .reduce((acc, curr) => acc + Number(curr.value), 0);

  const paidExpenses = expenses.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  const fixedCommitments = commitments.reduce((acc, curr) => acc + Number(curr.value), 0);

  // Reserva de Emergência (sobre o faturamento recebido)
  const emergencyReserve = received * (settings.emergencyReservePercentage / 100);

  // Saldo Disponível = Recebido - Despesas Pagas - Reserva - Compromissos Fixos Futuros
  const availableBalance = received - paidExpenses - emergencyReserve - fixedCommitments;

  // Salário Disponível = Saldo Disponível * percentual configurado
  const availableSalary = Math.max(0, availableBalance * (settings.withdrawalPercentage / 100));

  // Indicador "Posso me pagar hoje?"
  const canPayToday = availableBalance > 0 && received > (paidExpenses + fixedCommitments);

  return { received, paidExpenses, emergencyReserve, availableBalance, availableSalary, canPayToday };
};