import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const sampleDecks = [
  {
    id: 1,
    name: "Spanish Vocabulary",
    description: "Basic Spanish words and phrases",
    cards: 50,
    author: "LanguageLearner",
  },
  {
    id: 2,
    name: "Chemistry Elements",
    description: "Periodic table elements and their properties",
    cards: 118,
    author: "ScienceStudent",
  },
  {
    id: 3,
    name: "World History",
    description: "Key events and figures in world history",
    cards: 75,
    author: "HistoryBuff",
  },
  {
    id: 4,
    name: "JavaScript Basics",
    description: "Fundamental concepts of JavaScript programming",
    cards: 40,
    author: "CodeMaster",
  },
];

export default function BrowseDecksPage() {
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
            Browse Public Decks
          </h1>

          <div className="space-y-4">
            {sampleDecks.map((deck) => (
              <div
                key={deck.id}
                className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {deck.name}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {deck.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{deck.cards} cards</span>
                  <span>by {deck.author}</span>
                </div>
                <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-3 py-2 text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors">
                  Study This Deck
                </button>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>More decks coming soon! Create your own to share with others.</p>
          </div>
        </div>
      </div>
    </main>
  );
}