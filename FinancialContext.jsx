import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { calculateFinances } from '../utils/financialCalculations';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar dados quando o usuário logar
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      const [rev, exp, com, prof] = await Promise.all([
        supabase.from('revenues').select('*').order('date', { ascending: false }),
        supabase.from('expenses').select('*').order('date', { ascending: false }),
        supabase.from('commitments').select('*'),
        supabase.from('profiles').select('*').single()
      ]);

      if (rev.data) setRevenues(rev.data);
      if (exp.data) setExpenses(exp.data);
      if (com.data) setCommitments(com.data);
      if (prof.data) setSettings(prof.data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const stats = useMemo(() => {
    return calculateFinances(revenues, expenses, commitments, settings);
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

  const updateSettings = async (newSettings) => {
    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...newSettings, updated_at: new Date() });
    if (!error) setSettings(newSettings);
  };

  const toggleDarkMode = () => {
    const newMode = !settings.darkMode;
    setSettings(prev => ({ ...prev, darkMode: newMode }));
    if (user) updateSettings({ ...settings, darkMode: newMode });
  };

  if (loading && user) {
    return <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-white">Carregando painel financeiro...</div>;
  }

  return (
    <FinancialContext.Provider value={{ 
      user,
      ...stats, 
      settings, 
      revenues, 
      expenses, 
      addRevenue,
      addExpense,
      updateSettings,
      toggleDarkMode
    }}>
      <div className={settings.darkMode ? 'dark' : ''}>
        {children}
      </div>
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);