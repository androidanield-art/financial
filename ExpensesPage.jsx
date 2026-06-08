import React, { useState } from 'react';
import { useFinancial } from './FinancialContext';
import { motion } from 'framer-motion';
import { Plus, Receipt, Trash2, Tag, RefreshCw, Calendar } from 'lucide-react';
import Card from './Card';

const ExpensesPage = () => {
  const { expenses, addExpense, deleteExpense } = useFinancial();
  const [formData, setFormData] = useState({
    description: '',
    category: 'Outros',
    value: '',
    date: new Date().toISOString().split('T')[0],
    recurrent: false
  });

  const categories = ['Adobe', 'Internet', 'Aluguel', 'Energia', 'Marketing', 'Equipamentos', 'Impostos', 'Outros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...formData, value: parseFloat(formData.value) });
    setFormData({ description: '', category: 'Outros', value: '', date: new Date().toISOString().split('T')[0], recurrent: false });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-black text-white tracking-tight">Despesas</h1>
        <p className="text-slate-500">Controle suas saídas e mantenha o caixa saudável.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card title="Novo Gasto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Descrição</label>
                <input 
                  required
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Ex: Assinatura Adobe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Categoria</label>
                <select 
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Valor (R$)</label>
                <input 
                  type="number" step="0.01" required
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  value={formData.value}
                  onChange={e => setFormData({...formData, value: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Data de Vencimento</label>
                <input 
                  type="date"
                  required
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-xl">
                <input 
                  type="checkbox" 
                  checked={formData.recurrent}
                  onChange={e => setFormData({...formData, recurrent: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500 outline-none"
                />
                <label className="text-sm text-slate-300 font-medium">Recorrência</label>
              </div>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-rose-900/20">
                Registrar Saída
              </button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {expenses.map((exp) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              key={exp.id} 
              className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-rose-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{exp.description}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                    <Tag className="w-3 h-3" /> {exp.category}
                  </div>
                  {exp.recurrent && (
                    <div className="flex items-center gap-1 text-[9px] text-indigo-400 font-bold uppercase mt-1">
                      <RefreshCw size={10} /> Recorrente
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-white font-black text-sm">R$ {Number(exp.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-600 font-bold uppercase">
                    <Calendar size={10} /> {new Date(exp.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <button 
                  onClick={() => deleteExpense(exp.id)}
                  className="p-2 text-slate-700 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
              <p className="text-slate-500 font-medium">Nenhum gasto registrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExpensesPage;