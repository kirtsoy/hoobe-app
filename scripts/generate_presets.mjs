import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load myProfile
const myProfilePath = path.join(process.cwd(), 'src', 'data', 'myProfile.ts');
const fileContent = fs.readFileSync(myProfilePath, 'utf-8');
const profileIdx = fileContent.indexOf('myProfile');
const firstBrace = fileContent.indexOf('{', profileIdx);
const lastBrace = fileContent.lastIndexOf('}');
const jsonStr = fileContent.substring(firstBrace, lastBrace + 1);
const baseProfile = JSON.parse(jsonStr);

const presets = [
  {
    id: 'preset_kirtsoy_official',
    name: '💎 Kirtsoy Official (Dark Luxury)',
    description: 'Официальный сетап Kirtsoy: 3D Universe шейдер, прозрачный логотип в шапке, шрифт Unbounded и фирменный контур.',
    badge: 'OFFICIAL',
    isSystem: true,
    createdAt: '2026-10-20T12:00:00.000Z',
    profile: JSON.parse(JSON.stringify(baseProfile))
  },
  {
    id: 'preset_cyber_space',
    name: '🌌 Cyber Space (Neon Void)',
    description: 'Футуристичный неоновый киберпанк: неоновое свечение аватара, шрифт Orbitron, глубокий космос и акценты индиго/циан.',
    badge: 'CYBER',
    isSystem: true,
    createdAt: '2026-10-20T12:00:00.000Z',
    profile: {
      ...JSON.parse(JSON.stringify(baseProfile)),
      displayName: 'KIRTSOY // CYBER',
      bio: 'digital explorer | tech creator | sound designer',
      theme: {
        ...baseProfile.theme,
        fontFamily: 'Orbitron',
        socialIconStyle: 'colored',
        useUniverseBackground: true,
        primaryBg: '#050314',
        textColor: '#e0f2fe'
      },
      avatarConfig: {
        size: 110,
        shape: 'rounded_square',
        zoom: 1.25,
        offsetX: 0,
        offsetY: 8,
        borderWidth: 2,
        borderColor: '#38bdf8',
        hasGlow: true,
        glowColor: 'rgba(56, 189, 248, 0.7)'
      },
      bannerConfig: {
        ...baseProfile.bannerConfig,
        enabled: true,
        fit: 'contain',
        transparentBg: true,
        logoScale: 60,
        positionY: 40
      }
    }
  },
  {
    id: 'preset_music_producer',
    name: '🎵 Music Producer (Vibe & Releases)',
    description: 'Студийный вайб для артистов и продюсеров: культовый шрифт Syne, акцент на стриминг (Spotify, Apple Music, SoundCloud) и музыкальные релизы.',
    badge: 'MUSIC',
    isSystem: true,
    createdAt: '2026-10-20T12:00:00.000Z',
    profile: {
      ...JSON.parse(JSON.stringify(baseProfile)),
      displayName: 'KIRTSOY PROD.',
      bio: 'music producer | beats & soundscapes | stream daily',
      theme: {
        ...baseProfile.theme,
        fontFamily: 'Syne',
        socialIconStyle: 'glass',
        useUniverseBackground: true,
        primaryBg: '#09090b',
        textColor: '#ffffff'
      },
      avatarConfig: {
        size: 115,
        shape: 'circle',
        zoom: 1.2,
        offsetX: 0,
        offsetY: 5,
        borderWidth: 2,
        borderColor: '#10b981',
        hasGlow: true,
        glowColor: 'rgba(16, 185, 129, 0.5)'
      },
      bannerConfig: {
        ...baseProfile.bannerConfig,
        enabled: true,
        fit: 'contain',
        transparentBg: true,
        logoScale: 70,
        positionY: 35
      }
    }
  },
  {
    id: 'preset_street_brutalism',
    name: '🔥 Street Brutalism (High Impact)',
    description: 'Мощный брутализм без полутонов: строгий глубокий монохром, плотный плакатный шрифт Bebas Neue, резкие формы и максимальный фокус.',
    badge: 'BRUTAL',
    isSystem: true,
    createdAt: '2026-10-20T12:00:00.000Z',
    profile: {
      ...JSON.parse(JSON.stringify(baseProfile)),
      displayName: 'KIRTSOY',
      bio: 'raw energy • no filters • pure signal',
      theme: {
        ...baseProfile.theme,
        fontFamily: 'Bebas Neue',
        socialIconStyle: 'minimal',
        useUniverseBackground: false,
        primaryBg: '#050505',
        desktopCanvasBg: '#000000',
        textColor: '#fafafa',
        cardRadius: 8,
        pageRadius: 20
      },
      avatarConfig: {
        size: 105,
        shape: 'square',
        zoom: 1.35,
        offsetX: 0,
        offsetY: 10,
        borderWidth: 3,
        borderColor: '#ffffff',
        hasGlow: true,
        glowColor: 'rgba(255, 255, 255, 0.3)'
      },
      bannerConfig: {
        ...baseProfile.bannerConfig,
        enabled: false
      }
    }
  }
];

const targetPath = path.join(process.cwd(), 'src', 'data', 'presets.json');
fs.writeFileSync(targetPath, JSON.stringify(presets, null, 2), 'utf-8');
console.log('Successfully wrote', presets.length, 'presets to', targetPath);
