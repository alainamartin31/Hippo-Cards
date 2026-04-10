"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { saveDeck } from "@/lib/deckStorage";

export default function CreateDeckPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Please enter a deck name");
      return;
    }

    setLoading(true);
    
    try {
      const deckId = saveDeck(name, description);
      router.push(`/study/deck/${deckId}`);
    } catch (error) {
      alert("Error creating deck");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/study" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Study Options
          </Link>
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Your Own Deck
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="deck-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Deck Name
              </label>
              <input
                type="text"
                id="deck-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Biology 101"
              />
            </div>

            <div>
              <label htmlFor="deck-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="deck-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Brief description of the deck..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-4 py-3 text-white font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Deck"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>After creating, you'll be able to add flashcards to your deck.</p>
          </div>
        </div>
      </div>
    </main>
  );
}