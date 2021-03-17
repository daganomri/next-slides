import create from "zustand";
import { DeckData } from "../types";

type DeckMetadataStore = DeckData & {
  setDeckMetadata: (deckMetadata: DeckData) => void;
};

const useDeckMetadata = create<DeckMetadataStore>((set) => ({
  setDeckMetadata: (deckMetadata: DeckData) => set({ ...deckMetadata }),
}));

export default useDeckMetadata;
