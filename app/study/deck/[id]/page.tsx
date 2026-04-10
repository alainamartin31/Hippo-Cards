"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDeck, addCard, deleteCard, Deck } from "@/lib/deckStorage";

export default function DeckPage() {
  const params = useParams();
  const deckId = params.id as string;
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const currentDeck = getDeck(deckId);
    setDeck(currentDeck);
  }, [deckId]);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!front.trim() || !back.trim()) {
      alert("Please fill in both front and back of the card");
      return;
    }

    setLoading(true);
    
    try {
      addCard(deckId, front, back);
      const updatedDeck = getDeck(deckId);
      setDeck(updatedDeck);
      setFront("");
      setBack("");
    } catch (error) {
      alert("Error adding card");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      try {
        deleteCard(deckId, cardId);
        const updatedDeck = getDeck(deckId);
        setDeck(updatedDeck);
      } catch (error) {
        alert("Error deleting card");
      }
    }
  };

  const toggleFlip = (cardId: string) => {
    setFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  if (!deck) {
    return (
      <main className="min-h-screen px-6 py-10" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="mx-auto max-w-md">
          <p className="text-gray-600 dark:text-gray-400">Loading deck...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 transition-colors duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/study/mydecks" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to My Decks
          </Link>
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          {/* Deck Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{deck.name}</h1>
            {deck.description && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">{deck.description}</p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
            </p>
          </div>

          {/* Add Card Form */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Card
            </h2>
            
            <form className="space-y-4" onSubmit={handleAddCard}>
              <div>
                <label htmlFor="front" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Front (Question)
                </label>
                <textarea
                  id="front"
                  rows={3}
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., What is the capital of France?"
                />
              </div>

              <div>
                <label htmlFor="back" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Back (Answer)
                </label>
                <textarea
                  id="back"
                  rows={3}
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Paris"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-4 py-2 text-white font-medium hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Card"}
              </button>
            </form>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cards in Deck
            </h2>
            
            {deck.cards.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No cards yet. Create your first card above!
              </p>
            ) : (
              deck.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-200 dark:border-slate-700"
                >
                  <div
                    onClick={() => toggleFlip(card.id)}
                    className="cursor-pointer p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-lg min-h-24 flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <p className="text-center text-gray-900 dark:text-white font-medium">
                      {flipped[card.id] ? card.back : card.front}
                    </p>
                  </div>
                  
                  <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {flipped[card.id] ? "Answer" : "Question"}
                  </div>

                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Delete Card
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}