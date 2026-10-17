'use client';

import React, { useRef, useState } from 'react';
import { YouTubeCarouselBlockData } from '@/types/profile';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface YouTubeCarouselProps {
  block: YouTubeCarouselBlockData;
}

export const YouTubeCarousel: React.FC<YouTubeCarouselProps> = ({ block }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const offset = direction === 'left' ? -containerWidth : containerWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      if (width > 0) {
        const idx = Math.round(scrollLeft / width);
        setActiveIdx(idx);
      }
    }
  };

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

  if (!block.items || block.items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] py-1">
      {block.title && (
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="flex items-center gap-1.5">
            <Play className="w-4 h-4 text-rose-500 fill-current" />
            <h2 className="text-[16px] font-semibold text-white/95">
              {block.title}
            </h2>
          </div>
          {block.items.length > 1 && (
            <span className="text-xs text-neutral-400 font-mono">
              {activeIdx + 1} / {block.items.length}
            </span>
          )}
        </div>
      )}

      {/* Кнопки прокрутки (показываются если больше 1 видео) */}
      {block.items.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center opacity-85 hover:opacity-100 transition-all shadow-xl active:scale-95 border border-white/10"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center opacity-85 hover:opacity-100 transition-all shadow-xl active:scale-95 border border-white/10"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Контейнер карусели с Full-width карточками */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-[16px]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {block.items.map((video) => {
          const embedUrl = getEmbedUrl(video.videoUrl);

          return (
            <div
              key={video.id}
              className="w-full flex-shrink-0 snap-start snap-always rounded-[16px] overflow-hidden bg-black/60 border border-white/10 shadow-xl flex flex-col p-2 gap-2"
            >
              {/* Full-width 16:9 плеер */}
              <div className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-black shadow-inner">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.title || 'YouTube Video'}
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

              {/* Название ролика снизу карточки */}
              {video.title && (
                <p className="text-[14px] font-semibold text-white px-2 py-0.5 line-clamp-1 leading-snug">
                  {video.title}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Индикаторы страниц (точки) под каруселью */}
      {block.items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {block.items.map((_, dotIdx) => (
            <div
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIdx 
                  ? 'w-5 bg-rose-500' 
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
