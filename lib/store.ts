import { create } from 'zustand';
import { Video, VideoFormData } from '@/types/video';
import { supabase } from './supabase';

interface Store {
  videos: Video[];
  loading: boolean;
  searchQuery: string;
  mapFilter: string;
  agentFilter: string;
  sideFilter: string;
  fetchVideos: () => Promise<void>;
  addVideo: (data: VideoFormData) => Promise<void>;
  updateVideo: (id: string, data: Partial<VideoFormData>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  setSearch: (q: string) => void;
  setMapFilter: (m: string) => void;
  setAgentFilter: (a: string) => void;
  setSideFilter: (s: string) => void;
  filteredVideos: () => Video[];
}

export const useStore = create<Store>((set, get) => ({
  videos: [],
  loading: false,
  searchQuery: '',
  mapFilter: '',
  agentFilter: '',
  sideFilter: '',

  fetchVideos: async () => {
    set({ loading: true });
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    set({ videos: data ?? [], loading: false });
  },

  addVideo: async (formData) => {
    const title = formData.title?.trim() || '無題の動画';
    const { data } = await supabase
      .from('videos')
      .insert([{ ...formData, title }])
      .select()
      .single();
    if (data) set((s) => ({ videos: [data, ...s.videos] }));
  },

  updateVideo: async (id, formData) => {
    const { data } = await supabase
      .from('videos')
      .update(formData)
      .eq('id', id)
      .select()
      .single();
    if (data)
      set((s) => ({ videos: s.videos.map((v) => (v.id === id ? data : v)) }));
  },

  deleteVideo: async (id) => {
    await supabase.from('videos').delete().eq('id', id);
    set((s) => ({ videos: s.videos.filter((v) => v.id !== id) }));
  },

  setSearch: (q) => set({ searchQuery: q }),
  setMapFilter: (m) => set({ mapFilter: m }),
  setAgentFilter: (a) => set({ agentFilter: a }),
  setSideFilter: (s) => set({ sideFilter: s }),

  filteredVideos: () => {
    const {
      videos,
      searchQuery: q,
      mapFilter,
      agentFilter,
      sideFilter,
    } = get();
    return videos.filter((v) => {
      const matchQ =
        !q ||
        [v.title, v.memo, v.map_name, v.agent].some((t) =>
          t?.toLowerCase().includes(q.toLowerCase())
        );
      const matchMap = !mapFilter || v.map_name === mapFilter;
      const matchAgent = !agentFilter || v.agent === agentFilter;
      const matchSide =
        !sideFilter ||
        (sideFilter === 'uncat'
          ? !v.map_name && !v.agent && !v.side
          : v.side === sideFilter);
      return matchQ && matchMap && matchAgent && matchSide;
    });
  },
}));
