import React from "react";
import { useRouter } from "next/router";

const Deck = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace(`/${router.query.deck}/1`);
  }, []);
  return false;
};

export default Deck;
