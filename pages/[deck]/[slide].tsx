import Head from "next/head";
import siteConfig from "../../site.config";
import hydrate from "next-mdx-remote/hydrate";
import { getSlidesFromDeck } from "../../lib/Deck";
import useCurrentSlide from "../../hooks/useCurrentSlide";
import { Counter, MDXComponents } from "../../components";
import React from "react";
import { Slide } from "../../layout";
import { getSlidePaths } from "../../lib/Deck";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";
import { SlideData } from "../../types";
import Pagination from "../../components/Pagination";

const Deck = ({
  currentDeck,
  slide,
  totalSlides,
  deckData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentSlide, setCurrentSlide] = useCurrentSlide(totalSlides);
  const [direction, setDirection] = React.useState<1 | 0 | -1>(0);
  const router = useRouter();

  const paginate = (newDirection: 1 | 0 | -1) => {
    setCurrentSlide(currentSlide + newDirection);
    setDirection(newDirection);
  };

  const jumpToSlide = (slideIndex: number) => {
    setCurrentSlide(Math.max(Math.min(totalSlides, slideIndex), 1));
    setDirection(
      ((slideIndex - currentSlide) / Math.abs(slideIndex - currentSlide)) as
        | 1
        | -1
    );
  };

  React.useEffect(() => {
    router.prefetch(
      `/${currentDeck}/${Math.min(totalSlides, currentSlide + 1)}`
    );
    router.prefetch(`/${currentDeck}/${Math.max(1, currentSlide - 1)}`);
  }, [currentSlide]);

  const slideData: SlideData = slide?.scope?.data ?? {};
  const hydratedSlide = hydrate(slide, { components: MDXComponents });

  const { title } = slideData;
  const { title: deckTitle, showCounter = true } = deckData;

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
          direction,
          paginate,
          currentSlide,
          slide: hydratedSlide,
          slideData,
          deckData,
        }}
      />
      <Pagination
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        jumpToSlide={jumpToSlide}
      />
      {showCounter && (
        <Counter
          direction={direction}
          currentSlide={currentSlide}
          totalSlides={totalSlides}
        />
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  const { slides, deckData } = await getSlidesFromDeck(params.deck);
  const slide = slides[params.slide - 1];
  const totalSlides = slides.length;

  return {
    props: {
      slide,
      totalSlides,
      deckData,
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
