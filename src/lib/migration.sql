-- ============================================================
-- OCEANIER DATABASE MIGRATION — Module 01: Auth & Database
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── ENUM TYPES ───────────────────────────────────────────────────────────────

create type user_role as enum ('user', 'admin');
create type business_status as enum ('active', 'inactive', 'deleted');
create type subscription_plan as enum ('trial', 'starter', 'growth', 'business', 'enterprise');
create type subscription_status as enum ('trial', 'active', 'cancelled', 'expired');
create type billing_cycle as enum ('monthly', 'annual');
create type fuel_tx_type as enum ('credit', 'debit', 'purchase');
create type solution_status as enum ('draft', 'published', 'archived');
create type install_status as enum ('active', 'inactive', 'error');
create type knowledge_type as enum ('website', 'pdf', 'faq', 'text', 'url');
create type source_status as enum ('pending', 'processing', 'ready', 'error');
create type crawl_status as enum ('pending', 'crawling', 'done', 'error');
create type execution_status as enum ('running', 'completed', 'failed');
create type request_status as enum ('pending', 'reviewing', 'quoted', 'accepted', 'building', 'completed', 'cancelled');
create type request_priority as enum ('low', 'normal', 'high');

-- ─── PROFILES ─────────────────────────────────────────────────────────────────

create table public.profiles (
  id           uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users(id) on delete cascade,
  full_name    text,
  email        text not null,
  avatar_url   text,
  country      text,
  timezone     text default 'UTC',
  role         user_role not null default 'user',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (auth_user_id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── BUSINESSES ───────────────────────────────────────────────────────────────

create table public.businesses (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  slug          text unique not null,
  industry      text,
  website       text,
  description   text,
  logo_url      text,
  country       text,
  timezone      text default 'UTC',
  currency      text not null default 'USD',
  business_size text,
  status        business_status not null default 'active',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── BUSINESS SETTINGS ────────────────────────────────────────────────────────

create table public.business_settings (
  id                  uuid primary key default gen_random_uuid(),
  business_id         uuid unique not null references public.businesses(id) on delete cascade,
  language            text not null default 'en',
  default_ai_provider text,
  timezone            text,
  notification_email  text,
  branding_color      text default '#AEEC01',
  created_at          timestamptz not null default now()
);

-- ─── SUBSCRIPTIONS ────────────────────────────────────────────────────────────

create table public.subscriptions (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid unique not null references public.profiles(id) on delete cascade,
  plan          subscription_plan not null default 'trial',
  billing_cycle billing_cycle not null default 'monthly',
  status        subscription_status not null default 'trial',
  started_at    timestamptz not null default now(),
  expires_at    timestamptz
);

-- ─── FUEL WALLET ──────────────────────────────────────────────────────────────

create table public.fuel_wallet (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid unique not null references public.profiles(id) on delete cascade,
  balance       integer not null default 0 check (balance >= 0),
  trial_balance integer not null default 0 check (trial_balance >= 0),
  last_updated  timestamptz not null default now()
);

-- ─── FUEL TRANSACTIONS ────────────────────────────────────────────────────────

create table public.fuel_transactions (
  id          uuid primary key default gen_random_uuid(),
  wallet_id   uuid not null references public.fuel_wallet(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete set null,
  type        fuel_tx_type not null,
  credits     integer not null,
  usd_cost    numeric(10, 4),
  description text not null,
  created_at  timestamptz not null default now()
);

-- ─── AI SOLUTIONS (master catalog) ───────────────────────────────────────────

create table public.ai_solutions (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text unique not null,
  description     text,
  category        text not null,
  icon            text,
  thumbnail       text,
  status          solution_status not null default 'draft',
  is_featured     boolean not null default false,
  current_version text,
  created_at      timestamptz not null default now()
);

-- ─── SOLUTION VERSIONS ────────────────────────────────────────────────────────

create table public.solution_versions (
  id                 uuid primary key default gen_random_uuid(),
  solution_id        uuid not null references public.ai_solutions(id) on delete cascade,
  version            text not null,
  configuration_json jsonb not null default '{}',
  workflow_json      jsonb not null default '{}',
  prompt_json        jsonb not null default '{}',
  published          boolean not null default false,
  created_at         timestamptz not null default now(),
  unique (solution_id, version)
);

-- ─── INSTALLED SOLUTIONS ──────────────────────────────────────────────────────

create table public.installed_solutions (
  id             uuid primary key default gen_random_uuid(),
  business_id    uuid not null references public.businesses(id) on delete cascade,
  solution_id    uuid not null references public.ai_solutions(id),
  version_id     uuid references public.solution_versions(id),
  display_name   text not null,
  status         install_status not null default 'active',
  installed_at   timestamptz not null default now(),
  last_execution timestamptz,
  unique (business_id, solution_id)
);

-- ─── SOLUTION CONFIGURATION ───────────────────────────────────────────────────

create table public.solution_configuration (
  id                    uuid primary key default gen_random_uuid(),
  installed_solution_id uuid unique not null references public.installed_solutions(id) on delete cascade,
  configuration_json    jsonb not null default '{}',
  prompt_overrides      jsonb not null default '{}',
  trigger_settings      jsonb not null default '{}',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ─── KNOWLEDGE SOURCES ────────────────────────────────────────────────────────

create table public.knowledge_sources (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  type        knowledge_type not null,
  name        text not null,
  status      source_status not null default 'pending',
  created_at  timestamptz not null default now()
);

-- ─── KNOWLEDGE FILES ──────────────────────────────────────────────────────────

create table public.knowledge_files (
  id                  uuid primary key default gen_random_uuid(),
  knowledge_source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  filename            text not null,
  storage_path        text not null,
  mime_type           text not null,
  file_size           bigint not null,
  processed           boolean not null default false,
  created_at          timestamptz not null default now()
);

-- ─── WEBSITE SOURCES ──────────────────────────────────────────────────────────

create table public.website_sources (
  id                  uuid primary key default gen_random_uuid(),
  knowledge_source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  website_url         text not null,
  crawl_depth         integer not null default 2,
  last_crawled        timestamptz,
  status              crawl_status not null default 'pending'
);

-- ─── FAQs ────────────────────────────────────────────────────────────────────

create table public.faqs (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  question    text not null,
  answer      text not null,
  created_at  timestamptz not null default now()
);

-- ─── AI PROVIDERS ─────────────────────────────────────────────────────────────

create table public.ai_providers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  model       text not null unique,
  provider    text not null,
  cost_input  numeric(10, 6) not null default 0,
  cost_output numeric(10, 6) not null default 0,
  enabled     boolean not null default true
);

-- Seed initial AI providers
insert into public.ai_providers (name, model, provider, cost_input, cost_output) values
  ('GPT-4o',           'gpt-4o',               'openai',    0.005,   0.015),
  ('GPT-4o Mini',      'gpt-4o-mini',           'openai',    0.00015, 0.0006),
  ('Claude Sonnet',    'claude-sonnet-4-6',     'anthropic', 0.003,   0.015),
  ('Claude Haiku',     'claude-haiku-4-5',      'anthropic', 0.00025, 0.00125),
  ('Gemini 2.0 Flash', 'gemini-2.0-flash',      'google',    0.0,     0.0),
  ('Kimi k1.5',        'kimi-k1-5',             'moonshot',  0.005,   0.005);

-- ─── WORKFLOW EXECUTIONS ──────────────────────────────────────────────────────

create table public.workflow_executions (
  id                    uuid primary key default gen_random_uuid(),
  business_id           uuid not null references public.businesses(id) on delete cascade,
  installed_solution_id uuid not null references public.installed_solutions(id) on delete cascade,
  trigger_type          text not null,
  status                execution_status not null default 'running',
  started_at            timestamptz not null default now(),
  finished_at           timestamptz,
  fuel_used             integer not null default 0,
  provider              text,
  model                 text
);

-- ─── EXECUTION LOGS ───────────────────────────────────────────────────────────

create table public.execution_logs (
  id           uuid primary key default gen_random_uuid(),
  execution_id uuid not null references public.workflow_executions(id) on delete cascade,
  step_name    text not null,
  status       execution_status not null,
  input_json   jsonb not null default '{}',
  output_json  jsonb not null default '{}',
  duration_ms  integer,
  created_at   timestamptz not null default now()
);

-- ─── CUSTOM SOLUTION REQUESTS ─────────────────────────────────────────────────

create table public.custom_solution_requests (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  business_id  uuid references public.businesses(id) on delete set null,
  title        text not null,
  description  text not null,
  website      text,
  priority     request_priority not null default 'normal',
  status       request_status not null default 'pending',
  admin_notes  text,
  quoted_price numeric(10, 2),
  created_at   timestamptz not null default now()
);

-- ─── STORAGE BUCKETS ──────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public) values
  ('avatars',         'avatars',         true),
  ('business-logos',  'business-logos',  true),
  ('knowledge-files', 'knowledge-files', false),
  ('solution-assets', 'solution-assets', true),
  ('temp-uploads',    'temp-uploads',    false)
on conflict (id) do nothing;

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

alter table public.profiles                 enable row level security;
alter table public.businesses               enable row level security;
alter table public.business_settings        enable row level security;
alter table public.subscriptions            enable row level security;
alter table public.fuel_wallet              enable row level security;
alter table public.fuel_transactions        enable row level security;
alter table public.installed_solutions      enable row level security;
alter table public.solution_configuration   enable row level security;
alter table public.knowledge_sources        enable row level security;
alter table public.knowledge_files          enable row level security;
alter table public.website_sources          enable row level security;
alter table public.faqs                     enable row level security;
alter table public.workflow_executions      enable row level security;
alter table public.execution_logs           enable row level security;
alter table public.custom_solution_requests enable row level security;
-- Public tables (read-only for all authenticated users)
alter table public.ai_solutions    enable row level security;
alter table public.solution_versions enable row level security;
alter table public.ai_providers    enable row level security;

-- Helper: get profile id from auth.uid()
create or replace function public.my_profile_id()
returns uuid language sql stable security definer as $$
  select id from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select using (auth_user_id = auth.uid());
create policy "Users can update own profile"
  on public.profiles for update using (auth_user_id = auth.uid());

-- businesses
create policy "Users can view own businesses"
  on public.businesses for select using (profile_id = public.my_profile_id());
create policy "Users can insert own businesses"
  on public.businesses for insert with check (profile_id = public.my_profile_id());
create policy "Users can update own businesses"
  on public.businesses for update using (profile_id = public.my_profile_id());

-- business_settings
create policy "Users can manage own business settings"
  on public.business_settings for all using (
    business_id in (select id from public.businesses where profile_id = public.my_profile_id())
  );

-- subscriptions
create policy "Users can view own subscription"
  on public.subscriptions for select using (profile_id = public.my_profile_id());
create policy "Users can insert own subscription"
  on public.subscriptions for insert with check (profile_id = public.my_profile_id());

-- fuel_wallet
create policy "Users can view own wallet"
  on public.fuel_wallet for select using (profile_id = public.my_profile_id());
create policy "Users can insert own wallet"
  on public.fuel_wallet for insert with check (profile_id = public.my_profile_id());

-- fuel_transactions
create policy "Users can view own transactions"
  on public.fuel_transactions for select using (
    wallet_id in (select id from public.fuel_wallet where profile_id = public.my_profile_id())
  );
create policy "Users can insert transactions"
  on public.fuel_transactions for insert with check (
    wallet_id in (select id from public.fuel_wallet where profile_id = public.my_profile_id())
  );

-- installed_solutions
create policy "Users can manage own installed solutions"
  on public.installed_solutions for all using (
    business_id in (select id from public.businesses where profile_id = public.my_profile_id())
  );

-- solution_configuration
create policy "Users can manage own solution config"
  on public.solution_configuration for all using (
    installed_solution_id in (
      select id from public.installed_solutions where
        business_id in (select id from public.businesses where profile_id = public.my_profile_id())
    )
  );

-- knowledge_sources
create policy "Users can manage own knowledge"
  on public.knowledge_sources for all using (
    business_id in (select id from public.businesses where profile_id = public.my_profile_id())
  );

-- knowledge_files
create policy "Users can manage own knowledge files"
  on public.knowledge_files for all using (
    knowledge_source_id in (
      select id from public.knowledge_sources where
        business_id in (select id from public.businesses where profile_id = public.my_profile_id())
    )
  );

-- website_sources
create policy "Users can manage own website sources"
  on public.website_sources for all using (
    knowledge_source_id in (
      select id from public.knowledge_sources where
        business_id in (select id from public.businesses where profile_id = public.my_profile_id())
    )
  );

-- faqs
create policy "Users can manage own FAQs"
  on public.faqs for all using (
    business_id in (select id from public.businesses where profile_id = public.my_profile_id())
  );

-- workflow_executions
create policy "Users can view own executions"
  on public.workflow_executions for select using (
    business_id in (select id from public.businesses where profile_id = public.my_profile_id())
  );

-- execution_logs
create policy "Users can view own logs"
  on public.execution_logs for select using (
    execution_id in (
      select id from public.workflow_executions where
        business_id in (select id from public.businesses where profile_id = public.my_profile_id())
    )
  );

-- custom_solution_requests
create policy "Users can manage own requests"
  on public.custom_solution_requests for all using (profile_id = public.my_profile_id());

-- ai_solutions (public read)
create policy "Anyone authenticated can view solutions"
  on public.ai_solutions for select using (auth.role() = 'authenticated');

-- solution_versions (public read)
create policy "Anyone authenticated can view versions"
  on public.solution_versions for select using (auth.role() = 'authenticated');

-- ai_providers (public read)
create policy "Anyone authenticated can view providers"
  on public.ai_providers for select using (auth.role() = 'authenticated');

-- ─── STORAGE RLS ──────────────────────────────────────────────────────────────

-- avatars bucket — user uploads their own
create policy "Users can upload own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );
create policy "Avatars are publicly readable"
  on storage.objects for select using (bucket_id = 'avatars');
create policy "Users can update own avatar"
  on storage.objects for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- business-logos
create policy "Business logos are publicly readable"
  on storage.objects for select using (bucket_id = 'business-logos');
create policy "Users can manage own business logos"
  on storage.objects for all using (
    bucket_id = 'business-logos' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- knowledge-files (private)
create policy "Users can manage own knowledge files in storage"
  on storage.objects for all using (
    bucket_id = 'knowledge-files' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- solution-assets (public read)
create policy "Solution assets are publicly readable"
  on storage.objects for select using (bucket_id = 'solution-assets');

-- ─── SEED: AI SOLUTIONS CATALOG ───────────────────────────────────────────────

insert into public.ai_solutions (name, slug, description, category, icon, status, is_featured) values
  ('Customer Support Captain', 'customer-support',  'Handles customer questions, FAQs, and support tickets 24/7 across all channels.', 'Support',    'headphones', 'published', true),
  ('Sales Navigator',          'sales-navigator',   'Qualifies leads, manages follow-ups, and books meetings automatically.', 'Sales',      'target',     'published', true),
  ('Knowledge Keeper',         'knowledge-keeper',  'Answers employee questions from internal documents and SOPs instantly.', 'Internal',   'book-open',  'published', true),
  ('Marketing Assistant',      'marketing-assistant','Supports content workflows, campaign execution, and social media automation.', 'Marketing',  'share-2',    'published', true),
  ('Operations Crew',          'operations-crew',   'Automates cross-system data sync, repetitive tasks, and process orchestration.', 'Operations', 'cpu',        'published', false),
  ('Research Analyst',         'research-analyst',  'Performs web research, competitive analysis, and delivers structured reports.', 'Research',   'search',     'published', false)
on conflict (slug) do nothing;
