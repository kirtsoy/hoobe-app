import React from 'react';
import { ProfileData } from '@/types/profile';
import { ProfileShell } from './ProfileShell';
import { SocialIconsBar } from './SocialIconsBar';
import { BlocksGrid } from './BlocksGrid';
import { PageFooter } from './PageFooter';
import { UniverseGradient } from './UniverseGradient';

interface HooBeProfileViewProps {
  profile: ProfileData;
  isPreview?: boolean;
}

export const HooBeProfileView: React.FC<HooBeProfileViewProps> = ({ profile, isPreview = false }) => {
  const { theme } = profile;
  const currentFont = theme.fontFamily ? `"${theme.fontFamily}", sans-serif` : 'sans-serif';
  const showUniverse = theme.useUniverseBackground ?? true; // По умолчанию включен

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-start transition-colors duration-300 overflow-x-hidden ${
        isPreview ? 'min-h-0 bg-transparent' : 'min-h-screen'
      }`}
      style={{ 
        backgroundColor: isPreview 
          ? 'transparent' 
          : (showUniverse ? '#030014' : theme.desktopCanvasBg),
        fontFamily: currentFont,
      }}
    >
      {/* Фоновый живой шейдер 06 Universe на весь экран (на главной витрине) */}
      {!isPreview && showUniverse && (
        <UniverseGradient className="fixed inset-0 z-0 opacity-100 pointer-events-none" />
      )}

      {/* Мобильная подложка */}
      {!isPreview && (
        <div
          className="fixed inset-0 -z-10 sm:hidden"
          style={{ backgroundColor: showUniverse ? '#030014' : theme.primaryBg }}
        />
      )}

      {/* Основная карточка профиля HooBe */}
      <main 
        className={`w-full max-w-[540px] ${
          isPreview ? 'my-0 rounded-[28px]' : 'min-h-screen sm:min-h-0 sm:my-8 sm:rounded-[32px]'
        } relative z-10 flex flex-col items-center shadow-2xl transition-all duration-300 overflow-hidden ${
          showUniverse 
            ? 'bg-[#08071a]/80 backdrop-blur-2xl border border-white/15 shadow-[0_0_60px_rgba(79,70,229,0.3)]' 
            : ''
        }`}
        style={{ 
          backgroundColor: showUniverse ? undefined : theme.primaryBg,
          fontFamily: currentFont,
        }}
      >
        {/* Profile Info with Avatar Calibration and Header Banner */}
        <ProfileShell
          avatarUrl={profile.avatarUrl}
          displayName={profile.displayName}
          bio={profile.bio}
          isVerified={profile.isVerified}
          textColor={theme.textColor}
          avatarConfig={profile.avatarConfig}
          bannerConfig={profile.bannerConfig}
        />

        {/* Social Links */}
        <SocialIconsBar socials={profile.socials} iconStyle={profile.theme?.socialIconStyle || 'badges'} />

        {/* Dynamic Blocks Grid */}
        <BlocksGrid blocks={profile.blocks} />

        {/* Footer */}
        <PageFooter primaryBg={showUniverse ? '#1e1b4b' : theme.primaryBg} />
      </main>
    </div>
  );
};
