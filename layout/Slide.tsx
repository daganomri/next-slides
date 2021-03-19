import { AnimatePresence, MotionStyle } from "framer-motion";
import React from "react";

import { Fader } from "@/components";
import { useDeckState } from "@/global/DeckStateProvider";
import useDeckMetadata from "@/global/useDeckMetadata";
import siteConfig from "@/site.config";
import { SlideMetadata } from "@/types";

import Grid from "./Grid";
import SlideAnimations from "./SlideAnimations";

const { slideAnimation: siteSlideAnimation } = siteConfig;

type Props = {
  slideMetadata: SlideMetadata;
  slide: React.ReactNode;
};

const Slide: React.FC<Props> = ({ slideMetadata, slide }) => {
  const { direction, currentSlide } = useDeckState();
  const [
    deckStyle,
    slideAnimation = siteSlideAnimation ?? "swipe",
  ] = useDeckMetadata((state) => [state.style, state.slideAnimation]);

  const { rows, columns, style } = slideMetadata;
  const SlideComponent = SlideAnimations[slideAnimation];

  return (
    <Fader style={{ backgroundSize: "cover", ...deckStyle }}>
      <AnimatePresence initial={false} custom={direction}>
        <SlideComponent key={currentSlide} style={(style ?? {}) as MotionStyle}>
          <Grid rows={rows} columns={columns}>
            {slide}
          </Grid>
        </SlideComponent>
      </AnimatePresence>
    </Fader>
  );
};

export default Slide;
