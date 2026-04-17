import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NewsItem, HistoryItem, GalleryItem, Member, MemberRole } from './types';

// 빌드 시 즉시 실행되지 않도록 지연 초기화
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url.startsWith('여기에')) {
      throw new Error('Supabase 환경변수가 설정되지 않았습니다. .env.local을 확인하세요.');
    }
    _client = createClient(url, key);
  }
  return _client;
}

// ── DB row types (snake_case) ──────────────────────────────────────────────

interface NewsRow {
  id: string;
  title_ko: string;
  title_en: string;
  content_ko: string;
  content_en: string;
  date: string;
  category: string;
  image_url: string | null;
}

interface HistoryRow {
  id: string;
  year: number;
  month: number | null;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
}

interface GalleryRow {
  id: string;
  title_ko: string;
  title_en: string;
  description_ko: string;
  description_en: string;
  image_url: string;
  date: string;
}

interface MemberRow {
  id: string;
  name_ko: string;
  name_en: string;
  role: string;
  title_ko: string;
  title_en: string;
  affiliation_ko: string;
  affiliation_en: string;
  image_url: string | null;
  order: number | null;
}

// ── Mappers: DB row → app type ─────────────────────────────────────────────

function toNews(r: NewsRow): NewsItem {
  return {
    id: r.id,
    titleKo: r.title_ko,
    titleEn: r.title_en,
    contentKo: r.content_ko,
    contentEn: r.content_en,
    date: r.date,
    category: r.category,
    imageUrl: r.image_url ?? undefined,
  };
}

function toHistory(r: HistoryRow): HistoryItem {
  return {
    id: r.id,
    year: r.year,
    month: r.month ?? undefined,
    titleKo: r.title_ko,
    titleEn: r.title_en,
    descriptionKo: r.description_ko,
    descriptionEn: r.description_en,
  };
}

function toGallery(r: GalleryRow): GalleryItem {
  return {
    id: r.id,
    titleKo: r.title_ko,
    titleEn: r.title_en,
    descriptionKo: r.description_ko,
    descriptionEn: r.description_en,
    imageUrl: r.image_url,
    date: r.date,
  };
}

function toMember(r: MemberRow): Member {
  return {
    id: r.id,
    nameKo: r.name_ko,
    nameEn: r.name_en,
    role: r.role as MemberRole,
    titleKo: r.title_ko,
    titleEn: r.title_en,
    affiliationKo: r.affiliation_ko,
    affiliationEn: r.affiliation_en,
    imageUrl: r.image_url ?? undefined,
    order: r.order ?? undefined,
  };
}

// ── News ───────────────────────────────────────────────────────────────────

export async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await getClient()
    .from('news')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as NewsRow[]).map(toNews);
}

export async function insertNews(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  const { data, error } = await getClient()
    .from('news')
    .insert({
      title_ko: item.titleKo,
      title_en: item.titleEn,
      content_ko: item.contentKo,
      content_en: item.contentEn,
      date: item.date,
      category: item.category,
      image_url: item.imageUrl ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return toNews(data as NewsRow);
}

export async function patchNews(id: string, item: Partial<NewsItem>): Promise<void> {
  const patch: Partial<NewsRow> = {};
  if (item.titleKo !== undefined) patch.title_ko = item.titleKo;
  if (item.titleEn !== undefined) patch.title_en = item.titleEn;
  if (item.contentKo !== undefined) patch.content_ko = item.contentKo;
  if (item.contentEn !== undefined) patch.content_en = item.contentEn;
  if (item.date !== undefined) patch.date = item.date;
  if (item.category !== undefined) patch.category = item.category;
  if (item.imageUrl !== undefined) patch.image_url = item.imageUrl ?? null;
  const { error } = await getClient().from('news').update(patch).eq('id', id);
  if (error) throw error;
}

export async function removeNews(id: string): Promise<void> {
  const { error } = await getClient().from('news').delete().eq('id', id);
  if (error) throw error;
}

// ── History ────────────────────────────────────────────────────────────────

export async function fetchHistory(): Promise<HistoryItem[]> {
  const { data, error } = await getClient()
    .from('history')
    .select('*')
    .order('year', { ascending: true })
    .order('month', { ascending: true, nullsFirst: true });
  if (error) throw error;
  return (data as HistoryRow[]).map(toHistory);
}

export async function insertHistory(item: Omit<HistoryItem, 'id'>): Promise<HistoryItem> {
  const { data, error } = await getClient()
    .from('history')
    .insert({
      year: item.year,
      month: item.month ?? null,
      title_ko: item.titleKo,
      title_en: item.titleEn,
      description_ko: item.descriptionKo,
      description_en: item.descriptionEn,
    })
    .select()
    .single();
  if (error) throw error;
  return toHistory(data as HistoryRow);
}

export async function patchHistory(id: string, item: Partial<HistoryItem>): Promise<void> {
  const patch: Partial<HistoryRow> = {};
  if (item.year !== undefined) patch.year = item.year;
  if (item.month !== undefined) patch.month = item.month ?? null;
  if (item.titleKo !== undefined) patch.title_ko = item.titleKo;
  if (item.titleEn !== undefined) patch.title_en = item.titleEn;
  if (item.descriptionKo !== undefined) patch.description_ko = item.descriptionKo;
  if (item.descriptionEn !== undefined) patch.description_en = item.descriptionEn;
  const { error } = await getClient().from('history').update(patch).eq('id', id);
  if (error) throw error;
}

export async function removeHistory(id: string): Promise<void> {
  const { error } = await getClient().from('history').delete().eq('id', id);
  if (error) throw error;
}

// ── Gallery ────────────────────────────────────────────────────────────────

export async function fetchGallery(): Promise<GalleryItem[]> {
  const { data, error } = await getClient()
    .from('gallery')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as GalleryRow[]).map(toGallery);
}

export async function insertGallery(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const { data, error } = await getClient()
    .from('gallery')
    .insert({
      title_ko: item.titleKo,
      title_en: item.titleEn,
      description_ko: item.descriptionKo,
      description_en: item.descriptionEn,
      image_url: item.imageUrl,
      date: item.date,
    })
    .select()
    .single();
  if (error) throw error;
  return toGallery(data as GalleryRow);
}

export async function patchGallery(id: string, item: Partial<GalleryItem>): Promise<void> {
  const patch: Partial<GalleryRow> = {};
  if (item.titleKo !== undefined) patch.title_ko = item.titleKo;
  if (item.titleEn !== undefined) patch.title_en = item.titleEn;
  if (item.descriptionKo !== undefined) patch.description_ko = item.descriptionKo;
  if (item.descriptionEn !== undefined) patch.description_en = item.descriptionEn;
  if (item.imageUrl !== undefined) patch.image_url = item.imageUrl;
  if (item.date !== undefined) patch.date = item.date;
  const { error } = await getClient().from('gallery').update(patch).eq('id', id);
  if (error) throw error;
}

export async function removeGallery(id: string): Promise<void> {
  const { error } = await getClient().from('gallery').delete().eq('id', id);
  if (error) throw error;
}

// ── Members ────────────────────────────────────────────────────────────────

export async function fetchMembers(): Promise<Member[]> {
  const { data, error } = await getClient()
    .from('members')
    .select('*')
    .order('order', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data as MemberRow[]).map(toMember);
}

export async function insertMember(item: Omit<Member, 'id'>): Promise<Member> {
  const { data, error } = await getClient()
    .from('members')
    .insert({
      name_ko: item.nameKo,
      name_en: item.nameEn,
      role: item.role,
      title_ko: item.titleKo,
      title_en: item.titleEn,
      affiliation_ko: item.affiliationKo,
      affiliation_en: item.affiliationEn,
      image_url: item.imageUrl ?? null,
      order: item.order ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return toMember(data as MemberRow);
}

export async function patchMember(id: string, item: Partial<Member>): Promise<void> {
  const patch: Partial<MemberRow> = {};
  if (item.nameKo !== undefined) patch.name_ko = item.nameKo;
  if (item.nameEn !== undefined) patch.name_en = item.nameEn;
  if (item.role !== undefined) patch.role = item.role;
  if (item.titleKo !== undefined) patch.title_ko = item.titleKo;
  if (item.titleEn !== undefined) patch.title_en = item.titleEn;
  if (item.affiliationKo !== undefined) patch.affiliation_ko = item.affiliationKo;
  if (item.affiliationEn !== undefined) patch.affiliation_en = item.affiliationEn;
  if (item.imageUrl !== undefined) patch.image_url = item.imageUrl ?? null;
  if (item.order !== undefined) patch.order = item.order ?? null;
  const { error } = await getClient().from('members').update(patch).eq('id', id);
  if (error) throw error;
}

export async function removeMember(id: string): Promise<void> {
  const { error } = await getClient().from('members').delete().eq('id', id);
  if (error) throw error;
}
