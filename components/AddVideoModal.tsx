'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

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

export function AddVideoModal({ onClose }: { onClose: () => void }) {
  const addVideo = useStore((s) => s.addVideo);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [mapName, setMapName] = useState('');
  const [agent, setAgent] = useState('');
  const [side, setSide] = useState('');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError('動画URLを入力してください');
      return;
    }
    setSubmitting(true);
    await addVideo({
      url: url.trim(),
      title: title.trim() || undefined,
      map_name: mapName || undefined,
      agent: agent || undefined,
      side: (side as any) || undefined,
      memo: memo.trim() || undefined,
    });
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#131f2b] border border-[#1e2d3d] rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-[#0f1923] border-b border-[#1e2d3d] px-4 py-3 flex items-center justify-between sticky top-0">
          <span className="text-xs font-bold tracking-widest uppercase text-[#ff4655]">
            動画を追加
          </span>
          <button
            onClick={onClose}
            className="text-[#7b8ea0] hover:text-white text-lg"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
              動画URL <span className="text-[#ff4655]">*</span>
            </label>
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="YouTube / TikTok / X(Twitter) のURL"
              className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none"
            />
            {error && <p className="text-[#ff4655] text-xs">{error}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
              タイトル{' '}
              <span className="normal-case text-[9px]">(未入力で自動設定)</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: Ascent A ヘブン Viper壁"
              className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
                マップ
              </label>
              <select
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none"
              >
                <option value="">未選択</option>
                {MAPS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
                エージェント
              </label>
              <select
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none"
              >
                <option value="">未選択</option>
                {AGENTS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
              攻守
            </label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none"
            >
              <option value="">未選択</option>
              <option value="atk">アタッカー (攻撃)</option>
              <option value="def">ディフェンダー (防衛)</option>
              <option value="common">共通</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-wider uppercase text-[#7b8ea0]">
              メモ
            </label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="補足メモ（任意）"
              className="bg-[#080d12] border border-[#1e2d3d] focus:border-[#ff4655] rounded px-3 py-2 text-sm text-[#ece8e1] outline-none min-h-[60px] resize-y"
            />
          </div>
        </div>

        <div className="border-t border-[#1e2d3d] px-4 py-3 flex gap-2 justify-end sticky bottom-0 bg-[#131f2b]">
          <button
            onClick={onClose}
            className="border border-[#1e2d3d] text-[#7b8ea0] hover:text-white hover:border-[#7b8ea0] rounded px-4 py-1.5 text-xs font-bold tracking-wide uppercase"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[#ff4655] hover:bg-[#e03040] text-white rounded px-4 py-1.5 text-xs font-bold tracking-wide uppercase disabled:opacity-50"
          >
            {submitting ? '追加中...' : '追加する'}
          </button>
        </div>
      </div>
    </div>
  );
}
