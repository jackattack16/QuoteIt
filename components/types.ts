export type HandId =
  | 'caveat'
  | 'kalam'
  | 'shadows'
  | 'lacquer'
  | 'caveat-brush'
  | 'gamja'
  | 'mynerve'
  | 'yuji'
  | 'schoolbell'
  | 'gochi'
  | 'permanent'
  | 'rock';

export interface OriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Quote {
  id: string;
  quote: string;
  author: string;
  tag?: string;
  year?: string;
  likes?: number;
}
