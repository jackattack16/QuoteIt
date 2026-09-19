'use client';

import { useEffect, useRef } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { HandId } from "./types";
import Icon from "./Icon";

export const HANDS: { id: HandId; name: string; keyNumber: string; className: string }[] = [
  { id: "caveat", name: "Caveat", keyNumber: "1", className: "font-hand" },
  { id: "kalam", name: "Kalam", keyNumber: "2", className: "font-kalam" },
  { id: "shadows", name: "Shadows", keyNumber: "3", className: "font-shadows" },
  { id: "lacquer", name: "Lacquer", keyNumber: "4", className: "font-lacquer" },
  { id: "caveat-brush", name: "Caveat Brush", keyNumber: "5", className: "font-caveat-brush" },
  { id: "gamja", name: "Gamja Flower", keyNumber: "6", className: "font-gamja" },
  { id: "mynerve", name: "Mynerve", keyNumber: "7", className: "font-mynerve" },
  { id: "yuji", name: "Yuji Boku", keyNumber: "8", className: "font-yuji" },
  { id: "schoolbell", name: "Schoolbell", keyNumber: "9", className: "font-schoolbell" },
  { id: "gochi", name: "Gochi Hand", keyNumber: "0", className: "font-gochi" },
  { id: "permanent", name: "Permanent Marker", keyNumber: "", className: "font-permanent" },
  { id: "rock", name: "Rock Salt", keyNumber: "", className: "font-rock" },
];

interface FontSwitcherProps {
  currentHand: HandId;
  onSelectHand: (id: HandId) => void;
}

export default function FontSwitcher({
  currentHand,
  onSelectHand,
}: FontSwitcherProps) {
  // Mobile Safari/Chrome often cancel the click when a tap starts inside
  // a horizontal scroller (the tap reads as a scroll-start). So detect a
  // stationary tap on finger-lift and select directly; real swipes scroll.
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: ReactTouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (id: HandId) => (e: ReactTouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const moved = Math.hypot(t.clientX - start.x, t.clientY - start.y);
    if (moved < 12) {
      onSelectHand(id);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      const found = HANDS.find((h) => h.keyNumber === e.key);
      if (found) onSelectHand(found.id);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectHand]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4">
      {/* Mobile: native picker — the OS sheet always opens, no gesture fights */}
      <div className="pointer-events-auto sm:hidden">
        <label htmlFor="hand-select" className="sr-only">
          Choose handwriting
        </label>
        <div className="relative">
          <select
            id="hand-select"
            value={currentHand}
            onChange={(e) => onSelectHand(e.target.value as HandId)}
            className="min-h-[48px] cursor-pointer appearance-none rounded-full border border-white/15 bg-[#141311] pl-4 pr-10 text-sm font-medium text-stone-100 shadow-[0_12px_36px_rgba(0,0,0,0.5)] focus:outline-none"
          >
            {HANDS.map((hand) => (
              <option key={hand.id} value={hand.id}>
                {hand.name}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
          >
            <Icon name="expand_more" size={18} iconColor="currentColor" />
          </span>
        </div>
      </div>

      {/* Larger screens: preview dock */}
      <div className="pointer-events-auto hidden max-w-full touch-pan-x items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#141311] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] select-none sm:flex">
        <span className="hidden shrink-0 pl-3 pr-1 font-mono text-[11px] text-stone-400 sm:inline">
          Hand
        </span>
        {HANDS.map((hand) => {
          const isActive = hand.id === currentHand;
          return (
            <button
              key={hand.id}
              type="button"
              onClick={() => onSelectHand(hand.id)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd(hand.id)}
              aria-pressed={isActive}
              title={`${hand.name} handwriting`}
              className={`flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full px-2.5 py-1.5 transition-transform [-webkit-tap-highlight-color:transparent] active:scale-95 sm:px-3 ${
                isActive
                  ? "bg-stone-100 text-stone-950"
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span aria-hidden="true" className={`${hand.className} text-[20px] leading-none`}>
                Ag
              </span>
              <span className="hidden text-xs font-medium lg:inline">
                {hand.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
