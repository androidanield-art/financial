-- 1. Tabela de Perfis (Configurações do Usuário)
-- 1. Tabela de Perfis (Configurações de Inteligência Financeira do MEI)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT DEFAULT '',
  monthly_goal NUMERIC DEFAULT 5000, -- Meta de faturamento
  withdrawal_percentage NUMERIC DEFAULT 70, -- % de Pró-labore sobre o lucro
  emergency_reserve_percentage NUMERIC DEFAULT 10, -- % de Reserva sobre o bruto
  pro_labore NUMERIC DEFAULT 1412, -- Valor base/referência
  dark_mode BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Receitas (Entradas)
CREATE TABLE IF NOT EXISTS public.revenues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  client TEXT NOT NULL,
  service TEXT,
  value NUMERIC NOT NULL,
  status TEXT DEFAULT 'A receber' CHECK (status IN ('A receber', 'Recebido', 'Cancelado')),
  "date" DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Despesas
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  description TEXT NOT NULL,
  category TEXT,
  value NUMERIC NOT NULL,
  "date" DATE NOT NULL,
  status TEXT DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Pago', 'Cancelado')),
  recurrent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para acelerar o cálculo do saldo no Dashboard
CREATE INDEX IF NOT EXISTS idx_expenses_user_status ON public.expenses(user_id, status);
CREATE INDEX IF NOT EXISTS idx_revenues_user_status ON public.revenues(user_id, status);

-- 4. Tabela de Compromissos Fixos
CREATE TABLE IF NOT EXISTS public.commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  description TEXT NOT NULL,
  value NUMERIC NOT NULL,
  due_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso (Segurança)
DO $$ 
BEGIN
    -- Perfil: O usuário pode ler e atualizar apenas seu próprio perfil
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar o próprio perfil') THEN
        CREATE POLICY "Usuários podem gerenciar o próprio perfil" ON public.profiles FOR ALL USING (auth.uid() = id);
    END IF;

    -- Receitas: O usuário pode gerenciar apenas suas próprias receitas
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias receitas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias receitas" ON public.revenues FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- Despesas: O usuário pode gerenciar apenas suas próprias despesas
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar suas próprias despesas') THEN
        CREATE POLICY "Usuários podem gerenciar suas próprias despesas" ON public.expenses FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- Compromissos: O usuário pode gerenciar apenas seus próprios compromissos
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Usuários podem gerenciar seus próprios compromissos') THEN
        CREATE POLICY "Usuários podem gerenciar seus próprios compromissos" ON public.commitments FOR ALL USING (auth.uid() = user_id);
    END IF;
END;
$$;

-- Trigger para criar perfil automaticamente ao criar usuário no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name)
  VALUES (new.id, '');
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();