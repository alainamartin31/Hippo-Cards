"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function StudyCompletePage() {
  const params = useParams();
  const deckId = params.id as string;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 px-6 py-10 flex flex-col transition-colors duration-300">
      <div className="mb-6 flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-md w-full flex flex-col items-center justify-center flex-1">
        <div className="text-center">
          <div className="mb-6 text-6xl">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Great Job!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You've completed all the cards due for review today.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Cards marked "Got it!" will reappear in 3 days.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/study/deck/${deckId}`}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-bold py-3 px-6 text-center transition-colors"
            >
              Back to Deck
            </Link>
            <Link
              href="/study/mydecks"
              className="rounded-xl bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-bold py-3 px-6 text-center transition-colors"
            >
              Back to My Decks
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}