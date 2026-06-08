import React from 'react';
import Card from './Card';

const PaydayIndicator = ({ canPay }) => {
  return (
    <Card title="Posso me pagar hoje?">
      <div className="flex items-center justify-center py-2">
        {canPay ? (
          <span className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
            🟢 SIM
          </span>
        ) : (
          <span className="text-3xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            🔴 NÃO
          </span>
        )}
      </div>
    </Card>
  );
};

export default PaydayIndicator;