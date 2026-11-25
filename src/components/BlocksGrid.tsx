'use client';

import React from 'react';
import { ContentBlock } from '@/types/profile';
import { ImageLinkCard } from './ImageLinkCard';
import { SectionTitle } from './SectionTitle';
import { CarouselBlock } from './CarouselBlock';
import { VideoEmbedCard } from './VideoEmbedCard';
import { MusicEmbedCard } from './MusicEmbedCard';
import { YouTubeCarousel } from './YouTubeCarousel';

interface BlocksGridProps {
  blocks: ContentBlock[];
}

export const BlocksGrid: React.FC<BlocksGridProps> = ({ blocks }) => {
  const visibleBlocks = blocks.filter((block) => !block.hidden);
  if (visibleBlocks.length === 0) return null;

  return (
    <div className="w-full px-4 py-2 flex flex-col gap-4">
      {visibleBlocks.map((block) => {
        if (block.type === 'section_title') {
          return <SectionTitle key={block.id} title={block.title} />;
        }

        if (block.type === 'carousel') {
          return <CarouselBlock key={block.id} items={block.items} />;
        }

        if (block.type === 'youtube_carousel') {
          return <YouTubeCarousel key={block.id} block={block} />;
        }

        if (block.type === 'image_link') {
          return <ImageLinkCard key={block.id} block={block} isHalf={false} />;
        }

        if (block.type === 'half_card') {
          return (
            <div key={block.id} className="w-full sm:w-[48%] inline-block">
              <ImageLinkCard block={block} isHalf={true} />
            </div>
          );
        }

        if (block.type === 'video_embed') {
          return <VideoEmbedCard key={block.id} block={block} />;
        }

        if (block.type === 'music_embed') {
          return <MusicEmbedCard key={block.id} block={block} />;
        }

        return null;
      })}
    </div>
  );
};
