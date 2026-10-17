import React from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="w-full py-2 px-1">
      <h2 className="text-[18px] font-semibold text-white/95 tracking-tight text-left">
        {title}
      </h2>
    </div>
  );
};
