import type { ReactNode } from "react";

export default function QuoteRow({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
