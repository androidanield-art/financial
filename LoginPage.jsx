import React, { useState } from 'react';
import { supabase } from './supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Conta criada com sucesso! Tente fazer login agora.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 selection:bg-indigo-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent dark:from-indigo-900/10"></div>
      
      <div className="max-w-md w-full z-10">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200 dark:shadow-none">
              <span className="text-white text-2xl font-black">MF</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Bem-vindo de volta</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Controle seu MEI com inteligência.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">E-mail</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Senha</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Acessar Painel'}
              </button>
              <button 
                type="button" 
                onClick={handleSignUp} 
                disabled={loading} 
                className="w-full py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                Criar nova conta
              </button>
            </div>
          </form>
        </div>
        <p className="mt-8 text-center text-slate-400 text-sm">
          &copy; 2024 MEI Finance. Simples. Profissional.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;