import { useRouter } from "next/router";
import React from "react";

const Deck = () => {
  const router = useRouter();
  const { deck } = router.query;
  React.useEffect(() => {
    if (deck) {
      router.push(`/decks/${deck}/1`);
    }
  }, [deck, router]);
  return false;
};

export default Deck;
