import Link from "next/link";
import React from "react";

import useDeckMetadata from "@/global/useDeckMetadata";
import Grid from "@/layout/Grid";
import { getDeckPaths } from "@/lib/Deck";

const Index = ({ decks }: { decks: string[] }) => {
  const resetDeckMetadata = useDeckMetadata((state) => state.resetDeckMetadata);
  React.useEffect(() => {
    resetDeckMetadata();
  });

  return (
    <main id="slide">
      <Grid>
        <h1>List of Decks</h1>
        <ul>
          {decks.map((deck) => (
            <li key={deck}>
              <Link href={`/decks/${deck}/1`}>
                <a>{deck}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Grid>
    </main>
  );
};

export async function getStaticProps() {
  const decks = getDeckPaths().map((deck) => deck.params.deck);

  return {
    props: {
      decks,
    },
  };
}

export default Index;
