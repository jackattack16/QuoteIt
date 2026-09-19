'use client';

import { useEffect, useLayoutEffect, useRef, useState, KeyboardEvent } from "react";
import { OriginRect } from "./types";

interface AddQuoteModalProps {
  initialText: string;
  origin: OriginRect;
  onClose: () => void;
  onSave: (data: { text: string; author: string; tag: string }) => void;
}

export default function AddQuoteModal({
  initialText,
  origin,
  onClose,
  onSave,
}: AddQuoteModalProps) {
  const [text, setText] = useState(initialText);
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [leaving, setLeaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // FLIP enter: start the card exactly over the search field, then expand
  // it into its final centered position.
  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || origin.width < 4 || origin.height < 4) return;

    const f = el.getBoundingClientRect();
    const dx = origin.x + origin.width / 2 - (f.x + f.width / 2);
    const dy = origin.y + origin.height / 2 - (f.y + f.height / 2);
    const sx = origin.width / f.width;
    const sy = origin.height / f.height;

    el.style.transition = "none";
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    el.style.opacity = "0.25";

    let raf = 0;
    raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transition =
          "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out";
        cardRef.current.style.transform = "";
        cardRef.current.style.opacity = "1";
      })
    );
    return () => cancelAnimationFrame(raf);
  }, [origin]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const requestClose = () => {
    if (leaving) return;
    setLeaving(true);
    timer.current = setTimeout(onClose, 160);
  };

  const save = () => {
    if (!text.trim() || leaving) return;
    const data = {
      text: text.trim(),
      author: author.trim() || "A friend",
      tag: tag.trim(),
    };
    setLeaving(true);
    timer.current = setTimeout(() => onSave(data), 160);
  };

  const submitOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
  };

  const field =
    "w-full rounded-[2px] border border-[#28241d]/20 bg-white/60 px-3 py-2 font-ui text-[14px] text-[#28241d] placeholder:text-[#28241d]/40 focus:border-[#d4695e] focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Add a new print"
    >
      <button
        type="button"
        aria-label="Close without saving"
        onClick={requestClose}
        className={`animate-fade-in absolute inset-0 cursor-default bg-[#141311]/60 transition-opacity duration-150 ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={cardRef}
        style={
          leaving
            ? {
                opacity: 0,
                transform: "scale(0.97)",
                transition: "opacity 0.16s ease, transform 0.16s ease",
              }
            : undefined
        }
        className="relative w-full max-w-md rotate-[-0.5deg] rounded-[2px] bg-[#fbfaf4] p-5 pt-8 text-[#28241d] shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[1.5deg] rounded-[1px] bg-[#d4695e]/85"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-quote-text"
              className="font-ui text-[13px] font-semibold"
            >
              The line
            </label>
            <textarea
              id="new-quote-text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`${field} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-quote-author"
              className="font-ui text-[13px] font-semibold"
            >
              Said by
            </label>
            <input
              id="new-quote-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyDown={submitOnEnter}
              placeholder="Which friend said it?"
              autoComplete="off"
              autoFocus
              className={field}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-quote-tag"
              className="font-ui text-[13px] font-semibold"
            >
              Tag <span className="font-normal text-[#28241d]/50">(optional)</span>
            </label>
            <input
              id="new-quote-tag"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={submitOnEnter}
              placeholder="Inside joke, occasion…"
              autoComplete="off"
              className={field}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={requestClose}
              className="cursor-pointer rounded-[2px] px-3.5 py-1.5 font-ui text-[13px] font-medium text-[#28241d]/60 transition-colors hover:bg-[#28241d]/5 hover:text-[#28241d]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="cursor-pointer rounded-[2px] bg-[#28241d] px-3.5 py-1.5 font-ui text-[13px] font-medium text-[#fbfaf4] transition-colors hover:bg-[#d4695e]"
            >
              Stick it up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
