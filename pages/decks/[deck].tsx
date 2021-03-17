import React from "react";
import { useRouter } from "next/router";
import useDeckMetadata from "../../global/deckMetadata";
import { getDeckMetadata, getDeckPaths } from "../../lib/Deck";
import { InferGetStaticPropsType } from "next";
import { DeckData } from "../../types";

const Deck = ({
  deckMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const setDeckMetadata = useDeckMetadata((state) => state.setDeckMetadata);
  const router = useRouter();
  const { deck } = router.query;
  React.useEffect(() => {
    if (deck) {
      setDeckMetadata(deckMetadata);
      router.push(`/decks/${deck}/1`);
    }
  }, [deck]);
  return false;
};

export const getStaticProps = async ({ params }) => {
  const deckMetadata: DeckData = getDeckMetadata(params.deck);

  return {
    props: {
      deckMetadata,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getDeckPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Deck;
