import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function StudyOptionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 px-6 py-10 transition-colors duration-300">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        {/* Theme Toggle */}
        <div className="flex justify-between items-center mb-2">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Choose How to Study
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Create your own deck or explore public decks.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">

          <Link
            href="/study/mydecks"
            className="block rounded-2xl bg-white dark:bg-slate-800 p-5 shadow border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Decks
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Study or manage your created decks.
            </p>
          </Link>

          <Link
            href="/study/create"
            className="block rounded-2xl bg-white dark:bg-slate-800 p-5 shadow border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Your Own Deck
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Build your own flashcards from scratch.
            </p>
          </Link>

          <Link
            href="/study/public"
            className="block rounded-2xl bg-white dark:bg-slate-800 p-5 shadow border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Browse Public Decks
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Use shared decks created by others.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}