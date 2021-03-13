export type TODO = any;
export type SlideData = Readonly<
  Partial<{
    title: string;
    rows: number;
    columns: number;
    style: CSSStyleSheet;
  }>
>;

export type DeckData = Readonly<
  Partial<{
    title: string;
    style: CSSStyleSheet;
    showCounter: boolean;
  }>
>;
