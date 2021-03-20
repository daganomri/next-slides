import { motion } from "framer-motion";
import React, { CSSProperties } from "react";
import styled from "styled-components";

const StyledMotionDiv = motion(styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`);

const Fader: React.FC<{ style?: CSSProperties }> = ({ children, style }) => {
  return (
    <StyledMotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      style={style}
    >
      {children}
    </StyledMotionDiv>
  );
};

export default Fader;
