import { HooBeProfileView } from '@/components/HooBeProfileView';
import { myProfile } from '@/data/myProfile';
import Link from 'next/link';
import { Edit3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative">
      {/* Плавающая кнопка для быстрого перехода в редактор */}
      <Link
        href="/admin"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium"
      >
        <Edit3 className="w-4 h-4 text-sky-400" />
        <span>Редактировать</span>
      </Link>

      <HooBeProfileView profile={myProfile} />
    </div>
  );
}
