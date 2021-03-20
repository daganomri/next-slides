/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Direction } from "node:readline";
import React from "react";
import styled from "styled-components";

import useKeyPress from "@/hooks/useKeyPress";

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

const styledDot = styled.div`
  width: 15px;
  height: 15px;
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 0.5);
  background-color: rgb(100 100 100);
  border-radius: 50%;
  position: absolute;
`;

const Dot = motion(styledDot);

const styledActiveDot = styled(styledDot)`
  background-color: white;
  z-index: 1500;
`;

const ActiveDot = motion(styledActiveDot);

type Props = {
  totalSlides: number;
  currentSlide: number;
  paginate: (direction: Direction) => void;
  jumpToSlide: (slide: number) => void;
};

const Pagination = ({
  totalSlides,
  currentSlide,
  paginate,
  jumpToSlide,
}: Props) => {
  const dotArray = [...Array(totalSlides + 1).keys()].slice(1);

  const rightArrow = useKeyPress("ArrowRight");
  const leftArrow = useKeyPress("ArrowLeft");
  const upArrow = useKeyPress("ArrowUp");
  const downArrow = useKeyPress("ArrowDown");
  const end = useKeyPress("End");
  const home = useKeyPress("Home");

  React.useEffect(() => {
    if (rightArrow || downArrow) paginate(1);
  }, [downArrow, rightArrow]);

  React.useEffect(() => {
    if (leftArrow || upArrow) paginate(-1);
  }, [leftArrow, upArrow]);

  React.useEffect(() => {
    if (end) jumpToSlide(totalSlides);
  }, [end]);

  React.useEffect(() => {
    if (home) jumpToSlide(1);
  }, [home]);

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
