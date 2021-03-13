import { getDeckPaths } from "../lib/Deck";
import Link from "next/link";
import { Grid } from "../Layout";
import { Fader } from "../components";

const Index = ({ decks }: { decks: string[] }) => {
  return (
    <Fader>
      <main id="slide">
        <Grid>
          <h1>List of Decks</h1>
          <ul>
            {decks.map((deck) => (
              <li key={deck}>
                <Link href={`/${deck}`}>
                  <a>{deck}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      </main>
    </Fader>
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
