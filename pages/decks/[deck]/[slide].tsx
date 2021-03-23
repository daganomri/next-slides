import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import hydrate from "next-mdx-remote/hydrate";
import React from "react";

import { MDXComponents } from "@/global/MDXComponents";
import useDeckMetadata from "@/global/useDeckMetadata";
import useCurrentSlide from "@/hooks/useCurrentSlide";
import { Counter, Pagination, Slide } from "@/layout";
import { getSlidePaths, getSlidesFromDeck } from "@/lib/Deck";
import siteConfig from "@/site.config";
import { Direction, SlideMetadata } from "@/types";

const Deck = ({
  currentDeck,
  slide,
  totalSlides,
  deckMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentSlide, setCurrentSlide] = useCurrentSlide(totalSlides);
  const [direction, setDirection] = React.useState<Direction>(1);
  const [
    deckTitle,
    showCounter = true,
  ] = useDeckMetadata(({ title, showCounter }) => [title, showCounter]);
  const setDeckMetadata = useDeckMetadata((state) => state.setDeckMetadata);

  React.useEffect(() => {
    setDeckMetadata(deckMetadata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpToSlide = (slideIndex: number) => {
    setDirection(
      ((slideIndex - currentSlide) /
        Math.abs(slideIndex - currentSlide)) as Direction
    );
    setCurrentSlide(slideIndex);
  };

  const paginate = (direction: Direction) => {
    setDirection(direction);
    setCurrentSlide(currentSlide + direction);
  };

  const slideMetadata: SlideMetadata = slide?.scope?.data ?? {};
  const hydratedSlide = hydrate(slide, { components: MDXComponents });

  const { title } = slideMetadata;

  return (
    <>
      <Head>
        <title>
          {siteConfig.name} - {deckTitle ?? currentDeck}
          {title ? " - " + title : " #" + currentSlide}
        </title>
      </Head>
      <Slide
        {...{
          slide: hydratedSlide,
          slideMetadata,
          currentSlide,
          paginate,
          direction,
        }}
      />
      <Pagination {...{ currentSlide, totalSlides, jumpToSlide, paginate }} />
      {showCounter && <Counter {...{ currentSlide, direction, totalSlides }} />}
    </>
  );
};

export async function getStaticProps({ params }) {
  const { slides, deckMetadata } = await getSlidesFromDeck(params.deck);
  const slide = slides[params.slide - 1];
  const totalSlides = slides.length;

  return {
    props: {
      slide,
      totalSlides,
      deckMetadata,
      currentDeck: params.deck,
    },
  };
}

export async function getStaticPaths() {
  const paths = getSlidePaths();

  return {
    paths,
    fallback: false,
  };
}

export default Deck;
