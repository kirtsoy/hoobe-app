import React from 'react';
import { SocialLink, SocialCategory, SocialIconStyle } from '@/types/profile';
import { BrandIcon, getBrandStyle } from './BrandIcons';

interface SocialIconsBarProps {
  socials: SocialLink[];
  iconStyle?: SocialIconStyle;
  iconSize?: number;
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
  iconStyle = 'badges',
  iconSize = 40,
}) => {
  if (!socials || socials.length === 0) return null;

  const clampedSize = Math.min(72, Math.max(24, iconSize));
  const glyphSize = Math.round(clampedSize * 0.55);
  const circleStyle: React.CSSProperties = {
    width: `${clampedSize}px`,
    height: `${clampedSize}px`,
  };
  const glyphWrapperStyle: React.CSSProperties = {
    width: `${glyphSize}px`,
    height: `${glyphSize}px`,
  };

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

          const variantConfig =
            iconStyle === 'badges'
              ? {
                  mode: 'badge' as const,
                  className: `rounded-full ${brand.badgeText} ${brand.border || ''} transition-all duration-200 flex items-center justify-center relative shadow-lg hover:scale-115 hover:-translate-y-0.5 active:scale-95 group`,
                  style: {
                    ...circleStyle,
                    background: brand.badgeBg,
                    boxShadow: `0 4px 14px -2px ${brand.glowColor}`,
                  },
                }
              : iconStyle === 'colored_icons'
              ? {
                  mode: 'colored' as const,
                  className:
                    'rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.12] hover:border-white/35 backdrop-blur-md transition-all duration-200 flex items-center justify-center relative shadow-md hover:scale-115 hover:-translate-y-0.5 active:scale-95 group',
                  style: {
                    ...circleStyle,
                    boxShadow: '0 2px 10px -2px rgba(0,0,0,0.5)',
                  },
                }
              : {
                  mode: 'monochrome' as const,
                  className:
                    'rounded-full bg-white/[0.08] hover:bg-white/[0.22] border border-white/[0.12] hover:border-white/35 backdrop-blur-md transition-all duration-200 flex items-center justify-center relative shadow-md hover:scale-110 active:scale-95 text-white/90 hover:text-white group',
                  style: circleStyle,
                };

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              style={variantConfig.style}
              className={variantConfig.className}
            >
              <span
                style={glyphWrapperStyle}
                className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              >
                <BrandIcon
                  platform={item.platform}
                  mode={variantConfig.mode}
                  className="w-full h-full drop-shadow-sm"
                />
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
