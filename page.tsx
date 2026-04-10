"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto max-w-3xl">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        {/* Header with Logo Placeholder */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6 p-6 bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-6xl">🦛</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent mb-4">
            Hippo Cards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Study smarter with adaptive flashcards that learn your pace.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12 flex justify-center">
          <Link
            href="/study"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            ✨ Start Studying
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="group p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              Adaptive Learning
            </h2>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Our algorithm learns your pace and adjusts difficulty in real-time.
            </p>
          </div>

          <div className="group p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="text-4xl mb-4">🛠️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              Build Your Decks
            </h2>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Create custom flashcards for any subject with unlimited cards.
            </p>
          </div>

          <div className="group p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              Public Decks
            </h2>
            <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Browse and study decks shared by our community.
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 p-8 rounded-3xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Why Choose Hippo Cards?
          </h3>
          <ul className="space-y-3" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            <li className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>Spaced repetition scheduling for optimal retention</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>Unlimited flashcards and decks</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>Dark mode for comfortable studying</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>Fully local storage - your data stays private</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}