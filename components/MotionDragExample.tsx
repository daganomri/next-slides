import React from "react";

import { MotionBox } from "./MotionComponents";

export const MotionDragExample = () => {
  return (
    <MotionBox
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
    />
  );
};
