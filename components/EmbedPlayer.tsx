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
    const id = getTikTokId(url)
    if (id) {
      return (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          className="w-full h-full"
          allowFullScreen
        />
      )
    }
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
