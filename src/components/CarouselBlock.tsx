'use client';

import React, { useRef } from 'react';
import { CarouselProduct } from '@/types/profile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselBlockProps {
  items: CarouselProduct[];
}

export const CarouselBlock: React.FC<CarouselBlockProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] py-1">
      {/* Navigation Chevrons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-md"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-md"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Snap Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-1 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[180px] sm:w-[190px] snap-start rounded-[16px] overflow-hidden bg-white shadow-md border border-neutral-200/80 flex flex-col transition-transform hover:-translate-y-0.5"
          >
            {/* Product Image */}
            <div className="h-[140px] w-full overflow-hidden bg-neutral-100 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col flex-1 justify-between bg-white">
              <div>
                <p className="text-[13px] font-semibold text-neutral-900 line-clamp-1 leading-tight">
                  {product.title}
                </p>
                <p className="text-[14px] text-neutral-800 font-bold mt-1">
                  {product.price}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full py-2 px-3 text-center text-[13px] font-semibold rounded-[8px] bg-[#E6E7EB] hover:bg-[#dcdde2] text-black transition-colors"
              >
                {product.buttonText || 'Shop'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
