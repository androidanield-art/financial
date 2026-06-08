import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { calculateFinances } from './financialCalculations';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [settings, setSettings] = useState({
    companyName: '',
    monthlyGoal: 5000,
    withdrawalPercentage: 70,
    emergencyReservePercentage: 10,
    darkMode: true
  });

  // Gerenciar Sessão do Usuário
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        setConnectionStatus('offline');
      } else {
        setUser(session?.user ?? null);
        setConnectionStatus(session ? 'online' : 'checking');
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        setConnectionStatus('online');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar dados quando o usuário logar
  useEffect(() => {
    if (!user) {
      setRevenues([]);
      setExpenses([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [rev, exp, com, prof] = await Promise.all([
          supabase.from('revenues').select('*').order('date', { ascending: false }),
          supabase.from('expenses').select('*').order('date', { ascending: false }),
          supabase.from('commitments').select('*'),
          supabase.from('profiles').select('*').maybeSingle()
        ]);

        if (rev.data) setRevenues(rev.data);
        if (exp.data) setExpenses(exp.data);
        if (com.data) setCommitments(com.data);
        if (prof.data) setSettings(prev => ({ ...prev, ...prof.data }));
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const stats = useMemo(() => {
    const finances = calculateFinances(revenues, expenses, commitments, settings);
    const faturamentoBrutoMes = revenues.reduce((acc, curr) => acc + Number(curr.value), 0);
    
    return {
      ...finances,
      faturamentoBrutoMes,
      recebimentosConfirmados: finances.received,
      despesasMes: finances.paidExpenses,
      lucroLiquido: finances.received - finances.paidExpenses,
      saldoCaixa: finances.received - finances.paidExpenses,
      possoMePagarHoje: finances.canPayToday,
      valorReservaEmergencia: finances.emergencyReserve,
      contasAVencer: commitments || []
    };
  }, [revenues, expenses, commitments, settings]);

  // Ações de persistência
  const addRevenue = async (item) => {
    const { data, error } = await supabase.from('revenues').insert([{ ...item, user_id: user.id }]).select();
    if (!error) setRevenues([data[0], ...revenues]);
  };

  const addExpense = async (item) => {
    const { data, error } = await supabase.from('expenses').insert([{ ...item, user_id: user.id }]).select();
    if (!error) setExpenses([data[0], ...expenses]);
  };

  const deleteRevenue = async (id) => {
    const { error } = await supabase.from('revenues').delete().eq('id', id);
    if (!error) setRevenues(revenues.filter(r => r.id !== id));
  };

  const updateSettings = async (newSettings) => {
    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...newSettings, updated_at: new Date() });
    if (!error) setSettings(newSettings);
  };

  const toggleDarkMode = () => {
    const newMode = !settings.darkMode;
    setSettings(prev => ({ ...prev, darkMode: newMode }));
    if (user) updateSettings({ ...settings, darkMode: newMode });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse text-sm">Inicializando...</p>
        </div>
      </div>
    );
  }

  return (
    <FinancialContext.Provider value={{ 
      user,
      connectionStatus,
      ...stats, 
      settings, 
      revenues, 
      expenses, 
      addRevenue,
      addExpense,
      deleteRevenue,
      updateSettings,
      toggleDarkMode,
      signOut
    }}>
      <div className={settings.darkMode ? 'dark' : ''}>
        {children}
      </div>
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);