'use client';

import { useState, useMemo } from "react";
import { HandId, OriginRect, Quote } from "@/components/types";
import { INITIAL_QUOTES } from "@/components/quotesData";
import QuoteCard from "@/components/QuoteCard";
import InputBar from "@/components/InputBar";
import AddQuoteModal from "@/components/AddQuoteModal";
import FontSwitcher, { HANDS } from "@/components/FontSwitcher";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";

export default function Home() {
  const [hand, setHand] = useState<HandId>("caveat");
  const [dark, setDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [draftOpen, setDraftOpen] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [draftOrigin, setDraftOrigin] = useState<OriginRect>({ x: 0, y: 0, width: 0, height: 0 });

  const handClass =
    HANDS.find((h) => h.id === hand)?.className ?? "font-hand";

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddRequest = (text: string, origin: OriginRect) => {
    setDraftText(text);
    setDraftOrigin(origin);
    setDraftOpen(true);
  };

  const handleSaveDraft = (data: { text: string; author: string; tag: string }) => {
    const newQuote: Quote = {
      id: `custom-${Date.now()}`,
      quote: data.text,
      author: data.author,
      tag: data.tag || "New",
      year: new Date().getFullYear().toString(),
      likes: 1,
    };
    setQuotes([newQuote, ...quotes]);
    setSearchQuery("");
    setDraftOpen(false);
    showToast("Stuck up on the board.");
  };

  const handleCopyQuote = (fullText: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      showToast("Copied to the clipboard.");
    }
  };

  const filteredQuotes = useMemo(() => {
    if (!searchQuery.trim()) return quotes;
    const q = searchQuery.toLowerCase();
    return quotes.filter(
      (item) =>
        item.quote.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q))
    );
  }, [quotes, searchQuery]);

  const featured = useMemo(() => quotes[0], [quotes]);
  const isFiltering = searchQuery.trim().length > 0;

  const ink = dark ? "text-[#ece4d2]" : "text-[#2a241c]";
  const faint = dark ? "text-[#ece4d2]/55" : "text-[#2a241c]/60";
  const hairline = dark ? "border-[#ece4d2]/15" : "border-[#2a241c]/20";
  const clearLink = dark
    ? "text-[#e08a7d] decoration-[#e08a7d]/40 hover:decoration-[#e08a7d]"
    : "text-[#7e3327] decoration-[#7e3327]/40 hover:decoration-[#7e3327]";

  return (
    <div
      className={`bg-corkboard relative flex min-h-[100dvh] flex-col font-ui transition-colors duration-300 ${
        dark ? "bg-[#3b3128]" : "bg-[#b08c5e]"
      } ${ink}`}
    >
      <header className={`relative z-10 border-b ${hairline}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className={`${handClass} text-[26px] font-semibold leading-none`}>
            QuoteIt
          </p>
          <IconButton
            icon={dark ? "light_mode" : "dark_mode"}
            title={dark ? "Switch to daylight" : "Switch to lamplight"}
            onClick={() => setDark((d) => !d)}
            className={
              dark
                ? "text-[#ece4d2]/70 hover:bg-white/10 hover:text-[#ece4d2]"
                : "text-[#2a241c]/70 hover:bg-black/5 hover:text-[#2a241c]"
            }
          />
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="animate-ledger-rise max-w-3xl pb-10 pt-10 sm:pt-14">
          <div className="relative mt-5 max-w-xl rotate-[-0.8deg] rounded-[2px] bg-[#fbfaf4] p-4 pb-5 pt-8 text-[#28241d] shadow-[0_6px_20px_rgba(58,42,26,0.4)]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[1.5deg] rounded-[1px] bg-[#d4695e]/85"
            />
            <p
              className={`${handClass} text-[26px] font-medium leading-[1.4] sm:text-[30px]`}
            >
              {featured.quote}
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 220 10"
              className="mt-1 h-[10px] w-[190px] text-[#d4695e]"
              fill="none"
            >
              <path
                d="M3 7 C 40 2, 70 9, 110 5 S 180 3, 217 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-3 font-ui text-[13px] font-semibold">
              {featured.author}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-3 pb-6">
          <InputBar
            value={searchQuery}
            onChange={setSearchQuery}
            onAddRequest={handleAddRequest}
          />
          {isFiltering && (
            <div className="flex min-h-[20px] items-center justify-between">
              <p className={`text-[13px] ${faint}`} role="status">
                {filteredQuotes.length} of {quotes.length} match
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`cursor-pointer text-[13px] underline underline-offset-4 ${clearLink}`}
              >
                Clear
              </button>
            </div>
          )}
        </section>

        <section aria-label="Quote cards" className="pb-28">
          {filteredQuotes.length === 0 ? (
            <div className="max-w-xl rotate-[0.5deg] rounded-[2px] bg-[#fbfaf4] px-6 py-12 text-[#28241d] shadow-[0_3px_10px_rgba(58,42,26,0.45)]">
              <p className={`${handClass} text-[24px] font-medium leading-[1.4]`}>
                Nothing here matches &ldquo;{searchQuery}&rdquo; yet.
              </p>
              <p className="mt-2 font-ui text-[13px] text-[#28241d]/60">
                Press Enter to write it up as a new print.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQuotes.map((q, idx) => (
                <QuoteCard
                  key={q.id}
                  quote={q}
                  index={idx}
                  handClass={handClass}
                  onCopyQuote={handleCopyQuote}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <FontSwitcher currentHand={hand} onSelectHand={setHand} />

      {draftOpen && (
        <AddQuoteModal
          initialText={draftText}
          origin={draftOrigin}
          onClose={() => setDraftOpen(false)}
          onSave={handleSaveDraft}
        />
      )}

      {toastMessage && (
        <div className="fixed inset-x-0 bottom-20 z-40 flex justify-center px-6">
          <div className="animate-toast-in flex items-center gap-2.5 rounded-full border border-[#2a241c]/15 bg-[#fbfaf4] px-4 py-2.5 text-[#28241d] shadow-xl">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#d4695e]"
            />
            <Icon name="check" size={14} iconColor="#28241d" />
            <span className="text-[13px]">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
