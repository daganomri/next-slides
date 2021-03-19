import { SiteCSSVariables } from "../types";

const camelToKebab = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const camelVariablesToStyledKebab = (
  cssVariables: SiteCSSVariables = {}
) =>
  Object.entries(cssVariables).map(
    ([key, value]) => `--${camelToKebab(key)}: ${value};`
  );

export const getPath = (path: string, slide: number) => {
  const basePath = path.split("/").slice(0, -1).join("/");
  return `${basePath}/${slide}`;
};

export const clamp = (min: number, val: number, max: number) =>
  Math.max(min, Math.min(val, max));
