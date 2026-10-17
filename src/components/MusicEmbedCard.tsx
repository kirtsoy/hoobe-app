import React from 'react';
import { MusicEmbedBlockData } from '@/types/profile';

interface MusicEmbedCardProps {
  block: MusicEmbedBlockData;
}

export const MusicEmbedCard: React.FC<MusicEmbedCardProps> = ({ block }) => {
  // Автоматическое преобразование ссылок на треки, альбомы и плейлисты в Spotify Embed
  const getSpotifyEmbed = (url: string) => {
    if (!url) return '';
    // Если уже embed
    if (url.includes('open.spotify.com/embed/')) return url;
    // Обычная ссылка на альбом, трек или плейлист
    if (url.includes('open.spotify.com/')) {
      return url.replace('open.spotify.com/', 'open.spotify.com/embed/');
    }
    return url;
  };

  const embedUrl = getSpotifyEmbed(block.spotifyUri);
  // Альбом или плейлист требуют больше высоты (352px), одиночный трек - 152px
  const isCollection = embedUrl.includes('/album/') || embedUrl.includes('/playlist/');
  const frameHeight = isCollection ? '352' : '152';

  return (
    <div className="w-full flex flex-col gap-2 rounded-[16px] overflow-hidden bg-black/40 border border-white/10 shadow-lg p-1.5 transition-all">
      {block.title && (
        <p className="text-xs font-semibold text-white/90 px-3 pt-1.5">
          {block.title}
        </p>
      )}
      <div className="w-full rounded-[12px] overflow-hidden bg-neutral-900">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height={frameHeight}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0 rounded-[12px]"
          />
        ) : (
          <div className="flex items-center justify-center h-28 text-xs text-neutral-500">
            Укажите ссылку на Spotify трек, альбом или плейлист
          </div>
        )}
      </div>
    </div>
  );
};
