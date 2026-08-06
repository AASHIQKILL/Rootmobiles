-- Root Mobiles — Supabase schema (apply once a real project is provisioned)
-- Run in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category text not null check (category in ('Smartphones', 'Laptops', 'Accessories', 'Gaming')),
  condition text not null check (condition in ('New', 'Certified Pre-Owned')),
  price integer not null,
  mrp integer,
  emi_from integer,
  rating numeric(2,1) default 5.0,
  review_count integer default 0,
  color_swatches text[] default '{}',
  badge text,
  specs jsonb default '[]',
  image_url text,
  in_stock boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.trade_in_quotes (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  device_brand text not null,
  device_model text not null,
  storage text,
  condition text not null,
  estimated_value integer not null,
  status text default 'pending' check (status in ('pending', 'contacted', 'accepted', 'declined', 'completed')),
  created_at timestamptz default now()
);

create table if not exists public.repair_bookings (
  id uuid primary key default gen_random_uuid(),
  ticket_id text unique not null,
  customer_name text not null,
  phone text not null,
  device_brand text not null,
  device_model text not null,
  issue text not null,
  preferred_slot timestamptz,
  notes text,
  stage text default 'received' check (
    stage in ('received', 'diagnosing', 'in-repair', 'quality-check', 'ready', 'completed')
  ),
  technician text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.repair_timeline_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.repair_bookings(id) on delete cascade,
  stage text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  source_page text,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  rating numeric(2,1) default 5.0,
  avatar_url text,
  video_url text,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security: public read on products/testimonials, insert-only public write on leads.
alter table public.products enable row level security;
alter table public.testimonials enable row level security;
alter table public.trade_in_quotes enable row level security;
alter table public.repair_bookings enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public can read products" on public.products for select using (true);
create policy "Public can read published testimonials" on public.testimonials for select using (is_published = true);
create policy "Public can submit trade-in quotes" on public.trade_in_quotes for insert with check (true);
create policy "Public can submit repair bookings" on public.repair_bookings for insert with check (true);
create policy "Public can submit contact messages" on public.contact_messages for insert with check (true);
