import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, children, className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
      className={`glass-card rounded-[2.5rem] p-8 transition-all duration-500 ${className}`}
    >
      {title && (
        <h3 className="text-[10px] font-black text-slate-500 mb-6 uppercase tracking-[0.25em]">
          {title}
        </h3>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;