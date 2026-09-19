'use client';

import { useCallback, useRef, KeyboardEvent } from "react";
import Icon from "./Icon";
import { OriginRect } from "./types";

interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onAddRequest?: (text: string, origin: OriginRect) => void;
}

export default function InputBar({
  value,
  onChange,
  onAddRequest,
}: InputBarProps) {
  const fieldRef = useRef<HTMLDivElement>(null);

  const commit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && onAddRequest) {
      const r = fieldRef.current?.getBoundingClientRect();
      onAddRequest(trimmed, {
        x: r?.left ?? window.innerWidth / 2,
        y: r?.top ?? window.innerHeight / 2,
        width: r?.width ?? 0,
        height: r?.height ?? 0,
      });
    }
  }, [value, onAddRequest]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value.trim()) commit();
    },
    [value, commit]
  );

  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full max-w-xl">
      <label htmlFor="shelf-search" className="sr-only">
        Search your friends&apos; lines or add one
      </label>
      <div
        ref={fieldRef}
        className="flex items-center gap-3 rounded-[2px] bg-[#fbfaf4] px-4 py-2.5 text-[#28241d] shadow-[0_2px_8px_rgba(58,42,26,0.4)] transition-shadow focus-within:shadow-[0_2px_12px_rgba(58,42,26,0.5)]"
      >
        <Icon name="search" size={18} iconColor="#28241d73" />
        <input
          id="shelf-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find a print, or stick up a new one…"
          autoComplete="off"
          className="w-full bg-transparent font-ui text-[14px] placeholder:text-[#28241d]/45 focus:outline-none"
        />
        {hasValue && (
          <button
            type="button"
            onClick={commit}
            className="shrink-0 cursor-pointer rounded-[2px] bg-[#28241d] px-3.5 py-1.5 font-ui text-[13px] font-medium text-[#fbfaf4] transition-colors hover:bg-[#d4695e]"
          >
            Stick it up
          </button>
        )}
      </div>
    </div>
  );
}
