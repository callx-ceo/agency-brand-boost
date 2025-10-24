-- Referral Codes Table
create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references auth.users(id) on delete cascade not null,
  referral_code text unique not null,
  created_at timestamp with time zone default now(),
  is_active boolean default true,
  total_referrals integer default 0,
  total_earned decimal(10,2) default 0,
  unique(agent_id)
);

-- Referrals Table
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_agent_id uuid references auth.users(id) on delete cascade not null,
  referred_agent_id uuid references auth.users(id) on delete cascade not null,
  referral_code text not null,
  status text not null check (status in ('pending', 'qualified', 'rewarded', 'cancelled')),
  signup_date timestamp with time zone default now(),
  first_payment_date timestamp with time zone,
  reward_date timestamp with time zone,
  referrer_ip_address text,
  referred_ip_address text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(referred_agent_id)
);

-- Referral Rewards Table
create table if not exists public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referral_id uuid references public.referrals(id) on delete cascade not null,
  referrer_agent_id uuid references auth.users(id) on delete cascade not null,
  amount decimal(10,2) not null default 100.00,
  status text not null check (status in ('pending', 'approved', 'credited', 'cancelled')),
  credited_date timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Agent Account Credits Table
create table if not exists public.agent_credits (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references auth.users(id) on delete cascade not null,
  balance decimal(10,2) default 0 not null,
  total_earned decimal(10,2) default 0 not null,
  total_spent decimal(10,2) default 0 not null,
  updated_at timestamp with time zone default now(),
  unique(agent_id)
);

-- Credit Transactions Table
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references auth.users(id) on delete cascade not null,
  transaction_type text not null check (transaction_type in ('earned', 'spent', 'adjustment')),
  amount decimal(10,2) not null,
  balance_after decimal(10,2) not null,
  source text not null check (source in ('referral', 'platform_fee', 'bonus', 'refund', 'adjustment')),
  reference_id uuid,
  description text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.referral_codes enable row level security;
alter table public.referrals enable row level security;
alter table public.referral_rewards enable row level security;
alter table public.agent_credits enable row level security;
alter table public.credit_transactions enable row level security;

-- RLS Policies for referral_codes
create policy "Agents can view their own referral code"
  on public.referral_codes for select
  using (auth.uid() = agent_id);

create policy "Agents can insert their own referral code"
  on public.referral_codes for insert
  with check (auth.uid() = agent_id);

-- RLS Policies for referrals
create policy "Agents can view referrals they made"
  on public.referrals for select
  using (auth.uid() = referrer_agent_id);

-- RLS Policies for referral_rewards
create policy "Agents can view their own rewards"
  on public.referral_rewards for select
  using (auth.uid() = referrer_agent_id);

-- RLS Policies for agent_credits
create policy "Agents can view their own credits"
  on public.agent_credits for select
  using (auth.uid() = agent_id);

-- RLS Policies for credit_transactions
create policy "Agents can view their own transactions"
  on public.credit_transactions for select
  using (auth.uid() = agent_id);

-- Function to generate unique referral code
create or replace function public.generate_referral_code()
returns text
language plpgsql
security definer
as $$
declare
  new_code text;
  code_exists boolean;
begin
  loop
    -- Generate 8-character alphanumeric code
    new_code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    
    -- Check if code already exists
    select exists(select 1 from public.referral_codes where referral_code = new_code) into code_exists;
    
    exit when not code_exists;
  end loop;
  
  return new_code;
end;
$$;

-- Function to get or create referral code for agent
create or replace function public.get_or_create_referral_code(agent_user_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_code text;
  new_code text;
begin
  -- Check if agent already has a code
  select referral_code into existing_code
  from public.referral_codes
  where agent_id = agent_user_id;
  
  if existing_code is not null then
    return existing_code;
  end if;
  
  -- Generate new code
  new_code := public.generate_referral_code();
  
  -- Insert new code
  insert into public.referral_codes (agent_id, referral_code)
  values (agent_user_id, new_code);
  
  return new_code;
end;
$$;

-- Function to add credits to agent account
create or replace function public.add_agent_credits(
  p_agent_id uuid,
  p_amount decimal,
  p_source text,
  p_reference_id uuid default null,
  p_description text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_balance decimal;
  new_balance decimal;
begin
  -- Get or create agent credits record
  insert into public.agent_credits (agent_id, balance, total_earned)
  values (p_agent_id, 0, 0)
  on conflict (agent_id) do nothing;
  
  -- Get current balance
  select balance into current_balance
  from public.agent_credits
  where agent_id = p_agent_id;
  
  new_balance := current_balance + p_amount;
  
  -- Update balance and total earned
  update public.agent_credits
  set 
    balance = new_balance,
    total_earned = total_earned + p_amount,
    updated_at = now()
  where agent_id = p_agent_id;
  
  -- Record transaction
  insert into public.credit_transactions (
    agent_id,
    transaction_type,
    amount,
    balance_after,
    source,
    reference_id,
    description
  )
  values (
    p_agent_id,
    'earned',
    p_amount,
    new_balance,
    p_source,
    p_reference_id,
    p_description
  );
end;
$$;

-- Function to validate referral (fraud prevention)
create or replace function public.validate_referral(
  p_referrer_id uuid,
  p_referred_id uuid,
  p_referred_ip text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result jsonb;
  ip_count integer;
  referrer_ip text;
begin
  result := jsonb_build_object('valid', true, 'reason', null);
  
  -- Rule 1: Can't refer yourself
  if p_referrer_id = p_referred_id then
    result := jsonb_build_object('valid', false, 'reason', 'Cannot refer yourself');
    return result;
  end if;
  
  -- Rule 2: Referred agent can only be referred once
  if exists(select 1 from public.referrals where referred_agent_id = p_referred_id) then
    result := jsonb_build_object('valid', false, 'reason', 'Agent already referred by someone else');
    return result;
  end if;
  
  -- Rule 3: Check for IP address fraud (same IP used for multiple referrals)
  select count(*) into ip_count
  from public.referrals
  where referrer_agent_id = p_referrer_id
    and referred_ip_address = p_referred_ip
    and created_at > now() - interval '30 days';
  
  if ip_count >= 3 then
    result := jsonb_build_object('valid', false, 'reason', 'Suspicious activity detected');
    return result;
  end if;
  
  -- Rule 4: Check if referrer and referred have same IP
  select referrer_ip_address into referrer_ip
  from public.referrals
  where referrer_agent_id = p_referrer_id
  limit 1;
  
  if referrer_ip = p_referred_ip then
    result := jsonb_build_object('valid', false, 'reason', 'Suspicious activity detected');
    return result;
  end if;
  
  return result;
end;
$$;

-- Indexes for performance
create index if not exists idx_referrals_referrer on public.referrals(referrer_agent_id);
create index if not exists idx_referrals_referred on public.referrals(referred_agent_id);
create index if not exists idx_referrals_status on public.referrals(status);
create index if not exists idx_referral_rewards_agent on public.referral_rewards(referrer_agent_id);
create index if not exists idx_credit_transactions_agent on public.credit_transactions(agent_id);
