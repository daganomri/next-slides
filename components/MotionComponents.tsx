import { motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";

export const MotionDemo = () => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity }}
    >
      This is rotating
    </motion.div>
  );
};

export const MotionBackground = styled.div`
  padding: 6rem 4rem;
  border-radius: 15px;
  background-image: linear-gradient(to bottom, #8a2387, #e94057, #f27121);
  width: 80%;
  display: grid;
  place-items: center;
  position: relative;
`;

export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionSpan = motion.span;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;

export const MotionBox = (props) => (
  <motion.div
    style={{ width: 100, height: 100, background: "white", borderRadius: 15 }}
    {...props}
  />
);

const staggeredUlVariants: Variants = {
  hidden: { opacity: 0 },
  show: (custom: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom,
      delayChildren: 0.3,
    },
  }),
};
const staggeredLiVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const StaggeredUl = ({ childrenStagger = 0.1, ...props }) => (
  <motion.ul
    custom={childrenStagger}
    variants={staggeredUlVariants}
    initial="hidden"
    animate="show"
    {...props}
  />
);
export const StaggeredLi = (props) => (
  <motion.li variants={staggeredLiVariants} {...props} />
);

export { AnimatePresence, AnimateSharedLayout } from "framer-motion";
