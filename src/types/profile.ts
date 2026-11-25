export type SocialCategory = 'social' | 'stream' | 'music';

export interface SocialLink {
  id: string;
  category?: SocialCategory;
  platform: 
    | 'telegram'
    | 'instagram'
    | 'youtube'
    | 'tiktok'
    | 'vk'
    | 'x'
    | 'twitter'
    | 'threads'
    | 'facebook'
    | 'discord'
    | 'twitch'
    | 'kick'
    | 'vklive'
    | 'trovo'
    | 'spotify'
    | 'applemusic'
    | 'yandexmusic'
    | 'youtubemusic'
    | 'soundcloud'
    | 'amazonmusic'
    | 'custom'
    | string;
  url: string;
  title: string;
}

export interface CarouselProduct {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  url: string;
  buttonText?: string;
}

export interface YouTubeCarouselItem {
  id: string;
  title: string;
  videoUrl: string;
}

export type BlockType = 
  | 'image_link'
  | 'half_card'
  | 'carousel'
  | 'youtube_carousel'
  | 'section_title'
  | 'video_embed'
  | 'music_embed';

export interface BaseBlock {
  id: string;
  type: BlockType;
  gridColumn?: 'full' | 'left' | 'right';
  gridRowSpan?: number;
}

export interface ImageLinkBlockData extends BaseBlock {
  type: 'image_link' | 'half_card';
  title: string;
  url: string;
  imageUrl: string;
  badgeIcon?: string;
}

export interface SectionTitleBlockData extends BaseBlock {
  type: 'section_title';
  title: string;
}

export interface CarouselBlockData extends BaseBlock {
  type: 'carousel';
  items: CarouselProduct[];
}

export interface YouTubeCarouselBlockData extends BaseBlock {
  type: 'youtube_carousel';
  title?: string;
  items: YouTubeCarouselItem[];
}

export interface VideoEmbedBlockData extends BaseBlock {
  type: 'video_embed';
  title: string;
  videoUrl: string;
}

export interface MusicEmbedBlockData extends BaseBlock {
  type: 'music_embed';
  title: string;
  spotifyUri: string;
}

export type ContentBlock = 
  | ImageLinkBlockData 
  | SectionTitleBlockData 
  | CarouselBlockData 
  | YouTubeCarouselBlockData
  | VideoEmbedBlockData 
  | MusicEmbedBlockData;

export interface AvatarSettings {
  size: number;
  shape: 'circle' | 'squircle' | 'rounded' | 'square';
  zoom: number;
  offsetX: number;
  offsetY: number;
  borderWidth: number;
  borderColor: string;
  hasGlow: boolean;
  glowColor: string;
}

export interface BannerSettings {
  enabled: boolean;          // включен ли баннер
  imageUrl: string;          // ссылка на изображение баннера или прозрачного логотипа
  height: number;            // высота баннера в px (напр. 60 - 280px)
  overlayOpacity: number;    // затемнение баннера (0 - 0.8)
  blur: number;              // легкий blur (0 - 20px)
  positionY: number;         // сдвиг позиции фона по Y (0 - 100%)
  fit?: 'cover' | 'contain'; // 'cover' для фото-обложек, 'contain' для логотипов без обрезки
  transparentBg?: boolean;   // Полная прозрачность фона (сквозной анимированный фон)
  avatarOverlap?: boolean;   // Наплыв аватара на баннер/логотип (-mt-[52px]), по умолчанию true
  logoScale?: number;        // Масштаб логотипа при fit='contain' (50% - 100%)
}

export type SocialIconStyle = 'badges' | 'colored_icons' | 'monochrome';

export interface ProfileTheme {
  primaryBg: string;
  desktopCanvasBg: string;
  textColor: string;
  fontFamily: string;
  cardRadius: number;
  pageRadius: number;
  useUniverseBackground?: boolean; // Флаг включения ShaderGradient 06 Universe
  socialIconStyle?: SocialIconStyle; // Стиль отображения иконок (официальные бейджи по умолчанию)
  socialIconSize?: number; // Размер иконок соцсетей в px (по умолчанию 40)
}

export interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  avatarConfig?: AvatarSettings;
  bannerConfig?: BannerSettings;   // Настройки баннера в шапке
  isVerified: boolean;
  socials: SocialLink[];
  theme: ProfileTheme;
  blocks: ContentBlock[];
}
