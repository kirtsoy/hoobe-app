import React from 'react';
import { ImageLinkBlockData } from '@/types/profile';
import { ExternalLink } from 'lucide-react';

interface ImageLinkCardProps {
  block: ImageLinkBlockData;
  isHalf?: boolean;
}

export const ImageLinkCard: React.FC<ImageLinkCardProps> = ({ block, isHalf = false }) => {
  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full overflow-hidden rounded-[16px] border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] ${
        isHalf ? 'h-[220px]' : 'h-[260px] sm:h-[300px]'
      }`}
    >
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.imageUrl}
        alt={block.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Gradient Overlay: exact hoo.be recipe */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 80%)'
        }}
      />

      {/* External Link Pill Icon (top-right) */}
      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:text-white group-hover:bg-black/60 transition-colors">
        <ExternalLink className="w-4 h-4" />
      </div>

      {/* Bottom Title Bar */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex items-end">
        <p className="text-[15px] font-semibold text-white leading-snug line-clamp-2 drop-shadow-sm">
          {block.title}
        </p>
      </div>
    </a>
  );
};
