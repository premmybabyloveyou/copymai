export type PageId = 'landing' | 'login' | 'register' | 'dashboard' | 'scan' | 'results' | 'reports' | 'community-report' | 'plans';
export type SimilarityStatus = 'high' | 'review' | 'low';
export interface ScanRecord { id: string; title: string; type: string; date: string; score: number; status: SimilarityStatus; }

export interface UploadedWork { name: string; previewUrl?: string; audioUrl?: string; category?: string; excerpt?: string; }
