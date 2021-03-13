import { useRouter } from "next/router";
import React from "react";

const getPath = (path: string, slide: number) => {
  const basePath = path.split("/").slice(0, -1).join("/");
  return `${basePath}/${slide}`;
};

const clamp = (min: number, val: number, max: number) =>
  Math.max(min, Math.min(val, max));

const useCurrentSlide = (totalSlides: number) => {
  const router = useRouter();
  const currentSlide = parseInt((router.query.slide as string) ?? "1");

  const setCurrentSlide = React.useCallback(
    (slide: number) => {
      const newPath = getPath(router.asPath, clamp(1, slide, totalSlides));
      const nextPath = getPath(router.asPath, clamp(1, slide + 1, totalSlides));
      const prevPath = getPath(router.asPath, clamp(1, slide - 1, totalSlides));
      router.push(newPath);
      router.prefetch(nextPath);
      router.prefetch(prevPath);
    },
    [router]
  );

  return [currentSlide, setCurrentSlide] as const;
};

export default useCurrentSlide;
