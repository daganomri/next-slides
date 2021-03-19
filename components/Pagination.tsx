import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

import { useDeckState } from "@/global/DeckStateProvider";
import useKeyPress from "@/hooks/useKeyPress";

const getUseKeyToJump = (jumpToSlide: (index: number) => void) => (
  keys: string | string[],
  index: number
) => {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const mappedKeys = keysArray.map((key) => useKeyPress(key));

  React.useEffect(() => {
    if (mappedKeys.some(Boolean)) jumpToSlide(index);
  }, [mappedKeys, index]);
};

const PaginationWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  height: 8%;
  width: 100%;
  text-align: center;
  gap: 35px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DotWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Dot = motion(styled.div`
  width: 15px;
  height: 15px;
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 0.5);
  background-color: rgb(100 100 100);
  border-radius: 50%;
  position: absolute;
`);
const ActiveDot = motion(styled.div`
  width: 15px;
  height: 15px;
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 0.5);
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 1500;
`);

const Pagination = () => {
  const { totalSlides, currentSlide, jumpToSlide } = useDeckState();
  const dotArray = [...Array(totalSlides + 1).keys()].slice(1);
  const useKeyToJump = React.useMemo(() => getUseKeyToJump(jumpToSlide), [
    jumpToSlide,
  ]);

  useKeyToJump(["ArrowRight", "ArrowDown"], currentSlide + 1);
  useKeyToJump(["ArrowLeft", "ArrowUp"], currentSlide - 1);
  useKeyToJump("End", totalSlides);
  useKeyToJump("Home", 0);

  return (
    <PaginationWrapper>
      <AnimateSharedLayout>
        {dotArray.map((dot) => (
          <DotWrapper key={dot} onClick={() => jumpToSlide(dot)}>
            <AnimatePresence initial={false}>
              {dot !== currentSlide && (
                <Dot
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { delay: 0.2 } }}
                  exit={{ scale: 0 }}
                  whileHover={{
                    backgroundColor: "rgb(175 175 175)",
                    boxShadow: "0 0 12px 5px rgb(0 0 0 / 0.5)",
                  }}
                />
              )}
            </AnimatePresence>
            {dot === currentSlide && <ActiveDot layoutId="active" />}
          </DotWrapper>
        ))}
      </AnimateSharedLayout>
    </PaginationWrapper>
  );
};

export default Pagination;
