import path from "path";
import fs from "fs";
import renderToString from "next-mdx-remote/render-to-string";
import { MDXComponents } from "../components";
import matter from "gray-matter";
import { DeckData, SlideData } from "../types";
// import Error from "../decks/Error.json";

export const getDeckPaths = () => {
  const postsDirectory = path.join(process.cwd(), "decks");
  const mdxFiles = fs.readdirSync(postsDirectory);
  // Loop through all post files and create array of slugs (to create links)
  const paths = mdxFiles.map((filename) => ({
    params: {
      deck: filename.replace(".mdx", ""),
    },
  }));
  return paths;
};

export const getSlidePaths = () => {
  const postsDirectory = path.join(process.cwd(), "decks");
  const mdxFiles = fs.readdirSync(postsDirectory);
  // Loop through all post files and create array of slugs (to create links)
  const paths = mdxFiles.flatMap((filename) => {
    const deck = fs.readFileSync(path.join("decks", filename), "utf-8");
    const { content: deckContent } = matter(deck);
    const slides = deckContent.split("---\n");
    return slides.map((slide, i) => ({
      params: {
        deck: filename.replace(".mdx", ""),
        slide: (i + 1).toString(),
      },
    }));
  });
  return paths;
};

export const getSlidesFromDeck = async (deckName: string) => {
  const filename = path.join("decks", `${deckName}.mdx`);
  const deck = fs.readFileSync(filename, "utf-8");
  const { content: deckContent, data: deckData } = matter(deck);
  const slides = deckContent.split("---\n");
  const renderedSlides = slides.map(async (slide) => {
    const { content, data }: { content: string; data: SlideData } = matter(
      slide.trim(),
      {
        delimiters: "///",
      }
    );
    return await renderToString(content, {
      components: MDXComponents,
      scope: { data },
    });
  });
  return {
    deckData: deckData as DeckData,
    slides: (await Promise.allSettled(renderedSlides)).map((slide) => {
      if (slide.status === "rejected") {
        throw new Error(slide.reason);
      }
      return slide.value;
    }),
  };
};
