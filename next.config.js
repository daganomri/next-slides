/* eslint-disable */

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
module.exports = withMDX({
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["images.unsplash.com"],
  },
});
