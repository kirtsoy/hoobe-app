'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ProfileData, ContentBlock, SocialLink, AvatarSettings, BannerSettings } from '@/types/profile';
import { ProfilePreset } from '@/types/presets';
import { myProfile } from '@/data/myProfile';
import { HooBeProfileView } from '@/components/HooBeProfileView';
import { UniverseGradient } from '@/components/UniverseGradient';
import { BrandIcon, getBrandStyle } from '@/components/BrandIcons';
import { detectCategory } from '@/components/SocialIconsBar';
import { SocialCategory, SocialIconStyle } from '@/types/profile';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Upload, 
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Plus,
  Trash2,
  Video,
  Music,
  Share2,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
  Sliders,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Type,
  Flag,
  Download,
  Check,
  X,
  Bookmark,
  Palette,
  Layers
} from 'lucide-react';
import Link from 'next/link';

// Топовая подборка культовых мировых шрифтов для премиального визуала
const AVAILABLE_FONTS = [
  // 💎 КУРАТОРСКАЯ ТОП-ПОДБОРКА (ЛУЧШИЕ В МИРЕ)
  { name: '🔥 Syne (Editorial / Brutalism)', value: 'Syne', preview: 'КУЛЬТОВЫЙ ДИЗАЙНЕРСКИЙ ШРИФТ 2026', badge: 'TOP 1' },
  { name: '⚡ Unbounded (Next-Gen Tech)', value: 'Unbounded', preview: 'ФУТУРИЗМ & ВЫСОКИЙ ТЕХНОЛОГИЧНЫЙ СТИЛЬ', badge: 'TECH' },
  { name: '✨ Outfit (Apple / Clean Luxury)', value: 'Outfit', preview: 'Премиальный современный глянец', badge: 'LUXURY' },
  { name: '🚀 Plus Jakarta Sans (Modern SaaS)', value: 'Plus Jakarta Sans', preview: 'Идеальная читаемость и стиль', badge: 'CLEAN' },
  { name: '👑 Cinzel (Old Money / High Fashion)', value: 'Cinzel', preview: 'РИМСКИЙ ИМПЕРСКИЙ ЛЮКС', badge: 'FASHION' },
  { name: '🔮 Orbitron (Cyberpunk / Sci-Fi)', value: 'Orbitron', preview: 'КИБЕРПРОСТРАНСТВО & AI ВАЙБ', badge: 'CYBER' },
  { name: '💎 Manrope (Modern Minimalist)', value: 'Manrope', preview: 'Уверенный дорогой минимализм', badge: 'MINIMAL' },

  // 📁 ТВОИ УСТАНОВЛЕННЫЕ С КОМПЬЮТЕРА ШРИФТЫ
  { name: 'a_SimplerBrk', value: 'a_SimplerBrk', preview: 'Плотный брутальный гротеск', badge: 'LOCAL' },
  { name: 'Anurati', value: 'Anurati', preview: 'ФУТУРИСТИЧНЫЙ КИБЕРПАНК', badge: 'LOCAL' },
  { name: 'Bebas Neue', value: 'Bebas Neue', preview: 'ПЛОТНЫЙ КРУПНЫЙ ПЛАКАТНЫЙ', badge: 'LOCAL' },
  { name: 'Montserrat', value: 'Montserrat', preview: 'Премиальный геометрический гротеск', badge: 'LOCAL' },
  { name: 'Playfair Display', value: 'Playfair Display', preview: 'Люксовая антиква с засечками', badge: 'LOCAL' },
  { name: 'Oswald', value: 'Oswald', preview: 'Узкий журнальный стиль', badge: 'LOCAL' },
  { name: 'Cattedrale', value: 'Cattedrale', preview: 'Готический винтажный леттеринг', badge: 'LOCAL' },
  { name: 'Forever Freedom', value: 'Forever Freedom', preview: 'Дерзкий свободный леттеринг', badge: 'LOCAL' },
  { name: 'Arturito Slab', value: 'Arturito Slab', preview: 'Тяжелый брусковый акцент', badge: 'LOCAL' },
  { name: 'Berezki', value: 'Berezki', preview: 'Оригинальный аутентичный стиль', badge: 'LOCAL' },
  { name: 'Pollyester', value: 'Pollyester', preview: 'Креативный текстурный шрифт', badge: 'LOCAL' },
  { name: 'Pomidorko', value: 'Pomidorko', preview: 'Необычный крафтовый шрифт', badge: 'LOCAL' },
];

export const PLATFORM_OPTIONS = [
  // 💬 Соцсети
  { value: 'telegram', label: 'Telegram', category: 'social', defaultUrl: 'https://t.me/' },
  { value: 'instagram', label: 'Instagram', category: 'social', defaultUrl: 'https://instagram.com/' },
  { value: 'youtube', label: 'YouTube', category: 'social', defaultUrl: 'https://youtube.com/@' },
  { value: 'tiktok', label: 'TikTok', category: 'social', defaultUrl: 'https://tiktok.com/@' },
  { value: 'vk', label: 'VK (ВКонтакте)', category: 'social', defaultUrl: 'https://vk.com/' },
  { value: 'discord', label: 'Discord', category: 'social', defaultUrl: 'https://discord.gg/' },
  { value: 'x', label: 'X (Twitter)', category: 'social', defaultUrl: 'https://x.com/' },
  { value: 'threads', label: 'Threads', category: 'social', defaultUrl: 'https://threads.net/@' },
  { value: 'facebook', label: 'Facebook', category: 'social', defaultUrl: 'https://facebook.com/' },

  // 🔴 Стримы
  { value: 'twitch', label: 'Twitch', category: 'stream', defaultUrl: 'https://twitch.tv/' },
  { value: 'kick', label: 'Kick', category: 'stream', defaultUrl: 'https://kick.com/' },
  { value: 'vklive', label: 'VK Live', category: 'stream', defaultUrl: 'https://live.vkvideo.ru/' },
  { value: 'trovo', label: 'Trovo', category: 'stream', defaultUrl: 'https://trovo.live/' },

  // 🎵 Музыка
  { value: 'spotify', label: 'Spotify', category: 'music', defaultUrl: 'https://open.spotify.com/artist/' },
  { value: 'applemusic', label: 'Apple Music', category: 'music', defaultUrl: 'https://music.apple.com/' },
  { value: 'youtubemusic', label: 'YouTube Music', category: 'music', defaultUrl: 'https://music.youtube.com/' },
  { value: 'yandexmusic', label: 'Яндекс Музыка', category: 'music', defaultUrl: 'https://music.yandex.ru/' },
  { value: 'soundcloud', label: 'SoundCloud', category: 'music', defaultUrl: 'https://soundcloud.com/' },
  { value: 'amazonmusic', label: 'Amazon Music', category: 'music', defaultUrl: 'https://music.amazon.com/' },

  // 🌐 Другое
  { value: 'custom', label: 'Своя ссылка', category: 'social', defaultUrl: 'https://' },
];

export default function AdminPage() {
  const [profile, setProfile] = useState<ProfileData>(() => ({
    ...myProfile,
    avatarConfig: myProfile.avatarConfig || {
      size: 132,
      shape: 'circle',
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      borderWidth: 2,
      borderColor: '#38bdf8',
      hasGlow: true,
      glowColor: 'rgba(56, 189, 248, 0.4)',
    },
    bannerConfig: myProfile.bannerConfig || {
      enabled: false,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      height: 160,
      overlayOpacity: 0.35,
      blur: 0,
      positionY: 50,
    }
  }));

  const [uploading, setUploading] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // 💎 УПРАВЛЕНИЕ ПРЕСЕТАМИ (PRESET MANAGEMENT)
  const [presets, setPresets] = useState<ProfilePreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset_kirtsoy_official');
  const [loadingPresets, setLoadingPresets] = useState<boolean>(true);
  const [showSavePresetModal, setShowSavePresetModal] = useState<boolean>(false);
  const [newPresetName, setNewPresetName] = useState<string>('');
  const [newPresetDesc, setNewPresetDesc] = useState<string>('');
  const [newPresetBadge, setNewPresetBadge] = useState<string>('CUSTOM');
  const [presetNotice, setPresetNotice] = useState<string | null>(null);
  const fileImportRef = useRef<HTMLInputElement>(null);

  // Загрузка пресетов с сервера
  const fetchPresets = async () => {
    try {
      setLoadingPresets(true);
      const res = await fetch('/api/presets');
      const data = await res.json();
      if (data.success && Array.isArray(data.presets)) {
        setPresets(data.presets);
      }
    } catch (e) {
      console.error('Failed to load presets:', e);
    } finally {
      setLoadingPresets(false);
    }
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  const handleApplyPreset = (p: ProfilePreset) => {
    setProfile(JSON.parse(JSON.stringify(p.profile)));
    setSelectedPresetId(p.id);
    setPresetNotice(`Пресет "${p.name}" успешно применен!`);
    setTimeout(() => setPresetNotice(null), 3500);
  };

  const handleSaveNewPreset = async () => {
    if (!newPresetName.trim()) {
      alert('Пожалуйста, введите название пресета');
      return;
    }
    try {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          name: newPresetName.trim(),
          description: newPresetDesc.trim() || undefined,
          badge: newPresetBadge.trim().toUpperCase() || 'CUSTOM',
          profile: profile,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPresets(data.presets);
        setSelectedPresetId(data.preset.id);
        setShowSavePresetModal(false);
        setNewPresetName('');
        setNewPresetDesc('');
        setPresetNotice(`Пресет "${data.preset.name}" успешно сохранен!`);
        setTimeout(() => setPresetNotice(null), 3500);
      } else {
        alert('Ошибка при сохранении пресета: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка соединения: ' + err.message);
    }
  };

  const handleUpdateCurrentPreset = async () => {
    const cur = presets.find(p => p.id === selectedPresetId);
    if (!cur) return;
    if (cur.isSystem) {
      alert('Системные пресеты защищены от перезаписи. Сохраните как новый кастомный пресет!');
      setShowSavePresetModal(true);
      setNewPresetName(cur.name + ' (Копия)');
      return;
    }
    try {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          id: cur.id,
          name: cur.name,
          description: cur.description,
          badge: cur.badge,
          profile: profile,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPresets(data.presets);
        setPresetNotice(`Пресет "${cur.name}" обновлен текущими настройками!`);
        setTimeout(() => setPresetNotice(null), 3500);
      } else {
        alert('Ошибка обновления: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const handleDeletePreset = async (id: string, name: string) => {
    if (!confirm(`Удалить кастомный пресет "${name}"?`)) return;
    try {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      const data = await res.json();
      if (data.success) {
        setPresets(data.presets);
        if (selectedPresetId === id) {
          setSelectedPresetId(data.presets[0]?.id || '');
        }
        setPresetNotice(`Пресет "${name}" удален`);
        setTimeout(() => setPresetNotice(null), 3500);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка: ' + err.message);
    }
  };

  const handleExportPresets = () => {
    const blob = new Blob([JSON.stringify(presets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hoobe_presets_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPresets = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const presetsArray = Array.isArray(parsed) ? parsed : [parsed];
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'import', presets: presetsArray }),
      });
      const data = await res.json();
      if (data.success) {
        setPresets(data.presets);
        setPresetNotice(`Успешно импортировано пресетов: ${presetsArray.length}`);
        setTimeout(() => setPresetNotice(null), 3500);
      } else {
        alert('Ошибка импорта: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка чтения файла: ' + err.message);
    } finally {
      if (fileImportRef.current) fileImportRef.current.value = '';
    }
  };

  const handleUpdate = (field: keyof ProfileData, val: any) => {
    setProfile(prev => ({ ...prev, [field]: val }));
  };

  const handleAvatarConfig = (field: keyof AvatarSettings, val: any) => {
    setProfile(prev => ({
      ...prev,
      avatarConfig: {
        ...(prev.avatarConfig as AvatarSettings),
        [field]: val,
      }
    }));
  };

  const handleBannerConfig = (field: keyof BannerSettings, val: any) => {
    setProfile(prev => ({
      ...prev,
      bannerConfig: {
        ...(prev.bannerConfig as BannerSettings),
        [field]: val,
      }
    }));
  };

  const handleThemeUpdate = (field: string, val: any) => {
    setProfile(prev => ({
      ...prev,
      theme: { ...prev.theme, [field]: val }
    }));
  };

  // Загрузка фото с диска
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | 'banner' | number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        if (target === 'avatar') {
          handleUpdate('avatarUrl', data.url);
        } else if (target === 'banner') {
          handleBannerConfig('imageUrl', data.url);
          handleBannerConfig('enabled', true);
        } else {
          const updatedBlocks = [...profile.blocks];
          const b = updatedBlocks[target];
          if (b && (b.type === 'image_link' || b.type === 'half_card')) {
            b.imageUrl = data.url;
            setProfile(prev => ({ ...prev, blocks: updatedBlocks }));
          }
        }
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка соединения: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Добавление блоков
  const addBlock = (type: 'image_link' | 'half_card' | 'video_embed' | 'music_embed' | 'section_title' | 'youtube_carousel') => {
    const newId = 'b_' + Date.now();
    let newBlock: ContentBlock;

    if (type === 'youtube_carousel') {
      newBlock = {
        id: newId,
        type: 'youtube_carousel',
        title: '🎬 Избранные видео (YouTube)',
        gridColumn: 'full',
        items: [
          {
            id: 'yt_1',
            title: 'Видео 1',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            id: 'yt_2',
            title: 'Видео 2',
            videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
        ]
      };
    } else if (type === 'section_title') {
      newBlock = {
        id: newId,
        type: 'section_title',
        title: 'Новая секция',
        gridColumn: 'full',
      };
    } else if (type === 'video_embed') {
      newBlock = {
        id: newId,
        type: 'video_embed',
        title: 'Мое новое видео',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        gridColumn: 'full',
      };
    } else if (type === 'music_embed') {
      newBlock = {
        id: newId,
        type: 'music_embed',
        title: 'Альбом или Плейлист Spotify',
        spotifyUri: 'https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa',
        gridColumn: 'full',
      };
    } else {
      newBlock = {
        id: newId,
        type: type,
        title: type === 'half_card' ? 'Компактная карточка' : 'Большая карточка проекта',
        url: 'https://',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        gridColumn: type === 'half_card' ? 'left' : 'full',
      };
    }

    setProfile(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const removeBlock = (index: number) => {
    setProfile(prev => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index)
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= profile.blocks.length) return;

    const updated = [...profile.blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setProfile(prev => ({ ...prev, blocks: updated }));
  };

  // Перемещение видео внутри карусели
  const moveVideoInCarousel = (blockIndex: number, videoIndex: number, direction: 'up' | 'down') => {
    const updated = [...profile.blocks];
    const b = updated[blockIndex];
    if (b && b.type === 'youtube_carousel') {
      const newVideoIndex = direction === 'up' ? videoIndex - 1 : videoIndex + 1;
      if (newVideoIndex < 0 || newVideoIndex >= b.items.length) return;

      const [movedVideo] = b.items.splice(videoIndex, 1);
      b.items.splice(newVideoIndex, 0, movedVideo);
      setProfile(prev => ({ ...prev, blocks: updated }));
    }
  };

  const addVideoToCarousel = (blockIndex: number) => {
    const updated = [...profile.blocks];
    const b = updated[blockIndex];
    if (b && b.type === 'youtube_carousel') {
      b.items.push({
        id: 'yt_' + Date.now(),
        title: 'Новый ролик',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
      setProfile(prev => ({ ...prev, blocks: updated }));
    }
  };

  const removeVideoFromCarousel = (blockIndex: number, videoIndex: number) => {
    const updated = [...profile.blocks];
    const b = updated[blockIndex];
    if (b && b.type === 'youtube_carousel') {
      b.items = b.items.filter((_, i) => i !== videoIndex);
      setProfile(prev => ({ ...prev, blocks: updated }));
    }
  };

  // Управление соцсетями, стримами и музыкой (3 ряда)
  const updateSocial = (id: string, field: keyof SocialLink, val: any) => {
    setProfile(prev => ({
      ...prev,
      socials: prev.socials.map(s => {
        if (s.id !== id) return s;
        const updated = { ...s, [field]: val };
        if (field === 'platform') {
          const opt = PLATFORM_OPTIONS.find(p => p.value === val);
          if (opt) {
            if (!updated.title || updated.title === 'Telegram' || updated.title === s.platform) {
              updated.title = opt.label;
            }
            if (!updated.category) {
              updated.category = opt.category as SocialCategory;
            }
          }
        }
        return updated;
      })
    }));
  };

  const addSocial = (category: SocialCategory = 'social') => {
    const defaultPlatform = category === 'stream' ? 'twitch' : category === 'music' ? 'spotify' : 'telegram';
    const opt = PLATFORM_OPTIONS.find(p => p.value === defaultPlatform);
    const newSocial: SocialLink = {
      id: 's_' + Date.now(),
      platform: defaultPlatform,
      title: opt?.label || 'Ссылка',
      url: opt?.defaultUrl || 'https://',
      category: category,
    };
    setProfile(prev => ({ ...prev, socials: [...prev.socials, newSocial] }));
  };

  const removeSocial = (id: string) => {
    setProfile(prev => ({
      ...prev,
      socials: prev.socials.filter(s => s.id !== id)
    }));
  };

  const moveSocial = (id: string, direction: 'up' | 'down') => {
    setProfile(prev => {
      const idx = prev.socials.findIndex(s => s.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.socials.length) return prev;
      const updated = [...prev.socials];
      const [moved] = updated.splice(idx, 1);
      updated.splice(targetIdx, 0, moved);
      return { ...prev, socials: updated };
    });
  };

  // Сохранение в файл
  const handlePermanentSave = async () => {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (err: any) {
      alert('Ошибка соединения: ' + err.message);
    }
  };

  const avatarConf = profile.avatarConfig || {
    size: 132,
    shape: 'circle',
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    borderWidth: 2,
    borderColor: '#38bdf8',
    hasGlow: false,
    glowColor: '#38bdf8',
  };

  const bannerConf: BannerSettings = {
    enabled: false,
    imageUrl: '',
    height: 160,
    overlayOpacity: 0.35,
    blur: 0,
    positionY: 50,
    fit: 'cover',
    transparentBg: false,
    avatarOverlap: true,
    logoScale: 90,
    ...profile.bannerConfig,
  };

  return (
    <div className="relative min-h-screen bg-[#070810] text-white flex flex-col lg:flex-row font-sans overflow-x-hidden">
      {/* ЛЕВАЯ ПАНЕЛЬ: РЕДАКТОР (ЧЕТКИЙ ПЛОТНЫЙ НЕПРОЗРАЧНЫЙ ФОН) */}
      <div className="relative z-30 w-full lg:w-[560px] p-6 bg-[#0c0d18] border-r border-neutral-800/90 shadow-2xl overflow-y-auto max-h-screen shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-sky-400" />
            <h1 className="text-xl font-bold">Конструктор Hoo.be</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 bg-sky-950/50 border border-sky-800/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Витрина
          </Link>
        </div>

        <div className="flex flex-col gap-6 text-sm">
          {/* СЕКЦИЯ: ПРЕСЕТЫ ОФОРМЛЕНИЯ & ТЕМЫ (PRESET MANAGER) */}
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 p-5 rounded-2xl border border-sky-950/70 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-100 flex items-center gap-2 text-sm">
                    Пресеты оформления
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono border border-sky-500/30">
                      {presets.length} стилей
                    </span>
                  </h2>
                  <p className="text-[11px] text-neutral-400">Сохраняй и переключай визуальные стили в 1 клик</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setNewPresetName('');
                    setNewPresetDesc('');
                    setShowSavePresetModal(true);
                  }}
                  className="flex items-center gap-1 text-[11px] font-medium bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1.5 rounded-lg transition-colors shadow-sm cursor-pointer"
                  title="Сохранить текущий вид как новый пресет"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Новый пресет
                </button>
                <button
                  type="button"
                  onClick={handleExportPresets}
                  className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                  title="Экспорт всех пресетов в JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => fileImportRef.current?.click()}
                  className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                  title="Импорт пресетов из JSON"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                <input
                  type="file"
                  ref={fileImportRef}
                  onChange={handleImportPresets}
                  accept=".json"
                  className="hidden"
                />
              </div>
            </div>

            {/* Всплывающее уведомление о пресете */}
            {presetNotice && (
              <div className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-500/40 text-sky-200 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{presetNotice}</span>
              </div>
            )}

            {/* Быстрая витрина пресетов (Плитка карточек) */}
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => {
                const isSelected = selectedPresetId === p.id;
                return (
                  <div
                    key={p.id}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-500/80 ring-1 ring-sky-500/50 shadow-md'
                        : 'bg-neutral-900/80 hover:bg-neutral-800/90 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                          p.badge === 'OFFICIAL' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                          p.badge === 'CYBER' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30' :
                          p.badge === 'MUSIC' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          p.badge === 'BRUTAL' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                          'bg-neutral-700 text-neutral-300'
                        }`}>
                          {p.badge || (p.isSystem ? 'CORE' : 'CUSTOM')}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-sky-400 flex items-center gap-0.5 font-medium">
                            <Check className="w-3 h-3" /> Активен
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-xs text-neutral-200 leading-tight mb-1 truncate" title={p.name}>
                        {p.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {p.description}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-neutral-800/80">
                      <button
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40'
                            : 'bg-neutral-800 hover:bg-sky-600 hover:text-white text-neutral-300'
                        }`}
                      >
                        {isSelected ? '✓ Выбран' : 'Применить'}
                      </button>
                      {!p.isSystem && (
                        <button
                          type="button"
                          onClick={() => handleDeletePreset(p.id, p.name)}
                          className="p-1 text-neutral-500 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                          title="Удалить пресет"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Нижняя панель действий выбранного пресета */}
            {selectedPresetId && (
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-neutral-800/50">
                <span className="truncate max-w-[260px]">
                  Выбран: <strong className="text-neutral-200">{presets.find(p => p.id === selectedPresetId)?.name}</strong>
                </span>
                {(() => {
                  const cur = presets.find(p => p.id === selectedPresetId);
                  if (!cur || cur.isSystem) return null;
                  return (
                    <button
                      type="button"
                      onClick={handleUpdateCurrentPreset}
                      className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer font-medium"
                      title="Обновить этот пресет текущим состоянием редактора"
                    >
                      <RefreshCw className="w-3 h-3" /> Перезаписать пресет
                    </button>
                  );
                })()}
              </div>
            )}
          </div>

          {/* СЕКЦИЯ: БАННЕР В ШАПКУ ПРОФИЛЯ (HEADER COVER) */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-200 flex items-center gap-2">
                <Flag className="w-4 h-4 text-sky-400" />
                Баннер в шапку профиля (Header Cover)
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bannerEnabled"
                  checked={bannerConf.enabled}
                  onChange={(e) => handleBannerConfig('enabled', e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 cursor-pointer"
                />
                <label htmlFor="bannerEnabled" className="text-xs text-neutral-300 cursor-pointer select-none">
                  Включен
                </label>
              </div>
            </div>

            {/* Превью баннера */}
            {bannerConf.imageUrl ? (
              <div 
                className="relative w-full rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950/80 transition-all duration-300 flex items-center justify-center"
                style={{ height: `${Math.min(180, bannerConf.height)}px` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerConf.imageUrl}
                  alt="Banner preview"
                  className={bannerConf.fit === 'contain' ? 'w-auto object-contain drop-shadow-md' : 'w-full h-full object-cover'}
                  style={{
                    objectPosition: `center ${bannerConf.positionY}%`,
                    maxHeight: bannerConf.fit === 'contain' ? `${Math.round((Math.min(180, bannerConf.height) * (bannerConf.logoScale || 90)) / 100)}px` : undefined,
                    maxWidth: bannerConf.fit === 'contain' ? `${bannerConf.logoScale || 90}%` : undefined,
                    filter: bannerConf.blur > 0 ? `blur(${bannerConf.blur}px)` : 'none',
                    transform: bannerConf.fit === 'contain' 
                      ? `translateY(${((bannerConf.positionY ?? 50) - 50) * 0.6}px)` 
                      : (bannerConf.blur > 0 ? 'scale(1.05)' : 'none'),
                  }}
                />
                {!bannerConf.transparentBg && bannerConf.overlayOpacity > 0 && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,${bannerConf.overlayOpacity}) 0%, rgba(8,7,26,0.9) 100%)`
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-full py-8 rounded-xl border border-dashed border-neutral-700 bg-neutral-800/40 flex flex-col items-center justify-center text-xs text-neutral-400">
                <span>Баннер или логотип еще не загружен</span>
              </div>
            )}

            {/* Режим баннера: Фото-обложка или Прозрачный логотип */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  handleBannerConfig('fit', 'cover');
                  handleBannerConfig('transparentBg', false);
                  if (bannerConf.overlayOpacity === 0) handleBannerConfig('overlayOpacity', 0.35);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  (bannerConf.fit || 'cover') === 'cover'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🖼️ Фото-обложка (Cover)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleBannerConfig('fit', 'contain');
                  handleBannerConfig('transparentBg', true);
                  handleBannerConfig('overlayOpacity', 0);
                  handleBannerConfig('blur', 0);
                  if (bannerConf.height > 180) handleBannerConfig('height', 140);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  bannerConf.fit === 'contain'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                ✨ Прозрачное лого (Contain)
              </button>
            </div>

            {/* Кнопка загрузки файла баннера с компьютера */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={bannerInputRef}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'banner')}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl font-medium flex items-center justify-center gap-2 text-xs text-white transition-all active:scale-95"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                {uploading ? 'Загрузка...' : (bannerConf.fit === 'contain' ? '📁 Загрузить прозрачное лого (PNG/SVG/WebP)' : '📁 Загрузить файл баннера с ПК')}
              </button>

              <input
                type="text"
                value={bannerConf.imageUrl}
                onChange={(e) => {
                  handleBannerConfig('imageUrl', e.target.value);
                  if (e.target.value) handleBannerConfig('enabled', true);
                }}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-neutral-300 font-mono"
                placeholder={bannerConf.fit === 'contain' ? "Или URL логотипа (https://...)" : "Или URL картинки баннера (https://...)"}
              />
            </div>

            {/* Настройки баннера / логотипа */}
            {bannerConf.enabled && (
              <div className="flex flex-col gap-3 pt-2 border-t border-neutral-800 text-xs">
                {/* Высота */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-400">{bannerConf.fit === 'contain' ? 'Высота области логотипа:' : 'Высота баннера:'}</span>
                    <span className="text-sky-400 font-mono">{bannerConf.height}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="360"
                    step="5"
                    value={bannerConf.height}
                    onChange={(e) => handleBannerConfig('height', parseInt(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-0.5">
                    <span>40px (Узкая)</span>
                    <span>140px (Стандарт)</span>
                    <span>360px (Широкая)</span>
                  </div>
                </div>

                {/* Специфичные настройки для Прозрачного лого */}
                {bannerConf.fit === 'contain' ? (
                  <>
                    {/* Позиция логотипа по высоте (Сдвиг Y) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Позиция по высоте (Сдвиг Y):</span>
                        <span className="text-sky-400 font-mono">{bannerConf.positionY ?? 50}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="2"
                        value={bannerConf.positionY ?? 50}
                        onChange={(e) => handleBannerConfig('positionY', parseInt(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 mt-0.5">
                        <span>Выше (0%)</span>
                        <span>По центру (50%)</span>
                        <span>Ниже (100%)</span>
                      </div>
                    </div>

                    {/* Масштаб логотипа */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Масштаб логотипа:</span>
                        <span className="text-sky-400 font-mono">{bannerConf.logoScale || 90}%</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        step="5"
                        value={bannerConf.logoScale || 90}
                        onChange={(e) => handleBannerConfig('logoScale', parseInt(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    {/* Прозрачный фон */}
                    <div className="flex items-center justify-between p-2.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                      <div>
                        <div className="text-neutral-200 font-medium">Прозрачный фон</div>
                        <div className="text-[10px] text-neutral-500">Сквозной показ анимированного 3D фона сайта</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={bannerConf.transparentBg ?? true}
                        onChange={(e) => handleBannerConfig('transparentBg', e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 cursor-pointer"
                      />
                    </div>

                    {/* Наплыв аватара */}
                    <div className="flex items-center justify-between p-2.5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                      <div>
                        <div className="text-neutral-200 font-medium">Наплыв аватара на лого</div>
                        <div className="text-[10px] text-neutral-500">Аватарка частично заходит на логотип снизу</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={bannerConf.avatarOverlap ?? true}
                        onChange={(e) => handleBannerConfig('avatarOverlap', e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 cursor-pointer"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Затемнение */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Затемнение (Overlay):</span>
                        <span className="text-sky-400 font-mono">{Math.round(bannerConf.overlayOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="0.8"
                        step="0.05"
                        value={bannerConf.overlayOpacity}
                        onChange={(e) => handleBannerConfig('overlayOpacity', parseFloat(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    {/* Сдвиг картинки по вертикали */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Позиция по высоте (Центровка):</span>
                        <span className="text-sky-400 font-mono">{bannerConf.positionY}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={bannerConf.positionY}
                        onChange={(e) => handleBannerConfig('positionY', parseInt(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    {/* Размытие (Blur) */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-neutral-400">Размытие (Blur):</span>
                        <span className="text-sky-400 font-mono">{bannerConf.blur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="16"
                        step="1"
                        value={bannerConf.blur}
                        onChange={(e) => handleBannerConfig('blur', parseInt(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    {/* Наплыв аватара */}
                    <div className="flex items-center justify-between p-2 bg-neutral-950/70 border border-neutral-800 rounded-xl">
                      <span className="text-neutral-300">Наплыв аватара на баннер</span>
                      <input
                        type="checkbox"
                        checked={bannerConf.avatarOverlap ?? true}
                        onChange={(e) => handleBannerConfig('avatarOverlap', e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* СЕКЦИЯ: ТОЧНАЯ КАЛИБРОВКА АВАТАРА */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-4">
            <h2 className="font-semibold text-neutral-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              Точная настройка Аватарки (Zoom, Позиция, Форма)
            </h2>

            {/* Выбор картинки */}
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 overflow-hidden border-2 border-neutral-700 bg-neutral-800 shrink-0"
                style={{
                  borderRadius: avatarConf.shape === 'circle' ? '50%' : avatarConf.shape === 'squircle' ? '30%' : '12px'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={profile.avatarUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(${avatarConf.zoom}) translate(${avatarConf.offsetX}%, ${avatarConf.offsetY}%)`
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'avatar')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl font-medium flex items-center justify-center gap-2 text-xs text-white"
                >
                  <Upload className="w-4 h-4 text-sky-400" />
                  {uploading ? 'Загрузка...' : 'Загрузить новое фото с ПК'}
                </button>
              </div>
            </div>

            {/* Форма аватара */}
            <div>
              <label className="text-neutral-400 block mb-1 text-xs">Форма аватара</label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {(['circle', 'squircle', 'rounded', 'square'] as const).map(shape => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => handleAvatarConfig('shape', shape)}
                    className={`py-1.5 rounded-lg border text-center capitalize transition-colors ${
                      avatarConf.shape === shape 
                        ? 'bg-sky-600 border-sky-400 text-white font-semibold' 
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {shape === 'circle' ? 'Круг' : shape === 'squircle' ? 'Сквиркл' : shape === 'rounded' ? 'Скругл.' : 'Квадрат'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ползунок Масштаба (Zoom) */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400">Приближение (Zoom):</span>
                <span className="text-sky-400 font-mono">{avatarConf.zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="3"
                step="0.05"
                value={avatarConf.zoom}
                onChange={(e) => handleAvatarConfig('zoom', parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Смещение по горизонтали и вертикали */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">Сдвиг X:</span>
                  <span className="text-sky-400 font-mono">{avatarConf.offsetX}%</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={avatarConf.offsetX}
                  onChange={(e) => handleAvatarConfig('offsetX', parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">Сдвиг Y:</span>
                  <span className="text-sky-400 font-mono">{avatarConf.offsetY}%</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={avatarConf.offsetY}
                  onChange={(e) => handleAvatarConfig('offsetY', parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Размер кружка аватара */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400">Размер аватара:</span>
                <span className="text-sky-400 font-mono">{avatarConf.size}px</span>
              </div>
              <input
                type="range"
                min="90"
                max="180"
                step="2"
                value={avatarConf.size}
                onChange={(e) => handleAvatarConfig('size', parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Обводка и Свечение */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="glow"
                  checked={avatarConf.hasGlow}
                  onChange={(e) => handleAvatarConfig('hasGlow', e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500"
                />
                <label htmlFor="glow" className="text-neutral-300 flex items-center gap-1 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Неоновое свечение
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Цвет обводки:</span>
                <input
                  type="color"
                  value={avatarConf.borderColor}
                  onChange={(e) => {
                    handleAvatarConfig('borderColor', e.target.value);
                    handleAvatarConfig('glowColor', e.target.value);
                  }}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>
          </div>

          {/* СЕКЦИЯ: ИМЯ И BIO */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-200">Тексты профиля</h2>
            <div>
              <label className="text-neutral-400 block mb-1 text-xs">Имя</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => handleUpdate('displayName', e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1 text-xs">Bio / Описание</label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleUpdate('bio', e.target.value)}
                rows={2}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* СЕКЦИЯ: ИКОНКИ И ССЫЛКИ (3 РЯДА: СОЦСЕТИ, СТРИМЫ, МУЗЫКА) */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-200 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-sky-400" />
                Иконки профиля (3 ряда, {profile.socials.length})
              </h2>
            </div>

            {/* ПЕРЕКЛЮЧАТЕЛЬ СТИЛЯ ИКОНОК */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
              <div>
                <div className="text-xs font-semibold text-neutral-200">Официальные цвета иконок</div>
                <div className="text-[11px] text-neutral-400">100% аутентичные брендовые цвета и стили</div>
              </div>
              <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-700/80">
                <button
                  type="button"
                  onClick={() => handleThemeUpdate('socialIconStyle', 'badges')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    (profile.theme?.socialIconStyle || 'badges') === 'badges'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🎨 Цветные бейджи
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeUpdate('socialIconStyle', 'colored_icons')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    profile.theme?.socialIconStyle === 'colored_icons'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🔮 Цветные на темном
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeUpdate('socialIconStyle', 'monochrome')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    profile.theme?.socialIconStyle === 'monochrome'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  ⚪ Монохром
                </button>
              </div>
            </div>

            {/* РЕГУЛЯТОР РАЗМЕРА ИКОНОК СОЦСЕТЕЙ */}
            <div className="flex flex-col gap-3 p-3.5 bg-neutral-950/80 border border-neutral-800 rounded-xl">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Размер иконок соцсетей</div>
                  <div className="text-[11px] text-neutral-400">Масштаб кружков и логотипов во всех 3 рядах</div>
                </div>
                <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-md">
                  {profile.theme?.socialIconSize ?? 40} px
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={24}
                  max={64}
                  step={2}
                  value={profile.theme?.socialIconSize ?? 40}
                  onChange={(e) => handleThemeUpdate('socialIconSize', Number(e.target.value))}
                  className="flex-1 accent-sky-500 cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  {[
                    { label: 'S', size: 32 },
                    { label: 'M', size: 40 },
                    { label: 'L', size: 48 },
                    { label: 'XL', size: 56 },
                  ].map((preset) => {
                    const active = (profile.theme?.socialIconSize ?? 40) === preset.size;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleThemeUpdate('socialIconSize', preset.size)}
                        className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-sky-500 text-white shadow-sm'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                        title={`${preset.size}px`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Вспомогательный рендерер карточки ссылки */}
            {(() => {
              const renderSocialCard = (s: SocialLink) => {
                const brand = getBrandStyle(s.platform);

                return (
                  <div key={s.id} className="p-3 bg-neutral-800/80 border border-neutral-700/60 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div 
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${brand.border || ''}`}
                          style={{
                            background: brand.badgeBg,
                            color: brand.badgeText === 'text-black' ? '#000000' : '#ffffff',
                          }}
                          title={`Официальный цвет: ${brand.name}`}
                        >
                          <BrandIcon platform={s.platform} mode="badge" className="w-4 h-4" />
                        </div>
                        <select
                          value={s.platform}
                          onChange={(e) => updateSocial(s.id, 'platform', e.target.value)}
                          className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <optgroup label="💬 Соцсети">
                            <option value="telegram">Telegram</option>
                            <option value="instagram">Instagram</option>
                            <option value="youtube">YouTube</option>
                            <option value="tiktok">TikTok</option>
                            <option value="vk">VK (ВКонтакте)</option>
                            <option value="discord">Discord</option>
                            <option value="x">X / Twitter</option>
                            <option value="threads">Threads</option>
                            <option value="facebook">Facebook</option>
                            <option value="boosty">Boosty</option>
                            <option value="patreon">Patreon</option>
                          </optgroup>
                          <optgroup label="🔴 Стримы">
                            <option value="twitch">Twitch</option>
                            <option value="kick">Kick</option>
                            <option value="vklive">VK Live</option>
                            <option value="trovo">Trovo</option>
                          </optgroup>
                          <optgroup label="🎵 Музыка">
                            <option value="spotify">Spotify</option>
                            <option value="applemusic">Apple Music</option>
                            <option value="youtubemusic">YouTube Music</option>
                            <option value="yandexmusic">Яндекс Музыка</option>
                            <option value="soundcloud">SoundCloud</option>
                            <option value="amazonmusic">Amazon Music</option>
                            <option value="deezer">Deezer</option>
                          </optgroup>
                          <optgroup label="🌐 Другое">
                            <option value="custom">Своя ссылка</option>
                          </optgroup>
                        </select>

                        <input
                          type="text"
                          value={s.title}
                          onChange={(e) => updateSocial(s.id, 'title', e.target.value)}
                          className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-xs text-white font-medium flex-1 min-w-[80px]"
                          placeholder="Название"
                        />
                      </div>

                    <div className="flex items-center gap-1">
                      <select
                        value={detectCategory(s)}
                        onChange={(e) => updateSocial(s.id, 'category', e.target.value as SocialCategory)}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-1.5 py-1 text-[11px] text-sky-400 cursor-pointer"
                        title="Сменить ряд"
                      >
                        <option value="social">Ряд 1: Соцсети</option>
                        <option value="stream">Ряд 2: Стримы</option>
                        <option value="music">Ряд 3: Музыка</option>
                      </select>
                      <button
                        onClick={() => moveSocial(s.id, 'up')}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700"
                        title="Вверх"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveSocial(s.id, 'down')}
                        className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-700"
                        title="Вниз"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeSocial(s.id)}
                        className="p-1 text-neutral-400 hover:text-red-400 rounded hover:bg-neutral-700 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={s.url}
                    onChange={(e) => updateSocial(s.id, 'url', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-neutral-300 font-mono"
                    placeholder="https://..."
                  />
                </div>
              );
            };

              const socialItems = profile.socials.filter(s => detectCategory(s) === 'social');
              const streamItems = profile.socials.filter(s => detectCategory(s) === 'stream');
              const musicItems = profile.socials.filter(s => detectCategory(s) === 'music');

              return (
                <div className="flex flex-col gap-4">
                  {/* РЯД 1: СОЦИАЛЬНЫЕ СЕТИ */}
                  <div className="flex flex-col gap-2.5 p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                        💬 Ряд 1: Соцсети ({socialItems.length})
                      </span>
                      <button
                        onClick={() => addSocial('social')}
                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium bg-neutral-800 px-2 py-0.5 rounded-lg border border-neutral-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Добавить соцсеть
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {socialItems.map(renderSocialCard)}
                      {socialItems.length === 0 && (
                        <div className="text-[11px] text-neutral-500 py-2 text-center">Ряд пуст</div>
                      )}
                    </div>
                  </div>

                  {/* РЯД 2: СТРИМЫ */}
                  <div className="flex flex-col gap-2.5 p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                        🔴 Ряд 2: Стримы ({streamItems.length})
                      </span>
                      <button
                        onClick={() => addSocial('stream')}
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium bg-neutral-800 px-2 py-0.5 rounded-lg border border-neutral-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Добавить стрим
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {streamItems.map(renderSocialCard)}
                      {streamItems.length === 0 && (
                        <div className="text-[11px] text-neutral-500 py-2 text-center">Ряд пуст</div>
                      )}
                    </div>
                  </div>

                  {/* РЯД 3: МУЗЫКА */}
                  <div className="flex flex-col gap-2.5 p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        🎵 Ряд 3: Музыка ({musicItems.length})
                      </span>
                      <button
                        onClick={() => addSocial('music')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium bg-neutral-800 px-2 py-0.5 rounded-lg border border-neutral-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Добавить музыку
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {musicItems.map(renderSocialCard)}
                      {musicItems.length === 0 && (
                        <div className="text-[11px] text-neutral-500 py-2 text-center">Ряд пуст</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* СЕКЦИЯ: БЛОКИ, КАРТОЧКИ, SPOTIFY И YOUTUBE КАРУСЕЛЬ */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-neutral-200 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-sky-400" />
                Блоки и Карточки ({profile.blocks.length})
              </h2>
            </div>

            {/* Кнопки добавления */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => addBlock('youtube_carousel')}
                className="col-span-2 p-2.5 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/60 rounded-xl flex items-center justify-center gap-2 font-semibold text-rose-300 transition-colors"
              >
                <Video className="w-4 h-4 text-rose-400" />
                + Добавить Карусель YouTube видео (Full Card)
              </button>
              <button
                onClick={() => addBlock('image_link')}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-sky-400" /> + Карточка Full
              </button>
              <button
                onClick={() => addBlock('half_card')}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-sky-400" /> + Карточка 1/2
              </button>
              <button
                onClick={() => addBlock('music_embed')}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <Music className="w-3.5 h-3.5 text-emerald-400" /> + Spotify (Трек / Альбом)
              </button>
              <button
                onClick={() => addBlock('section_title')}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-400" /> + Заголовок
              </button>
            </div>

            {/* Список блоков */}
            <div className="flex flex-col gap-3 pt-2">
              {profile.blocks.map((block, idx) => (
                <div key={block.id} className="p-3.5 bg-neutral-800/80 border border-neutral-700/70 rounded-xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-sky-300">
                      #{idx + 1} {block.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveBlock(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        title="Поднять блок выше"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveBlock(idx, 'down')}
                        disabled={idx === profile.blocks.length - 1}
                        className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        title="Опустить блок ниже"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeBlock(idx)}
                        className="p-1 text-neutral-400 hover:text-red-400 ml-1"
                        title="Удалить блок"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* РЕДАКТОР КАРУСЕЛИ YOUTUBE С ПЕРЕМЕЩЕНИЕМ ВИДЕО */}
                  {block.type === 'youtube_carousel' && (
                    <div className="flex flex-col gap-3 p-2.5 bg-black/40 rounded-xl border border-white/5">
                      <input
                        type="text"
                        value={block.title || ''}
                        onChange={(e) => {
                          const updated = [...profile.blocks];
                          (updated[idx] as any).title = e.target.value;
                          setProfile(prev => ({ ...prev, blocks: updated }));
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                        placeholder="Название карусели видео"
                      />

                      <div className="flex flex-col gap-2">
                        {block.items.map((vid, vidIdx) => (
                          <div key={vid.id} className="flex flex-col gap-1.5 bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-neutral-400 font-mono">
                                Видео #{vidIdx + 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveVideoInCarousel(idx, vidIdx, 'up')}
                                  disabled={vidIdx === 0}
                                  className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 rounded bg-neutral-800"
                                  title="Переместить видео левее"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveVideoInCarousel(idx, vidIdx, 'down')}
                                  disabled={vidIdx === block.items.length - 1}
                                  className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 rounded bg-neutral-800"
                                  title="Переместить видео правее"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeVideoFromCarousel(idx, vidIdx)}
                                  className="p-1 text-neutral-400 hover:text-red-400 ml-1 rounded bg-neutral-800"
                                  title="Удалить видео"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <input
                              type="text"
                              value={vid.title}
                              onChange={(e) => {
                                const updated = [...profile.blocks];
                                (updated[idx] as any).items[vidIdx].title = e.target.value;
                                setProfile(prev => ({ ...prev, blocks: updated }));
                              }}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                              placeholder="Название ролика"
                            />
                            <input
                              type="text"
                              value={vid.videoUrl}
                              onChange={(e) => {
                                const updated = [...profile.blocks];
                                (updated[idx] as any).items[vidIdx].videoUrl = e.target.value;
                                setProfile(prev => ({ ...prev, blocks: updated }));
                              }}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-rose-300 font-mono"
                              placeholder="YouTube ссылка (https://...)"
                            />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addVideoToCarousel(idx)}
                          className="py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 rounded-lg border border-rose-800/40 flex items-center justify-center gap-1 font-medium mt-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> + Добавить еще видео в карусель
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SPOTIFY */}
                  {block.type === 'music_embed' && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={block.title}
                        onChange={(e) => {
                          const updated = [...profile.blocks];
                          (updated[idx] as any).title = e.target.value;
                          setProfile(prev => ({ ...prev, blocks: updated }));
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        placeholder="Название"
                      />
                      <input
                        type="text"
                        value={block.spotifyUri}
                        onChange={(e) => {
                          const updated = [...profile.blocks];
                          (updated[idx] as any).spotifyUri = e.target.value;
                          setProfile(prev => ({ ...prev, blocks: updated }));
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-mono"
                        placeholder="Ссылка на альбом или трек (open.spotify.com/album/...)"
                      />
                    </div>
                  )}

                  {/* КАРТОЧКИ */}
                  {(block.type === 'image_link' || block.type === 'half_card') && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={block.title}
                        onChange={(e) => {
                          const updated = [...profile.blocks];
                          (updated[idx] as any).title = e.target.value;
                          setProfile(prev => ({ ...prev, blocks: updated }));
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        placeholder="Заголовок"
                      />
                      <input
                        type="text"
                        value={block.url}
                        onChange={(e) => {
                          const updated = [...profile.blocks];
                          (updated[idx] as any).url = e.target.value;
                          setProfile(prev => ({ ...prev, blocks: updated }));
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-400"
                        placeholder="Ссылка (https://...)"
                      />
                      <label className="py-1.5 px-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-center cursor-pointer text-xs font-medium flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-sky-400" />
                        Загрузить обложку с ПК
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, idx)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {/* Заголовок секции */}
                  {block.type === 'section_title' && (
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) => {
                        const updated = [...profile.blocks];
                        (updated[idx] as any).title = e.target.value;
                        setProfile(prev => ({ ...prev, blocks: updated }));
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                      placeholder="Текст заголовка"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ЦВЕТА И ЖИВОЙ ШЕЙДЕР UNIVERSE */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-3">
            <h2 className="font-semibold text-neutral-200 flex items-center justify-between">
              <span>Цвета и Фон</span>
            </h2>

            {/* Тумблер 06 Universe */}
            <div className="flex items-center justify-between p-3 bg-indigo-950/40 border border-indigo-700/50 rounded-xl">
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-indigo-300">🌌 Шейдер 06 Universe (ShaderGradient)</span>
                <span className="text-[11px] text-neutral-400">Космический текучий 3D-градиент (0% нагрузки на CPU)</span>
              </div>
              <input
                type="checkbox"
                id="universeToggle"
                checked={profile.theme.useUniverseBackground ?? true}
                onChange={(e) => handleThemeUpdate('useUniverseBackground', e.target.checked)}
                className="w-5 h-5 rounded accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-neutral-400 text-xs">Цвет фона профиля (если шейдер выключен)</span>
              <input
                type="color"
                value={profile.theme.primaryBg}
                onChange={(e) => handleThemeUpdate('primaryBg', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 text-xs">Цвет внешнего фона ПК</span>
              <input
                type="color"
                value={profile.theme.desktopCanvasBg}
                onChange={(e) => handleThemeUpdate('desktopCanvasBg', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>

          {/* СОХРАНЕНИЕ */}
          <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-md pt-2 pb-4">
            <button
              onClick={handlePermanentSave}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                savedSuccess 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                  Сохранено в проект!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  💾 Сохранить изменения на диск
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: ЖИВОЙ ПРЕДПРОСМОТР */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start p-4 lg:p-8 overflow-y-auto max-h-screen bg-[#030014] overflow-hidden">
        {/* Фоновый живой 3D-шейдер 06 Universe на всю область предпросмотра */}
        {(profile.theme.useUniverseBackground ?? true) && (
          <UniverseGradient className="absolute inset-0 z-0 opacity-100" />
        )}
        <div className="text-xs text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 z-20 pointer-events-none">
          <RefreshCw className="w-3.5 h-3.5 text-sky-400 animate-spin" /> Живой предпросмотр (Live Preview)
        </div>
        <div className="w-full max-w-[500px] relative z-10 rounded-[34px] shadow-2xl">
          <HooBeProfileView profile={profile} isPreview={true} />
        </div>
      </div>

      {/* МОДАЛКА: СОХРАНИТЬ НОВЫЙ ПРЕСЕТ */}
      {showSavePresetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f111f] border border-neutral-700/80 rounded-2xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Сохранить пресет оформления
              </h3>
              <button
                type="button"
                onClick={() => setShowSavePresetModal(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Текущие настройки темы, шрифты, аватар, баннер и оформление блоков будут сохранены под указанным именем в вашей библиотеке пресетов.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1 font-medium">Название пресета *</label>
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Например: Стрим-сетап Осень 2026"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1 font-medium">Описание (опционально)</label>
                <input
                  type="text"
                  value={newPresetDesc}
                  onChange={(e) => setNewPresetDesc(e.target.value)}
                  placeholder="Например: Темный фон, неоновый аватар, ссылки на стримы"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Метка / Бейдж</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['CUSTOM', 'STREAM', 'VLOG', 'NIGHT', 'VIP', 'MINIMAL'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNewPresetBadge(tag)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        newPresetBadge === tag
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 ring-1 ring-sky-500/40'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={() => setShowSavePresetModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleSaveNewPreset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Сохранить пресет
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
