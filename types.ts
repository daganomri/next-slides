import { CSSProperties } from "styled-components";

export type TODO = any;

type CSSColor = CSSProperties["color"];
type CSSFontSize = CSSProperties["fontSize"];
type CSSFontFamily = CSSProperties["fontFamily"];
type CSSFontWeight = CSSProperties["fontWeight"];

export type SiteCSSVariables = Readonly<
  Partial<{
    bg: CSSColor;
    meta: CSSColor;
    accent: CSSColor;
    text: CSSColor;
    base: CSSFontSize;
    code: CSSFontSize;
    headingFontFamily: CSSFontFamily;
    headingFontWeight: CSSFontWeight;
  }>
>;

export type SlideMetadata = Readonly<
  Partial<{
    title: string;
    rows: number;
    columns: number;
    style: CSSStyleSheet;
  }>
>;

type SlideAnimation = "swipe" | "fade" | "static";

export type DeckMetadata = Partial<{
  title: string;
  style: CSSStyleSheet;
  showCounter: boolean;
  date: string;
  slideAnimation: SlideAnimation;
}>;

export type Direction = 1 | -1;

export type DeckState = Partial<{
  currentSlide: number;
  totalSlides: number;
  direction: Direction;
  jumpToSlide: (slide: number) => void;
  paginate: (direction: Direction) => void;
}>;

export type SiteConfig = Readonly<
  Partial<{
    name: string;
    title: string;
    author: {
      twitter_url: string;
    };
    slideAnimation: SlideAnimation;
    cssVariables: SiteCSSVariables;
  }>
>;
