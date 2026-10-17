import React from 'react';
import { VideoEmbedBlockData } from '@/types/profile';

interface VideoEmbedCardProps {
  block: VideoEmbedBlockData;
}

export const VideoEmbedCard: React.FC<VideoEmbedCardProps> = ({ block }) => {
  // Автоматическое извлечение ID для YouTube ссылок
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(block.videoUrl);

  return (
    <div className="w-full flex flex-col gap-2 rounded-[16px] overflow-hidden bg-black/40 border border-white/10 shadow-lg p-1">
      {block.title && (
        <p className="text-xs font-semibold text-white/90 px-3 pt-2">
          {block.title}
        </p>
      )}
      <div className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={block.title || 'Video Player'}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-neutral-500">
            Укажите ссылку на YouTube видео
          </div>
        )}
      </div>
    </div>
  );
};
