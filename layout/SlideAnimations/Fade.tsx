import { motion, MotionStyle, Variants } from "framer-motion";
import React from "react";

import { Direction } from "@/types";

const variants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
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
  style: MotionStyle;
  children: React.ReactNode;
  paginate: (direction: Direction) => void;
  direction: Direction;
  props?: unknown[];
};

const Fade = ({ style, paginate, direction, ...props }: Props) => {
  return (
    <motion.main
      id="slide"
      style={(style ?? {}) as MotionStyle}
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
      dragConstraints={{ left: Infinity, right: Infinity }}
      dragElastic={0}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          paginate(-1);
        }
      }}
      {...props}
    />
  );
};

export default Fade;
