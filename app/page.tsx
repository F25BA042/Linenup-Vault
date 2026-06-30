'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { Video } from '@/types/video';
import { VideoCard } from '@/components/VideoCard';
import { AddVideoModal } from '@/components/AddVideoModal';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';

const MAPS = [
  'Ascent',
  'Bind',
  'Haven',
  'Split',
  'Icebox',
  'Breeze',
  'Fracture',
  'Pearl',
  'Lotus',
  'Sunset',
  'Abyss',
];
const AGENTS = [
  'Brimstone',
  'Viper',
  'Omen',
  'Killjoy',
  'Cypher',
  'Sova',
  'Sage',
  'Phoenix',
  'Jett',
  'Reyna',
  'Raze',
  'Breach',
  'Skye',
  'Yoru',
  'Astra',
  'KAY/O',
  'Chamber',
  'Neon',
  'Fade',
  'Harbor',
  'Gekko',
  'Deadlock',
  'Iso',
  'Clove',
  'Vyse',
];

export default function Home() {
  const {
    videos,
    loading,
    fetchVideos,
    searchQuery,
    mapFilter,
    agentFilter,
    sideFilter,
    setSearch,
    setMapFilter,
    setAgentFilter,
    setSideFilter,
    filteredVideos,
  } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const results = filteredVideos();

  return (
    <div className="min-h-screen bg-[#080d12] text-[#ece8e1]">
      {/* ヘッダー */}
      <div className="bg-[#0f1923] border-b border-[#1e2d3d] px-4 h-13 flex items-center gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
          <div
            className="w-7 h-7 bg-[#ff4655]"
            style={{
              clipPath:
                'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
          LINEUP<span className="text-[#ff4655]">VAULT</span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-auto bg-[#ff4655] hover:bg-[#e03040] text-white rounded px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase"
        >
          + 追加
        </button>
      </div>

      {/* フィルターバー */}
      <div className="bg-[#0f1923] border-b border-[#1e2d3d] px-4 py-2.5 flex gap-2 flex-wrap items-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="キーワード検索..."
          className="flex-1 min-w-[160px] bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-1.5 text-sm text-[#ece8e1] outline-none"
        />
        <select
          value={mapFilter}
          onChange={(e) => setMapFilter(e.target.value)}
          className="bg-[#080d12] border border-[#1e2d3d] rounded px-2 py-1.5 text-xs text-[#ece8e1] outline-none"
        >
          <option value="">全マップ</option>
          {MAPS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="bg-[#080d12] border border-[#1e2d3d] rounded px-2 py-1.5 text-xs text-[#ece8e1] outline-none"
        >
          <option value="">全エージェント</option>
          {AGENTS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {[
          { key: '', label: '全て' },
          { key: 'atk', label: '攻撃' },
          { key: 'def', label: '防衛' },
          { key: 'uncat', label: '未分類' },
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => setSideFilter(c.key)}
            className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded border ${
              sideFilter === c.key
                ? 'bg-[#ff4655]/15 border-[#ff4655] text-[#ff4655]'
                : 'border-[#1e2d3d] text-[#7b8ea0]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* メイン */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3 text-[11px] font-bold tracking-widest uppercase text-[#7b8ea0]">
          定点・セットアップ ({results.length}件)
          <div className="flex-1 h-px bg-[#1e2d3d]" />
        </div>

        {loading ? (
          <p className="text-[#7b8ea0] text-sm text-center py-10">
            読み込み中...
          </p>
        ) : results.length === 0 ? (
          <div className="text-center py-10 text-[#7b8ea0]">
            <p className="text-sm">動画が見つかりません</p>
          </div>
        ) : (
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {results.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                onClick={() => setPlayingVideo(v)}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && <AddVideoModal onClose={() => setShowAddModal(false)} />}
      {playingVideo && (
        <VideoPlayerModal
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </div>
  );
}
