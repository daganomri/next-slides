import { SiteConfig } from "./types";

const siteConfig: SiteConfig = {
  name: `@daganomri`,
  title: `NextJS Slides`,
  author: {
    twitter_url: `https://twitter.com/daganomri`,
  },
  drag: false,
} as const;

export default siteConfig;
