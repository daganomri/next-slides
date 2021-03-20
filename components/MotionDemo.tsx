import { motion } from "framer-motion";
import React from "react";

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
