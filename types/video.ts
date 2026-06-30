export type Side = 'atk' | 'def' | 'common' | null;

export interface Video {
  id: string;
  url: string;
  title: string;
  map_name: string | null;
  agent: string | null;
  side: Side;
  memo: string | null;
  created_at: string;
}

export interface VideoFormData {
  url: string;
  title?: string;
  map_name?: string;
  agent?: string;
  side?: Side;
  memo?: string;
}
