-- SHAPE 홈페이지 Supabase 스키마
-- Supabase 대시보드 → SQL Editor에서 실행하세요

-- 1. 뉴스
create table if not exists news (
  id          uuid primary key default gen_random_uuid(),
  title_ko    text not null,
  title_en    text not null,
  content_ko  text not null,
  content_en  text not null,
  date        text not null,
  category    text not null,
  image_url   text,
  created_at  timestamptz default now()
);

-- 2. 연혁
create table if not exists history (
  id              uuid primary key default gen_random_uuid(),
  year            integer not null,
  month           integer,
  title_ko        text not null,
  title_en        text not null,
  description_ko  text not null,
  description_en  text not null,
  created_at      timestamptz default now()
);

-- 3. 갤러리
create table if not exists gallery (
  id              uuid primary key default gen_random_uuid(),
  title_ko        text not null,
  title_en        text not null,
  description_ko  text not null,
  description_en  text not null,
  image_url       text not null,
  date            text not null,
  created_at      timestamptz default now()
);

-- 4. 멤버
create table if not exists members (
  id              uuid primary key default gen_random_uuid(),
  name_ko         text not null,
  name_en         text not null,
  role            text not null,
  title_ko        text not null,
  title_en        text not null,
  affiliation_ko  text not null,
  affiliation_en  text not null,
  image_url       text,
  "order"         integer,
  created_at      timestamptz default now()
);

-- RLS (Row Level Security) 설정
-- 읽기는 누구나 가능, 쓰기는 anon key로도 가능하게 설정
alter table news    enable row level security;
alter table history enable row level security;
alter table gallery enable row level security;
alter table members enable row level security;

-- 읽기 정책 (공개)
create policy "public read news"    on news    for select using (true);
create policy "public read history" on history for select using (true);
create policy "public read gallery" on gallery for select using (true);
create policy "public read members" on members for select using (true);

-- 쓰기 정책 (anon 허용 — admin 페이지에서 사용)
create policy "anon write news"    on news    for all using (true) with check (true);
create policy "anon write history" on history for all using (true) with check (true);
create policy "anon write gallery" on gallery for all using (true) with check (true);
create policy "anon write members" on members for all using (true) with check (true);
