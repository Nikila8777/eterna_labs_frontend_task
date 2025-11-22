import type { Token } from "./types";

type Listener = (update: Partial<Token> & { id: string }) => void;

let listeners: Listener[] = [];
let started = false;

export function subscribeToTokenFeed(listener: Listener) {
  listeners.push(listener);
  if (!started) startFeed();

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function startFeed() {
  started = true;

  setInterval(() => {
    if (listeners.length === 0) return;

    const id = String(Math.floor(Math.random() * 20)); // random token
    const priceDelta = (Math.random() - 0.5) * 0.03; // small change
    const changeDelta = (Math.random() - 0.5) * 1.0; // random 24h change

    const update: Partial<Token> & { id: string } = {
      id,
      price: Number((1 + priceDelta).toFixed(4)),
      priceChange24h: changeDelta,
    };

    listeners.forEach((fn) => fn(update));
  }, 1500);
}
