export interface NewsItem {
  id: string;
  titleKo: string;
  titleEn: string;
  contentKo: string;
  contentEn: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface HistoryItem {
  id: string;
  year: number;
  month?: number;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
}

export interface GalleryItem {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  imageUrl: string;
  date: string;
}

export type MemberRole =
  | 'director'
  | 'mentor'
  | 'executive'
  | 'management'
  | 'manipulation'
  | 'navigation'
  | 'reasoning'
  | 'perception'
  | 'alumni';

export interface Member {
  id: string;
  nameKo: string;
  nameEn: string;
  role: MemberRole;
  titleKo: string;
  titleEn: string;
  affiliationKo: string;
  affiliationEn: string;
  imageUrl?: string;
  order?: number;
}

export interface SiteData {
  news: NewsItem[];
  history: HistoryItem[];
  gallery: GalleryItem[];
  members: Member[];
}
