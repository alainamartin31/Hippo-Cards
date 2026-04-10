"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDecks } from "@/lib/deckStorage";

export default function MyDecksPage() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDecks = getDecks();
    setDecks(userDecks);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 px-6 py-10">
        <div className="mx-auto max-w-md">
          <p className="text-gray-600 dark:text-gray-400">Loading decks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 px-6 py-10 transition-colors duration-300">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/study" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Study Options
          </Link>
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Decks
          </h1>

          {decks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No decks yet. Create your first deck!</p>
              <Link
                href="/study/create"
                className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-4 py-2 text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors"
              >
                Create Deck
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {decks.map((deck) => (
                <div
                  key={deck.id}
                  className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-200 dark:border-slate-700"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {deck.name}
                  </h2>
                  {deck.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {deck.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/study/deck/${deck.id}/study`}
                      className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-3 py-2 text-white text-sm font-medium text-center hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors"
                    >
                      Study
                    </Link>
                    <Link
                      href={`/study/deck/${deck.id}`}
                      className="flex-1 rounded-lg bg-gray-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white text-sm font-medium text-center hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}