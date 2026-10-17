import React from 'react';
import { SocialLink, SocialCategory, SocialIconStyle } from '@/types/profile';
import { BrandIcon, getBrandStyle } from './BrandIcons';

interface SocialIconsBarProps {
  socials: SocialLink[];
  iconStyle?: SocialIconStyle;
}

export const detectCategory = (item: SocialLink): SocialCategory => {
  if (item.category) return item.category;

  const p = (item.platform || '').toLowerCase();
  const u = (item.url || '').toLowerCase();

  // 🔴 Стримы
  if (
    ['twitch', 'kick', 'vklive', 'vkvideo', 'vkplay', 'vkplaylive', 'trovo'].includes(p) ||
    u.includes('twitch.tv') ||
    u.includes('kick.com') ||
    u.includes('live.vkvideo.ru') ||
    u.includes('trovo.live')
  ) {
    return 'stream';
  }

  // 🎵 Музыка
  if (
    ['spotify', 'applemusic', 'apple', 'yandexmusic', 'yandex', 'youtubemusic', 'ytmusic', 'soundcloud', 'amazonmusic', 'amazon', 'deezer'].includes(p) ||
    u.includes('spotify.com') ||
    u.includes('music.apple.com') ||
    u.includes('music.yandex.ru') ||
    u.includes('music.youtube.com') ||
    u.includes('soundcloud.com')
  ) {
    return 'music';
  }

  // 💬 Соцсети по умолчанию
  return 'social';
};

export const SocialIconsBar: React.FC<SocialIconsBarProps> = ({ 
  socials, 
  iconStyle = 'badges' 
}) => {
  if (!socials || socials.length === 0) return null;

  // Разделение на 3 ряда
  const socialLinks = socials.filter(s => detectCategory(s) === 'social');
  const streamLinks = socials.filter(s => detectCategory(s) === 'stream');
  const musicLinks = socials.filter(s => detectCategory(s) === 'music');

  const renderIconRow = (items: SocialLink[], rowKey: string) => {
    if (items.length === 0) return null;

    return (
      <div 
        key={rowKey}
        className="flex items-center justify-center flex-wrap gap-2.5 max-w-[420px] transition-all duration-300"
      >
        {items.map((item) => {
          const brand = getBrandStyle(item.platform);

          if (iconStyle === 'badges') {
            // 🎨 100% официальные цветные бейджи брендов
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                style={{
                  background: brand.badgeBg,
                  boxShadow: `0 4px 14px -2px ${brand.glowColor}`,
                }}
                className={`w-10 h-10 rounded-full ${brand.badgeText} ${brand.border || ''} transition-all duration-200 flex items-center justify-center relative shadow-lg hover:scale-115 hover:-translate-y-0.5 active:scale-95 group`}
              >
                <BrandIcon 
                  platform={item.platform} 
                  mode="badge" 
                  className="w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110 drop-shadow-sm" 
                />
                
                {/* Тонкий тултип при наведении */}
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-black/90 text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md border border-white/10 whitespace-nowrap z-30 shadow-xl">
                  {item.title}
                </span>
              </a>
            );
          }

          if (iconStyle === 'colored_icons') {
            // 🔮 Цветные неоновые иконки на темном стекле
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.12] hover:border-white/35 backdrop-blur-md transition-all duration-200 flex items-center justify-center relative shadow-md hover:scale-115 hover:-translate-y-0.5 active:scale-95 group"
                style={{
                  boxShadow: `0 2px 10px -2px rgba(0,0,0,0.5)`,
                }}
              >
                <BrandIcon 
                  platform={item.platform} 
                  mode="colored" 
                  className="w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110" 
                />
                
                {/* Тонкий тултип при наведении */}
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-black/90 text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md border border-white/10 whitespace-nowrap z-30 shadow-xl">
                  {item.title}
                </span>
              </a>
            );
          }

          // ⚪ Монохром (минимализм)
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.22] border border-white/[0.12] hover:border-white/35 backdrop-blur-md transition-all duration-200 flex items-center justify-center relative shadow-md hover:scale-110 active:scale-95 text-white/90 hover:text-white group"
            >
              <BrandIcon 
                platform={item.platform} 
                mode="monochrome" 
                className="w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-105" 
              />
              
              {/* Тонкий тултип при наведении */}
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-black/90 text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-md border border-white/10 whitespace-nowrap z-30 shadow-xl">
                {item.title}
              </span>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full px-4 py-2 flex flex-col items-center gap-3 relative z-20">
      {/* РЯД 1: СОЦИАЛЬНЫЕ СЕТИ */}
      {renderIconRow(socialLinks, 'row-socials')}

      {/* РЯД 2: СТРИМЫ (LIVE STREAMING) */}
      {renderIconRow(streamLinks, 'row-streams')}

      {/* РЯД 3: МУЗЫКА (MUSIC & AUDIO) */}
      {renderIconRow(musicLinks, 'row-music')}
    </div>
  );
};
