import React, { useState } from 'react';
import { supabase } from './supabase';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10 p-4"
      >
        <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl mb-6 shadow-xl">
              <Wallet className="text-white w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">MEI Finance</h2>
            <p className="mt-2 text-slate-400 font-medium">Sua empresa, sob controle.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="group space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Senha</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20"
            >
              {loading ? 'Carregando...' : 'Acessar agora'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center">
            <button 
              onClick={handleSignUp}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Não tem conta? Comece grátis
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;