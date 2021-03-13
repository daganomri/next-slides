import Button from "./Button";
import Header from "./Header";
import Fader from "./Fader";
import Counter from "./Counter";
import CodeBlock from "./CodeBlock";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const MotionComponents = { motion, AnimatePresence, AnimateSharedLayout };
export { Button, Header, Fader, Counter, CodeBlock };

import * as LayoutComponents from "../Layout";
import { MdxRemote } from "next-mdx-remote/types";

export const MDXComponents: MdxRemote.Components = {
  Button,
  code: CodeBlock,
  Fader,
  ...LayoutComponents,
  // ...MotionComponents,
  MotionDiv: motion.div,
};
