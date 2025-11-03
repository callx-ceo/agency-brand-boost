-- Create enum for payment mode
CREATE TYPE public.payment_mode AS ENUM ('agency_paid', 'agent_paid');

-- Create agent payment settings table
CREATE TABLE public.agent_payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL UNIQUE,
  payment_mode payment_mode NOT NULL DEFAULT 'agency_paid',
  platform_fee DECIMAL(10, 2) NOT NULL DEFAULT 99.00,
  call_credits_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  billing_cycle_start TIMESTAMP WITH TIME ZONE,
  billing_cycle_end TIMESTAMP WITH TIME ZONE,
  auto_refill_enabled BOOLEAN DEFAULT false,
  auto_refill_threshold DECIMAL(10, 2) DEFAULT 25.00,
  auto_refill_amount DECIMAL(10, 2) DEFAULT 100.00,
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payment methods table
CREATE TABLE public.agent_payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  stripe_payment_method_id TEXT NOT NULL,
  card_brand TEXT,
  card_last4 TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create call credits transactions table
CREATE TABLE public.call_credits_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  transaction_type TEXT NOT NULL, -- 'deposit', 'call_charge', 'refund', 'adjustment'
  amount DECIMAL(10, 2) NOT NULL,
  balance_after DECIMAL(10, 2) NOT NULL,
  description TEXT,
  related_call_id UUID,
  stripe_charge_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subscription invoices table
CREATE TABLE public.agent_subscription_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2),
  call_credits DECIMAL(10, 2),
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  stripe_invoice_id TEXT,
  billing_period_start TIMESTAMP WITH TIME ZONE,
  billing_period_end TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agent_payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_credits_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_subscription_invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agent_payment_settings
CREATE POLICY "Agents can view own payment settings"
  ON public.agent_payment_settings FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "Agents can update own payment settings"
  ON public.agent_payment_settings FOR UPDATE
  USING (auth.uid() = agent_id);

CREATE POLICY "Admins can manage all payment settings"
  ON public.agent_payment_settings FOR ALL
  USING (public.has_role(auth.uid(), 'superadmin'));

-- RLS Policies for agent_payment_methods
CREATE POLICY "Agents can view own payment methods"
  ON public.agent_payment_methods FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "Agents can manage own payment methods"
  ON public.agent_payment_methods FOR ALL
  USING (auth.uid() = agent_id);

-- RLS Policies for call_credits_transactions
CREATE POLICY "Agents can view own transactions"
  ON public.call_credits_transactions FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "Admins can view all transactions"
  ON public.call_credits_transactions FOR SELECT
  USING (public.has_role(auth.uid(), 'superadmin'));

-- RLS Policies for agent_subscription_invoices
CREATE POLICY "Agents can view own invoices"
  ON public.agent_subscription_invoices FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "Admins can manage all invoices"
  ON public.agent_subscription_invoices FOR ALL
  USING (public.has_role(auth.uid(), 'superadmin'));

-- Create indexes
CREATE INDEX idx_agent_payment_settings_agent_id ON public.agent_payment_settings(agent_id);
CREATE INDEX idx_agent_payment_methods_agent_id ON public.agent_payment_methods(agent_id);
CREATE INDEX idx_call_credits_transactions_agent_id ON public.call_credits_transactions(agent_id);
CREATE INDEX idx_agent_subscription_invoices_agent_id ON public.agent_subscription_invoices(agent_id);

-- Create trigger for updated_at
CREATE TRIGGER update_agent_payment_settings_updated_at
  BEFORE UPDATE ON public.agent_payment_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_payment_methods_updated_at
  BEFORE UPDATE ON public.agent_payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();