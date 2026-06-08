import React, { useState } from 'react';
import { supabase } from './supabase';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Sparkles, Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (isSignUp) alert('Conta criada! Verifique seu e-mail (se a confirmação estiver ativa) ou tente entrar.');
    } catch (err) {
      alert('Erro: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-4 z-[9999]">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-2xl shadow-indigo-500/20 mb-6"
          >
            <Wallet className="text-white w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">MEI Finance</h1>
          <p className="text-slate-400 font-medium">Gestão profissional para mentes criativas.</p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8 shadow-3xl">
          <div className="flex bg-black/40 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isSignUp ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isSignUp ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Cadastrar
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-white text-black font-black rounded-2xl transition-all flex items-center justify-center gap-2 hover:bg-slate-200 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isSignUp ? 'Criar minha conta' : 'Entrar no painel'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;