import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";

import { useDeckState } from "@/global/DeckStateProvider";
import { Direction } from "@/types";

const counterVariants: Variants = {
  enter: (direction: Direction) => {
    return {
      y: direction > 0 ? -10 : 10,
      opacity: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => {
    return {
      y: direction < 0 ? -10 : 10,
      opacity: 0,
    };
  },
};

const Counter = () => {
  const { direction, currentSlide, totalSlides } = useDeckState();
  return (
    <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
      <CounterWrapper>
        <motion.span
          custom={direction}
          variants={counterVariants}
          style={{ display: "inline-block" }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          key={currentSlide}
        >
          {currentSlide}
        </motion.span>
        /{totalSlides}
      </CounterWrapper>
    </AnimatePresence>
  );
};

const CounterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem;
  text-shadow: 0 0 5px var(--bg);
`;

export default Counter;
