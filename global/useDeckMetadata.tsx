import create from "zustand";

import { DeckMetadata } from "@/types";

type DeckMetadataStore = DeckMetadata & {
  setDeckMetadata?: (deckMetadata: DeckMetadata) => void;
  resetDeckMetadata?: () => void;
};

const useDeckMetadata = create<DeckMetadataStore>((set) => ({
  setDeckMetadata: (deckMetadata: DeckMetadata) => set(deckMetadata),
  resetDeckMetadata: () =>
    set(
      ({ setDeckMetadata, resetDeckMetadata }) => ({
        setDeckMetadata,
        resetDeckMetadata,
      }),
      true
    ),
}));

export default useDeckMetadata;
