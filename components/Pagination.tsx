import React from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import useKeyPress from "../hooks/useKeyPress";

const Pagination = ({ totalSlides, currentSlide, jumpToSlide }) => {
  const dotArray = [...Array(totalSlides).keys()];
  const rightArrow = useKeyPress("ArrowRight");
  const leftArrow = useKeyPress("ArrowLeft");
  const upArrow = useKeyPress("ArrowUp");
  const downArrow = useKeyPress("ArrowDown");

  React.useEffect(() => {
    if (rightArrow || downArrow) jumpToSlide(currentSlide + 1);
  }, [rightArrow, downArrow]);

  React.useEffect(() => {
    if (leftArrow || upArrow) jumpToSlide(currentSlide - 1);
  }, [leftArrow, upArrow]);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        bottom: 0,
        height: "8%",
        width: "100%",
        textAlign: "center",
        gap: "35px",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <AnimateSharedLayout>
        {dotArray.map((dot) => (
          <div
            style={{ position: "relative", cursor: "pointer" }}
            key={dot}
            onClick={() => jumpToSlide(dot + 1)}
          >
            <AnimatePresence initial={false}>
              {currentSlide !== dot + 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    width: "15px",
                    height: "15px",
                    boxShadow: "0 0 10px 10px rgb(0 0 0 / 1)",
                    backgroundColor: "rgb(100 100 100)",
                    borderRadius: "50%",
                    position: "absolute",
                  }}
                  whileHover={{ backgroundColor: "rgb(175 175 175)" }}
                />
              )}
            </AnimatePresence>
            {currentSlide === dot + 1 && (
              <motion.div
                layoutId="active"
                style={{
                  width: "15px",
                  height: "15px",
                  boxShadow: "0 0 10px 10px rgb(0 0 0 / 1)",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: 1500,
                }}
              />
            )}
          </div>
        ))}
      </AnimateSharedLayout>
    </div>
  );
};

export default Pagination;
