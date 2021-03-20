import Fade from "./Fade";
import Static from "./Static";
import Swipe from "./Swipe";

export default {
  swipe: Swipe,
  static: Static,
  fade: Fade,
} as const;
