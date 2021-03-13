import { motion } from "framer-motion";
import React from "react";

const Fader: React.FC<{ style?: any }> = ({ children, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Fader;
