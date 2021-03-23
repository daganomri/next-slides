import { AnimatePresence } from "framer-motion";
import React from "react";

import { MotionBox } from "./MotionComponents";

export const MotionExitDemo = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        height: 100,
        width: 300,
        gap: 20,
      }}
    >
      <button
        style={{
          background: "transparent",
          border: "2px solid white",
          cursor: "pointer",
          fontSize: "2rem",
          width: "6rem",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={() => setShow((p) => !p)}
      >
        {show ? "hide" : "show"}
      </button>
      <AnimatePresence exitBeforeEnter>
        {show ? (
          <MotionBox
            key="box"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: [1, 1.2, 0], transition: { duration: 0.5 } }}
            transition={{ type: "spring" }}
          />
        ) : (
          <div style={{ width: 100 }}></div>
        )}
      </AnimatePresence>
    </div>
  );
};
