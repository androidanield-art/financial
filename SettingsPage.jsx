import React, { useState, useEffect } from 'react';
import { useFinancial } from './FinancialContext';
import Card from './Card';
import { Save, Building, Target, Percent, ShieldCheck, Info, Trash2, AlertTriangle, RefreshCcw } from 'lucide-react';

const SettingsPage = () => {
  const { settings, updateSettings, resetAllData } = useFinancial();
  const [formData, setFormData] = useState({ ...settings });

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateSettings(formData);
    if (!result.error) {
      alert('Configurações atualizadas com sucesso!');
    } else {
      alert('Erro ao atualizar: ' + result.error.message);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      "ATENÇÃO: Isso apagará permanentemente todas as suas receitas, despesas e compromissos fixos. Esta ação não pode ser desfeita. Deseja continuar?"
    );
    
    if (confirmed) {
      const result = await resetAllData();
      if (result.success) alert('Todos os dados foram resetados com sucesso.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-black text-white tracking-tight">Configurações</h1>
        <p className="text-slate-500">Ajuste os parâmetros da sua inteligência financeira de MEI.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Dados do Negócio">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                  <Building size={12} /> Nome do MEI / Empresa
                </label>
                <input 
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                  <Target size={12} /> Meta de Faturamento Mensal
                </label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.monthlyGoal}
                  onChange={e => setFormData({...formData, monthlyGoal: parseFloat(e.target.value)})}
                />
              </div>
            </div>
          </Card>

          <Card title="Inteligência Financeira">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                  <Percent size={12} /> Pró-labore (% do Lucro)
                </label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.withdrawalPercentage}
                  onChange={e => setFormData({...formData, withdrawalPercentage: parseFloat(e.target.value)})}
                />
                <p className="text-[9px] text-slate-600 mt-1 flex items-center gap-1 italic"><Info size={10}/> Quanto do lucro você retira para sua vida pessoal.</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                  <ShieldCheck size={12} /> Reserva de Segurança (%)
                </label>
                <input 
                  type="number"
                  className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.emergencyReservePercentage}
                  onChange={e => setFormData({...formData, emergencyReservePercentage: parseFloat(e.target.value)})}
                />
                <p className="text-[9px] text-slate-600 mt-1 flex items-center gap-1 italic"><Info size={10}/> % do faturamento bruto guardado antes de calcular o lucro.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2"
          >
            <Save size={18} /> Salvar Configurações
          </button>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-white/5">
        <Card title="Zona de Perigo" className="border border-rose-500/20 bg-rose-500/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">Resetar Inteligência Financeira</h4>
                <p className="text-slate-500 text-sm mt-1">Apaga todas as entradas, saídas e configurações para começar do zero.</p>
              </div>
            </div>
            <button 
              onClick={handleReset}
              className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 border border-rose-500/20"
            >
              <RefreshCcw size={18} /> Resetar Tudo
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;