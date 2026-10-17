'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    // Высокопроизводительный спортивный режим Lenis:
    // lerp: 0.1 дает мгновенный отклик на колесо без ощущения "желе" и лага мыши
    const lenis = new Lenis({
      lerp: 0.1,              // Линейная интерполяция: высокая отзывчивость, 0 задержки
      wheelMultiplier: 0.9,   // Сбалансированный шаг прокрутки
      touchMultiplier: 1.2,   // Плавность на мобильных
      smoothWheel: true,
      infinite: false,
      autoResize: true,       // Автоматический перерасчет при загрузке картинок
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
