'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteData, NewsItem, HistoryItem, GalleryItem, Member } from '@/lib/types';
import { defaultData } from '@/lib/defaultData';
import {
  fetchNews, insertNews, patchNews, removeNews,
  fetchHistory, insertHistory, patchHistory, removeHistory,
  fetchGallery, insertGallery, patchGallery, removeGallery,
  fetchMembers, insertMember, patchMember, removeMember,
} from '@/lib/supabase';

interface DataContextType {
  data: SiteData;
  loading: boolean;
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addHistory: (item: Omit<HistoryItem, 'id'>) => Promise<void>;
  updateHistory: (id: string, item: Partial<HistoryItem>) => Promise<void>;
  deleteHistory: (id: string) => Promise<void>;
  addGallery: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  updateGallery: (id: string, item: Partial<GalleryItem>) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  addMember: (item: Omit<Member, 'id'>) => Promise<void>;
  updateMember: (id: string, item: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  data: defaultData,
  loading: true,
  addNews: async () => {},
  updateNews: async () => {},
  deleteNews: async () => {},
  addHistory: async () => {},
  updateHistory: async () => {},
  deleteHistory: async () => {},
  addGallery: async () => {},
  updateGallery: async () => {},
  deleteGallery: async () => {},
  addMember: async () => {},
  updateMember: async () => {},
  deleteMember: async () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>({ news: [], history: [], gallery: [], members: defaultData.members });
  const [loading, setLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    async function load() {
      try {
        const [news, history, gallery, members] = await Promise.all([
          fetchNews(),
          fetchHistory(),
          fetchGallery(),
          fetchMembers(),
        ]);
        setData({ news, history, gallery, members });
      } catch (err) {
        console.error('[Supabase] 데이터 로드 실패:', err);
        // 연결 실패 시 defaultData로 폴백
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── News ──────────────────────────────────────────────────────────────────

  const addNews = useCallback(async (item: Omit<NewsItem, 'id'>) => {
    const created = await insertNews(item);
    setData((prev) => ({ ...prev, news: [created, ...prev.news] }));
  }, []);

  const updateNews = useCallback(async (id: string, item: Partial<NewsItem>) => {
    await patchNews(id, item);
    setData((prev) => ({
      ...prev,
      news: prev.news.map((n) => (n.id === id ? { ...n, ...item } : n)),
    }));
  }, []);

  const deleteNews = useCallback(async (id: string) => {
    await removeNews(id);
    setData((prev) => ({ ...prev, news: prev.news.filter((n) => n.id !== id) }));
  }, []);

  // ── History ───────────────────────────────────────────────────────────────

  const addHistory = useCallback(async (item: Omit<HistoryItem, 'id'>) => {
    const created = await insertHistory(item);
    setData((prev) => ({
      ...prev,
      history: [...prev.history, created].sort(
        (a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0)
      ),
    }));
  }, []);

  const updateHistory = useCallback(async (id: string, item: Partial<HistoryItem>) => {
    await patchHistory(id, item);
    setData((prev) => ({
      ...prev,
      history: prev.history
        .map((h) => (h.id === id ? { ...h, ...item } : h))
        .sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0)),
    }));
  }, []);

  const deleteHistory = useCallback(async (id: string) => {
    await removeHistory(id);
    setData((prev) => ({ ...prev, history: prev.history.filter((h) => h.id !== id) }));
  }, []);

  // ── Gallery ───────────────────────────────────────────────────────────────

  const addGallery = useCallback(async (item: Omit<GalleryItem, 'id'>) => {
    const created = await insertGallery(item);
    setData((prev) => ({ ...prev, gallery: [created, ...prev.gallery] }));
  }, []);

  const updateGallery = useCallback(async (id: string, item: Partial<GalleryItem>) => {
    await patchGallery(id, item);
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...item } : g)),
    }));
  }, []);

  const deleteGallery = useCallback(async (id: string) => {
    await removeGallery(id);
    setData((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g.id !== id) }));
  }, []);

  // ── Members ───────────────────────────────────────────────────────────────

  const addMember = useCallback(async (item: Omit<Member, 'id'>) => {
    const created = await insertMember(item);
    setData((prev) => ({ ...prev, members: [...prev.members, created] }));
  }, []);

  const updateMember = useCallback(async (id: string, item: Partial<Member>) => {
    await patchMember(id, item);
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, ...item } : m)),
    }));
  }, []);

  const deleteMember = useCallback(async (id: string) => {
    await removeMember(id);
    setData((prev) => ({ ...prev, members: prev.members.filter((m) => m.id !== id) }));
  }, []);

  return (
    <DataContext.Provider
      value={{
        data, loading,
        addNews, updateNews, deleteNews,
        addHistory, updateHistory, deleteHistory,
        addGallery, updateGallery, deleteGallery,
        addMember, updateMember, deleteMember,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
