'use client';

import { Video } from '@/types/video';
import { detectPlatform, getThumbnail } from '@/lib/videoUtils';

const platformLabel: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitter: 'X / Twitter',
  unknown: '動画',
};

const platformColor: Record<string, string> = {
  youtube: 'text-red-500',
  tiktok: 'text-cyan-400',
  twitter: 'text-blue-400',
  unknown: 'text-gray-400',
};

const sideLabel: Record<string, string> = {
  atk: '攻撃',
  def: '防衛',
  common: '共通',
};

export function VideoCard({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) {
  const platform = detectPlatform(video.url);
  const thumb = getThumbnail(video.url);
  const isUncategorized = !video.map_name && !video.agent;

  return (
    <div
      onClick={onClick}
      className="bg-[#131f2b] border border-[#1e2d3d] rounded hover:border-[#ff4655] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
    >
      <div className="relative w-full aspect-video bg-[#0a1520] flex items-center justify-center">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <span className="text-[#1e2d3d] text-4xl">▶</span>
        )}
        <div className="absolute w-11 h-11 bg-[#ff4655]/90 rounded-full flex items-center justify-center text-white">
          ▶
        </div>
        <span
          className={`absolute top-2 right-2 bg-[#080d12]/85 border border-[#1e2d3d] rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${platformColor[platform]}`}
        >
          {platformLabel[platform]}
        </span>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold text-[#ece8e1] truncate mb-2">
          {video.title || '無題の動画'}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {video.map_name && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#c8a84b]/15 text-[#c8a84b] border border-[#c8a84b]/30">
              {video.map_name}
            </span>
          )}
          {video.agent && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#ff4655]/10 text-[#ff8090] border border-[#ff4655]/20">
              {video.agent}
            </span>
          )}
          {video.side && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#7b8ea0]/10 text-[#7b8ea0] border border-[#7b8ea0]/20">
              {sideLabel[video.side]}
            </span>
          )}
          {isUncategorized && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#7b8ea0]/10 text-[#7b8ea0] border border-[#7b8ea0]/20">
              未分類
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
