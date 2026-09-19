import type { Metadata } from "next";
import {
  Geist,
  Caveat,
  Kalam,
  Shadows_Into_Light,
  Lacquer,
  Caveat_Brush,
  Gamja_Flower,
  Mynerve,
  Yuji_Boku,
  Schoolbell,
  Gochi_Hand,
  Permanent_Marker,
  Rock_Salt,
} from "next/font/google";
import "./globals.css";
import "./font-families.css";

const geistSans = Geist({
  variable: "--font-geist-sans-family",
  subsets: ["latin"],
});

const caveat = Caveat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat-family",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam-family",
});

const shadows = Shadows_Into_Light({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-shadows-family",
});

const lacquer = Lacquer({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lacquer-family",
});

const caveatBrush = Caveat_Brush({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-caveat-brush-family",
});

const gamja = Gamja_Flower({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gamja-family",
});

const mynerve = Mynerve({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mynerve-family",
});

const yuji = Yuji_Boku({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-yuji-family",
});

const schoolbell = Schoolbell({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-schoolbell-family",
});

const gochi = Gochi_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gochi-family",
});

const permanent = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-permanent-family",
});

const rock = Rock_Salt({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-rock-family",
});

export const metadata: Metadata = {
  title: "QuoteIt — lines from friends",
  description: "QuoteIt — a personal book of lines from friends. Search, favorite, and copy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${caveat.variable} ${kalam.variable} ${shadows.variable} ${lacquer.variable} ${caveatBrush.variable} ${gamja.variable} ${mynerve.variable} ${yuji.variable} ${schoolbell.variable} ${gochi.variable} ${permanent.variable} ${rock.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
