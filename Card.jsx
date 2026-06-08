import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-all hover:shadow-md ${className}`}>
      {title && (
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[0.1em]">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;