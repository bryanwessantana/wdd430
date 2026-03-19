'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
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
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-center text-xl font-semibold">Algo deu errado!</h2>
      <p className="text-gray-500">
        Não foi possível carregar as faturas no momento.
      </p>
      <div className="mt-4 flex gap-4">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={
            () => reset()
          }
        >
          Tentar novamente
        </button>
        <Link
          href="/dashboard"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200"
        >
          Voltar ao Início
        </Link>
      </div>
    </main>
  );
}