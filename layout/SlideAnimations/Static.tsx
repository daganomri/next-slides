import { motion, MotionStyle } from "framer-motion";
import React from "react";

import { Direction } from "@/types";

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
  drag: boolean;
  props?: unknown[];
};

// eslint-disable-next-line unused-imports/no-unused-vars
const Static = ({ style, paginate, direction, drag, ...props }: Props) => {
  return (
    <motion.main
      id="slide"
      style={(style ?? {}) as MotionStyle}
      drag={drag ? "x" : false}
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

export default Static;
