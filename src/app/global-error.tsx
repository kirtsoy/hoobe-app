'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Что-то пошло не так</h2>
        <p className="text-neutral-400 text-sm mb-4 max-w-md">
          {error.message || 'Произошла непредвиденная ошибка.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-sm font-semibold transition-colors"
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
