export type Platform = 'youtube' | 'tiktok' | 'twitter' | 'unknown';

export function detectPlatform(url: string): Platform {
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/tiktok\.com/.test(url)) return 'tiktok';
  if (/twitter\.com|x\.com/.test(url)) return 'twitter';
  return 'unknown';
}

export function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function getThumbnail(url: string): string {
  const ytId = getYouTubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
  return '';
}

export function getTikTokId(url: string): string | null {
  const m = url.match(/video\/(\d+)/);
  return m ? m[1] : null;
}
