'use client';

import { useState } from "react";
import { Quote } from "./types";
import Icon from "./Icon";

interface QuoteCardProps {
  quote: Quote;
  index: number;
  handClass: string;
  onCopyQuote?: (text: string) => void;
}

export default function QuoteCard({
  quote,
  index,
  handClass,
  onCopyQuote,
}: QuoteCardProps) {
  const [favorite, setFavorite] = useState(false);

  const handleCopy = () => {
    const fullText = `"${quote.quote}" — ${quote.author}`;
    if (onCopyQuote) {
      onCopyQuote(fullText);
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
    }
  };

  const tilt = index % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]";

  return (
    <article
      className={`relative flex flex-col justify-between rounded-[2px] bg-[#fbfaf4] p-3 pb-4 pt-6 text-[#28241d] shadow-[0_3px_10px_rgba(58,42,26,0.45)] transition-transform duration-200 hover:rotate-0 ${tilt}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] rounded-[1px] bg-[#d4695e]/85"
      />
      <blockquote
        className={`my-2 max-w-[28ch] px-2 text-[20px] font-medium leading-[1.45] ${handClass}`}
      >
        {quote.quote}
      </blockquote>

      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex min-w-0 flex-col">
          <cite className="truncate font-ui text-[13px] font-semibold not-italic">
            {quote.author}
          </cite>
          {quote.tag && (
            <span className="mt-0.5 font-ui text-[11px] text-[#28241d]/55">
              {quote.year ? `${quote.tag}, ${quote.year}` : quote.tag}
            </span>
          )}
          {!quote.tag && quote.year && (
            <span className="mt-0.5 font-ui text-[11px] tabular-nums text-[#28241d]/55">
              {quote.year}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setFavorite((p) => !p)}
            type="button"
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Remove quote by ${quote.author} from favorites`
                : `Favorite quote by ${quote.author}`
            }
            title={favorite ? "Favorited" : "Favorite"}
            className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full transition-colors ${
              favorite
                ? "text-[#d4695e] hover:bg-[#d4695e]/10"
                : "text-[#28241d]/45 hover:bg-[#28241d]/5 hover:text-[#28241d]"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center ${
                favorite ? "animate-seal-in" : ""
              }`}
            >
              <Icon
                name={favorite ? "favorite" : "favorite_border"}
                filled={favorite}
                size={17}
                iconColor="currentColor"
              />
            </span>
          </button>
          <button
            onClick={handleCopy}
            type="button"
            title="Copy quote"
            aria-label={`Copy quote by ${quote.author}`}
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-[#28241d]/45 transition-colors hover:bg-[#28241d]/5 hover:text-[#28241d]"
          >
            <Icon name="content_copy" size={14} iconColor="currentColor" />
          </button>
        </div>
      </div>
    </article>
  );
}
