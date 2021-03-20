import { AnimatePresence, MotionStyle } from "framer-motion";
import React from "react";

import useDeckMetadata from "@/global/useDeckMetadata";
import { Fader, Grid } from "@/layout";
import siteConfig from "@/site.config";
import { Direction, SlideMetadata } from "@/types";

import SlideAnimations from "./SlideAnimations";

const { slideAnimation: siteSlideAnimation } = siteConfig;

type Props = {
  slideMetadata: SlideMetadata;
  slide: React.ReactNode;
  direction: Direction;
  currentSlide: number;
  paginate: (direction: Direction) => void;
};

const Slide: React.FC<Props> = ({
  slideMetadata,
  slide,
  direction,
  currentSlide,
  paginate,
}) => {
  const [
    deckStyle,
    slideAnimation = siteSlideAnimation ?? "swipe",
  ] = useDeckMetadata((state) => [state.style, state.slideAnimation]);

  const { rows, columns, style } = slideMetadata;
  const SlideComponent = SlideAnimations[slideAnimation];

  return (
    <Fader style={{ backgroundSize: "cover", ...deckStyle }}>
      <AnimatePresence initial={false} custom={direction}>
        <SlideComponent
          key={currentSlide}
          style={(style ?? {}) as MotionStyle}
          {...{ paginate, direction }}
        >
          <Grid rows={rows} columns={columns}>
            {slide}
          </Grid>
        </SlideComponent>
      </AnimatePresence>
    </Fader>
  );
};

export default Slide;
