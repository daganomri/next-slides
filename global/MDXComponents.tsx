import Link from "next/link";
import { MdxRemote } from "next-mdx-remote/types";

import * as Components from "@/components";
import { MDXLayoutComponents } from "@/layout";

export const MDXComponents: MdxRemote.Components = {
  ...Components,
  ...MDXLayoutComponents,
  Link,
};
