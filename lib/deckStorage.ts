export interface Card {
  id: string;
  front: string;
  back: string;
  nextReviewDate?: number; // timestamp when card should be reviewed again
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Card[];
}

const STORAGE_KEY = "hippo_cards_decks";

export function getDecks(): Deck[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getDeck(id: string): Deck | null {
  const decks = getDecks();
  return decks.find((d) => d.id === id) || null;
}

export function saveDeck(name: string, description: string): string {
  const decks = getDecks();
  const id = Date.now().toString();
  const newDeck: Deck = {
    id,
    name,
    description,
    cards: [],
  };
  decks.push(newDeck);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  return id;
}

export function addCard(deckId: string, front: string, back: string): string {
  const decks = getDecks();
  const deck = decks.find((d) => d.id === deckId);
  
  if (!deck) throw new Error("Deck not found");
  
  const cardId = Date.now().toString();
  const newCard: Card = {
    id: cardId,
    front,
    back,
  };
  
  deck.cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  return cardId;
}

export function deleteCard(deckId: string, cardId: string): void {
  const decks = getDecks();
  const deck = decks.find((d) => d.id === deckId);
  
  if (!deck) throw new Error("Deck not found");
  
  deck.cards = deck.cards.filter((c) => c.id !== cardId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function deleteDeck(deckId: string): void {
  const decks = getDecks();
  const filtered = decks.filter((d) => d.id !== deckId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function markCardAsGotIt(deckId: string, cardId: string): void {
  const decks = getDecks();
  const deck = decks.find((d) => d.id === deckId);
  
  if (!deck) throw new Error("Deck not found");
  
  const card = deck.cards.find((c) => c.id === cardId);
  if (!card) throw new Error("Card not found");
  
  // Set next review date to 3 days from now
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  card.nextReviewDate = Date.now() + threeDaysMs;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function getCardsForReview(deckId: string): Card[] {
  const deck = getDeck(deckId);
  if (!deck) return [];
  
  const now = Date.now();
  return deck.cards.filter(
    (card) => !card.nextReviewDate || card.nextReviewDate <= now
  );
}