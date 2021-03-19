import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { MdxRemote } from "next-mdx-remote/types";

import * as LayoutComponents from "@/layout";

import Button from "./Button";
import CodeBlock from "./CodeBlock";
import Counter from "./Counter";
import Fader from "./Fader";
import Header from "./Header";

const MotionComponents = { motion, AnimatePresence, AnimateSharedLayout };
export { Button, Header, Fader, Counter, CodeBlock };

export const MDXComponents: MdxRemote.Components = {
  Button,
  code: CodeBlock,
  Fader,
  ...LayoutComponents,
  // ...MotionComponents,
  MotionDiv: motion.div,
};
