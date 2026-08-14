export interface Region {
  id: number;
  name: string;
  slug: string;
  country: string;
  description: string;
  image_url?: string | null;
}

export type Difficulty = 'easy' | 'moderate' | 'hard';

export interface Trail {
  id: number;
  region_id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  distance_km: number;
  description: string;
  image_url: string;
  created_at: number;
}

export interface TrailWithRegion extends Trail {
  region_slug: string;
  region_name: string;
  region_country: string;
}

export interface TrailViewModel extends TrailWithRegion {
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}
