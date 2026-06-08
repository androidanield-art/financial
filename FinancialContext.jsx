import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { calculateFinances } from './financialCalculations';
const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [settings, setSettings] = useState({
    companyName: '',
    monthlyGoal: 5000,
    withdrawalPercentage: 70,
    emergencyReservePercentage: 10,
    proLabore: 1412,
    darkMode: true
  });

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (mounted) {
          setUser(session?.user ?? null);
          setConnectionStatus('online');
          setIsInitializing(false);
        }
      } catch (err) {
        console.error("Erro ao carregar sessão:", err);
        if (mounted) {
          setConnectionStatus('offline');
          setIsInitializing(false);
        }
      }
    }

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (session) setConnectionStatus('online');
        setLoading(false);
      }
    });

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!user) return;

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
        if (prof.data) setSettings({
          companyName: prof.data.company_name,
          monthlyGoal: prof.data.monthly_goal,
          withdrawalPercentage: prof.data.withdrawal_percentage,
          emergencyReservePercentage: prof.data.emergency_reserve_percentage,
          proLabore: prof.data.pro_labore,
          darkMode: prof.data.dark_mode
        });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const financialStats = useMemo(() => {
    const finances = calculateFinances(revenues, expenses, commitments, settings);
    const currentMonthRevenue = revenues.reduce((acc, curr) => acc + Number(curr.value), 0);
    
    return {
      ...finances,
      currentMonthRevenue,
      netProfit: finances.received - finances.paidExpenses,
      nextBills: commitments || []
    };
  }, [revenues, expenses, commitments, settings]);

  const actions = {
    addRevenue: async (item) => {
      const { data, error } = await supabase.from('revenues').insert([{ ...item, user_id: user.id }]).select();
      if (!error) setRevenues(prev => [data[0], ...prev]);
      return { error };
    },
    updateRevenue: async (id, item) => {
      const { data, error } = await supabase
        .from('revenues')
        .update(item)
        .eq('id', id)
        .select();
      if (!error && data) {
        setRevenues(prev => prev.map(r => (r.id === id ? data[0] : r)));
      }
      return { error };
    },
    addExpense: async (item) => {
      const { data, error } = await supabase.from('expenses').insert([{ ...item, user_id: user.id }]).select();
      if (!error) setExpenses(prev => [data[0], ...prev]);
      return { error };
    },
    updateExpense: async (id, item) => {
      const { data, error } = await supabase
        .from('expenses')
        .update(item)
        .eq('id', id)
        .select();
      if (!error && data) {
        setExpenses(prev => prev.map(e => (e.id === id ? data[0] : e)));
      }
      return { error };
    },
    deleteExpense: async (id) => {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (!error) setExpenses(prev => prev.filter(e => e.id !== id));
    },
    deleteRevenue: async (id) => {
      const { error } = await supabase.from('revenues').delete().eq('id', id);
      if (!error) setRevenues(prev => prev.filter(r => r.id !== id));
    },
    updateSettings: async (newSettings) => {
      const { error } = await supabase.from('profiles').upsert({ 
        id: user.id, 
        company_name: newSettings.companyName,
        monthly_goal: newSettings.monthlyGoal,
        withdrawal_percentage: newSettings.withdrawalPercentage,
        emergency_reserve_percentage: newSettings.emergencyReservePercentage,
        pro_labore: newSettings.proLabore,
        dark_mode: newSettings.darkMode,
        updated_at: new Date() 
      });
      if (!error) setSettings(newSettings);
    },
    signOut: () => supabase.auth.signOut(),
    toggleDarkMode: () => setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }))
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <FinancialContext.Provider value={{ user, connectionStatus, ...financialStats, settings, revenues, expenses, ...actions }}>
      <div className={settings.darkMode ? 'dark' : ''}>
        {children}
      </div>
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);