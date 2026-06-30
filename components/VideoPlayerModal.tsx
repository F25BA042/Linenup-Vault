'use client';

import { Video } from '@/types/video';
import { EmbedPlayer } from './EmbedPlayer';

const sideLabel: Record<string, string> = {
  atk: '攻撃',
  def: '防衛',
  common: '共通',
};

export function VideoPlayerModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#ece8e1]">
            {video.title || '無題の動画'}
          </span>
          <button
            onClick={onClose}
            className="text-[#7b8ea0] hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        <div className="w-full aspect-video bg-black rounded border border-[#1e2d3d] overflow-hidden">
          <EmbedPlayer url={video.url} />
        </div>

        <div className="mt-3 flex gap-1.5 flex-wrap">
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
        </div>

        {video.memo && (
          <p className="mt-2 text-xs text-[#7b8ea0] whitespace-pre-wrap">
            {video.memo}
          </p>
        )}
      </div>
    </div>
  );
}
