import React from 'react';

interface PageFooterProps {
  primaryBg?: string;
}

export const PageFooter: React.FC<PageFooterProps> = ({ primaryBg = '#103362' }) => {
  return (
    <footer className="w-full flex flex-col items-center py-12 px-4 gap-6">
      {/* HooBe branded button */}
      <a
        href="#"
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg border border-white/20"
        style={{ backgroundColor: primaryBg, color: '#ffffff' }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Create your own profile
      </a>

      {/* Navigation links */}
      <nav className="flex items-center justify-center gap-3 text-xs text-neutral-400">
        <a href="#" className="hover:underline">About</a>
        <span>·</span>
        <a href="#" className="hover:underline">Privacy</a>
        <span>·</span>
        <a href="#" className="hover:underline">Terms</a>
        <span>·</span>
        <a href="#" className="hover:underline">Report</a>
      </nav>
    </footer>
  );
};
