import { AnimatePresence, motion, MotionStyle, Variants } from "framer-motion";
import React from "react";
import { Grid } from ".";
import { Fader } from "../components";
import useDeckMetadata from "../global/deckMetadata";
import { DeckData, SlideData, TODO } from "../types";

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type Props = {
  direction: 1 | 0 | -1;
  currentSlide: number;
  paginate: (newDirection: 1 | 0 | -1) => void;
  slideData: SlideData;
  slide: React.ReactNode;
};

const Slide: React.FC<Props> = ({
  direction,
  currentSlide,
  paginate,
  slideData,
  slide,
}) => {
  const { rows, columns, style } = slideData;
  const deckStyle = useDeckMetadata((state) => state.style);
  return (
    <Fader style={{ backgroundSize: "cover", ...deckStyle }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.main
          id="slide"
          style={(style ?? {}) as MotionStyle}
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <Grid rows={rows} columns={columns}>
            {slide}
          </Grid>
        </motion.main>
      </AnimatePresence>
    </Fader>
  );
};

export default Slide;
