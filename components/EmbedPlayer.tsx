'use client';

import { detectPlatform, getYouTubeId, getTikTokId } from '@/lib/videoUtils';

export function EmbedPlayer({ url }: { url: string }) {
  const platform = detectPlatform(url);

  if (platform === 'youtube') {
    const id = getYouTubeId(url);
    if (id) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      );
    }
  }

  if (platform === 'tiktok') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#0a1520]">
        <p className="text-sm text-[#ece8e1]">TikTokはこの画面では再生できません</p>
        <a href={url} target="_blank" rel="noreferrer" className="bg-[#ff4655] hover:bg-[#e03040] text-white text-sm font-bold px-4 py-2 rounded">TikTokで開く ↗</a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <p className="text-sm text-[#ece8e1]">
        {platform === 'twitter'
          ? 'X(Twitter)は直接埋め込みに制限があります'
          : '対応プレーヤーなし'}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-[#ff4655] text-sm underline"
      >
        元の動画を開く ↗
      </a>
    </div>
  );
}
