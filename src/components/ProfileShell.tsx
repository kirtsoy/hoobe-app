import React from 'react';
import { VerifiedBadge } from './VerifiedBadge';
import { AvatarSettings, BannerSettings } from '@/types/profile';

interface ProfileShellProps {
  avatarUrl: string;
  displayName: string;
  bio: string;
  isVerified?: boolean;
  textColor?: string;
  avatarConfig?: AvatarSettings;
  bannerConfig?: BannerSettings;
}

export const ProfileShell: React.FC<ProfileShellProps> = ({
  avatarUrl,
  displayName,
  bio,
  isVerified = true,
  textColor = '#ffffff',
  avatarConfig,
  bannerConfig,
}) => {
  // Настройки аватара по умолчанию
  const config: AvatarSettings = {
    size: 132,
    shape: 'circle',
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    borderWidth: 2,
    borderColor: 'transparent',
    hasGlow: false,
    glowColor: '#38bdf8',
    ...avatarConfig,
  };

  const banner: BannerSettings = {
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
    ...bannerConfig,
  };

  // Вычисление формы (border-radius)
  const getRadius = () => {
    switch (config.shape) {
      case 'circle':
        return '50%';
      case 'squircle':
        return '30%';
      case 'rounded':
        return '16px';
      case 'square':
        return '4px';
      default:
        return '50%';
    }
  };

  const borderRadius = getRadius();
  const hasBanner = banner.enabled && !!banner.imageUrl;
  const shouldOverlap = hasBanner && (banner.avatarOverlap ?? true);
  const isCutout = config.shape === 'cutout';
  const cropBottom = Math.min(70, Math.max(0, config.cutoutCropBottom ?? 0));
  const cutoutVisibleHeight = Math.round(config.size * (1 - cropBottom / 100));

  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      {/* ШАПКА-БАННЕР / ПРОЗРАЧНЫЙ ЛОГОТИП */}
      {hasBanner && (
        <div 
          className="relative w-full overflow-hidden transition-all duration-300 flex items-center justify-center"
          style={{ height: `${banner.height}px` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imageUrl}
            alt="Profile Banner / Logo"
            className={`transition-all duration-300 ${
              banner.fit === 'contain'
                ? 'w-auto object-contain drop-shadow-md'
                : 'w-full h-full object-cover'
            }`}
            style={{
              objectPosition: `center ${banner.positionY}%`,
              maxHeight: banner.fit === 'contain' ? `${Math.round((banner.height * (banner.logoScale || 90)) / 100)}px` : undefined,
              maxWidth: banner.fit === 'contain' ? `${banner.logoScale || 90}%` : undefined,
              filter: banner.blur > 0 ? `blur(${banner.blur}px)` : 'none',
              transform: banner.fit === 'contain' 
                ? `translateY(${((banner.positionY ?? 50) - 50) * 0.9}px)` 
                : (banner.blur > 0 ? 'scale(1.05)' : 'none'),
            }}
          />

          {/* Затемнение и градиентный переход (только если не включен полностью прозрачный фон) */}
          {!banner.transparentBg && banner.overlayOpacity > 0 && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,${banner.overlayOpacity}) 0%, rgba(0,0,0,${Math.min(1, banner.overlayOpacity + 0.3)}) 70%, rgba(8,7,26,0.9) 100%)`
              }}
            />
          )}
        </div>
      )}

      {/* КОНТЕНТ ПРОФИЛЯ (АВАТАР, ИМЯ, СТАТУС) */}
      <div 
        className={`relative z-20 w-full px-6 pb-2 text-center flex flex-col items-center transition-all duration-300 ${
          hasBanner ? (isCutout ? 'pt-0' : (shouldOverlap ? '-mt-[52px]' : 'pt-3')) : 'pt-8'
        }`}
      >
        {isCutout ? (
          /* ВЫРЕЗАННАЯ ПРОЗРАЧНАЯ PNG-АВАТАРКА (ОРГАНИЧНОЕ НАЛОЖЕНИЕ НА ЛОГО) */
          <div
            className="relative z-20 mb-2 flex items-start justify-center transition-all duration-200 select-none"
            style={{
              height: `${cutoutVisibleHeight}px`,
              marginTop: `${config.cutoutOffsetY ?? -95}px`,
              filter: config.hasGlow
                ? `drop-shadow(0 0 18px ${config.glowColor})`
                : 'drop-shadow(0 10px 22px rgba(0,0,0,0.55))',
            }}
          >
            <div className="h-full overflow-hidden flex items-start justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={displayName || 'Avatar'}
                className="w-auto max-w-none object-contain shrink-0"
                style={{ height: `${config.size}px` }}
              />
            </div>
            {isVerified && (
              <div className="absolute -right-2 bottom-2 z-30 pointer-events-none">
                <VerifiedBadge size={Math.max(20, Math.round(config.size * 0.16))} />
              </div>
            )}
          </div>
        ) : (
          /* Контейнер аватара с динамическим размером и свечением */
          <div 
            className="relative mb-3 transition-all duration-300 shadow-2xl"
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              filter: config.hasGlow ? `drop-shadow(0 0 18px ${config.glowColor})` : 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
            }}
          >
            <div 
              className="w-full h-full overflow-hidden p-0.5 transition-all duration-300 bg-black/40 backdrop-blur-sm"
              style={{
                borderRadius: borderRadius,
                border: `${Math.max(2, config.borderWidth)}px solid ${config.borderColor || 'rgba(255,255,255,0.2)'}`,
              }}
            >
              <div 
                className="w-full h-full overflow-hidden bg-black/20"
                style={{ borderRadius: borderRadius }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover transition-transform duration-150"
                  style={{
                    transform: `scale(${config.zoom}) translate(${config.offsetX}%, ${config.offsetY}%)`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            </div>

            {/* Синий бейдж верификации */}
            {isVerified && (
              <div 
                className="absolute z-20 pointer-events-none transition-all duration-300"
                style={{
                  right: config.shape === 'circle' ? '4px' : '-4px',
                  bottom: config.shape === 'circle' ? '4px' : '-4px',
                }}
              >
                <VerifiedBadge size={Math.max(20, Math.round(config.size * 0.2))} />
              </div>
            )}
          </div>
        )}

        {/* Имя и статус */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1
            className="text-[22px] font-semibold leading-tight line-clamp-2 drop-shadow-sm"
            style={{ color: textColor }}
          >
            {displayName}
          </h1>
          <p
            className="text-[14px] mt-1.5 whitespace-pre-wrap max-w-sm"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
};
