import React, { useState } from 'react';
import { supabase } from './supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowRight, Sparkles, Mail, Lock, Loader2, Wifi, WifiOff, ShieldCheck } from 'lucide-react';
import { useFinancial } from './FinancialContext';

const LoginPage = () => {
  const { connectionStatus } = useFinancial();
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
      if (isSignUp) alert('Conta criada com sucesso! Você já pode acessar o sistema.');
    } catch (err) {
      alert('Erro: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2rem] shadow-2xl shadow-indigo-500/20 mb-6"
          >
            <Wallet className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-3 italic">
            MEI<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">Finanças sob controle, mente livre.</p>

          <div className="mt-6 flex justify-center">
            {connectionStatus === 'online' ? (
              <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/5 border border-emerald-400/10 px-4 py-1.5 rounded-full">
                <Wifi size={12} /> Sistema Online
              </span>
            ) : connectionStatus === 'offline' ? (
              <span className="flex items-center gap-2 text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-400/5 border border-rose-400/10 px-4 py-1.5 rounded-full">
                <WifiOff size={12} /> Offline
              </span>
            ) : (
              <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full animate-pulse">
                Sincronizando...
              </span>
            )}
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-3xl">
          <div className="flex bg-black/20 p-1.5 rounded-[1.5rem] mb-10 border border-white/5">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.1rem] transition-all ${!isSignUp ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.1rem] transition-all ${isSignUp ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Criar Conta
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-4">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="email"
                  required
                  className="w-full pl-14 pr-6 py-4.5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-base"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-4">Senha</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="password"
                  required
                  className="w-full pl-14 pr-6 py-4.5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-base"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-black font-black rounded-[1.5rem] transition-all flex items-center justify-center gap-3 hover:bg-slate-200 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-white/5 mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isSignUp ? 'Criar minha conta' : 'Acessar Painel'}
              {!loading && <ArrowRight className="w-6 h-6" />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-slate-600 text-sm font-medium">
          <ShieldCheck className="inline-block w-4 h-4 mr-1 mb-0.5" /> 
          Seus dados estão seguros e criptografados.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;