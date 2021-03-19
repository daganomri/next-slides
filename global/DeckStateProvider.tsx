import * as React from "react";

import { DeckState } from "@/types";
const DeckStateContext = React.createContext(null);

type Props = {
  children: React.ReactNode;
  value: DeckState;
};

const DeckStateProvider = ({ children, value }:Props) => (
  <DeckStateContext.Provider value={value}>{children}</DeckStateContext.Provider>
);

function useDeckState() {
  const context = React.useContext(DeckStateContext);
  if (context === undefined) {
    throw new Error("useDeckState must be used within a DeckStateProvider");
  }
  return context;
}
export { DeckStateProvider, useDeckState };
