import React, { useState } from 'react';
import { useFinancial } from './FinancialContext';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calendar, User, Briefcase, DollarSign } from 'lucide-react';
import Card from './Card';

const EntriesPage = () => {
  const { revenues, addRevenue, deleteRevenue } = useFinancial();
  const [formData, setFormData] = useState({
    client: '',
    service: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    status: 'A receber'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRevenue({ ...formData, value: parseFloat(formData.value) });
    setFormData({ client: '', service: '', value: '', date: new Date().toISOString().split('T')[0], status: 'A receber' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black text-white tracking-tight">Entradas</h1>
        <p className="text-slate-500">Registre seus serviços e controle recebimentos.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <Card title="Novo Serviço">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cliente</label>
                <input 
                  required
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.client}
                  onChange={e => setFormData({...formData, client: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Valor (R$)</label>
                <input 
                  type="number" step="0.01" required
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.value}
                  onChange={e => setFormData({...formData, value: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Status</label>
                <select 
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="A receber">A receber</option>
                  <option value="Recebido">Recebido</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Salvar Entrada
              </button>
            </form>
          </Card>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2 space-y-4">
          {revenues.map((rev) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              key={rev.id} 
              className="bg-slate-900 border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rev.status === 'Recebido' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{rev.client}</h4>
                  <p className="text-xs text-slate-500">{rev.date}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div>
                  <p className="text-white font-black text-sm">R$ {rev.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${rev.status === 'Recebido' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {rev.status}
                  </span>
                </div>
                {/* Botão de deletar (opcional) */}
              </div>
            </motion.div>
          ))}
          {revenues.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]">
              <p className="text-slate-500 font-medium">Nenhuma entrada registrada ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntriesPage;