"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDeck, getCardsForReview, markCardAsGotIt, Card } from "@/lib/deckStorage";

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.id as string;

  const [cardsToReview, setCardsToReview] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck) {
      setDeckName(deck.name);
      const cards = getCardsForReview(deckId);
      setCardsToReview(cards);
    }
    setLoading(false);
  }, [deckId]);

  const currentCard = cardsToReview[currentCardIndex];
  const progress = `${currentCardIndex + 1} / ${cardsToReview.length}`;
  const isLastCard = currentCardIndex === cardsToReview.length - 1;

  const handleGotIt = () => {
    try {
      markCardAsGotIt(deckId, currentCard.id);
      
      if (isLastCard) {
        // All cards done
        router.push(`/study/deck/${deckId}/study-complete`);
      } else {
        // Move to next card
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      }
    } catch (error) {
      alert("Error saving progress");
    }
  };

  const handleAgain = () => {
    if (isLastCard) {
      // Restart from beginning
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } else {
      // Move to next card
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-10" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="mx-auto max-w-md">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (cardsToReview.length === 0) {
    return (
      <main className="min-h-screen px-6 py-10" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex justify-between items-center">
            <Link href={`/study/deck/${deckId}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Deck
            </Link>
            <ThemeToggle />
          </div>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Set!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No cards to review. Great job! Come back in 3 days for more practice.
            </p>
            <Link
              href={`/study/deck/${deckId}`}
              className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-4 py-2 text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors"
            >
              Back to Deck
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto max-w-2xl w-full flex flex-col flex-1">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div className="flex-1">
            <Link href={`/study/deck/${deckId}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              ← Exit Study
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{deckName}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Card {progress}</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Flashcard */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-lg h-64 bg-white dark:bg-slate-800 rounded-3xl shadow-xl cursor-pointer transformed transition-transform hover:scale-105 flex items-center justify-center p-8 border-4 border-blue-200 dark:border-blue-700"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {isFlipped ? "Answer" : "Question"}
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-6">
                Click to {isFlipped ? "see question" : "reveal answer"}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-300 dark:bg-slate-600 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentCardIndex + 1) / cardsToReview.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAgain}
            className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-4 px-6 text-lg transition-colors"
          >
            Again
          </button>
          <button
            onClick={handleGotIt}
            className="flex-1 rounded-xl bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 px-6 text-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </main>
  );
}